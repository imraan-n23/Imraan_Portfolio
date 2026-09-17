'use client'

import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'
const FINE_POINTER_QUERY = '(pointer: fine)'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia(REDUCE_QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(REDUCE_QUERY)

    const sync = () => setReduced(mq.matches)

    sync()
    mq.addEventListener('change', sync)

    return () => mq.removeEventListener('change', sync)
  }, [])

  return reduced
}

export function usePointerVector(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (!window.matchMedia(FINE_POINTER_QUERY).matches) return

    const el = document.documentElement

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf = 0
    let running = false

    const tick = () => {
      cx += (tx - cx) * 0.065
      cy += (ty - cy) * 0.065

      el.style.setProperty('--px', String(cx))
      el.style.setProperty('--py', String(cy))

      if (
        Math.abs(tx - cx) > 0.0015 ||
        Math.abs(ty - cy) > 0.0015
      ) {
        raf = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    const start = () => {
      if (running) return

      running = true
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = (e.clientY / window.innerHeight) * 2 - 1

      start()
    }

    const onLeave = () => {
      tx = 0
      ty = 0

      start()
    }

    window.addEventListener('pointermove', onMove, {
      passive: true,
    })

    document.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])
}

export function useElementPointer(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
) {
  useEffect(() => {
    const el = ref.current

    if (!el || !enabled) return
    if (!window.matchMedia(FINE_POINTER_QUERY).matches) return

    let rect = el.getBoundingClientRect()

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    let frame = 0
    let running = false

    const measure = () => {
      rect = el.getBoundingClientRect()
    }

    const clamp = (n: number) =>
      Math.max(-1, Math.min(1, n))

    const tick = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08

      el.style.setProperty('--tx', String(cx))
      el.style.setProperty('--ty', String(cy))

      if (
        Math.abs(tx - cx) > 0.002 ||
        Math.abs(ty - cy) > 0.002
      ) {
        frame = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    const start = () => {
      if (running) return

      running = true
      frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const mx = rect.left + rect.width / 2
      const my = rect.top + rect.height / 2

      tx = clamp(
        (e.clientX - mx) /
          Math.max(rect.width * 0.95, 220),
      )

      ty = clamp(
        (e.clientY - my) /
          Math.max(rect.height * 0.7, 220),
      )

      start()
    }

    const onLeave = () => {
      tx = 0
      ty = 0

      start()
    }

    window.addEventListener('pointermove', onMove, {
      passive: true,
    })

    window.addEventListener('resize', measure, {
      passive: true,
    })

    window.addEventListener('pointerleave', onLeave, {
      passive: true,
    })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', measure)
      window.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [ref, enabled])
}