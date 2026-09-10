'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    // Mobile-la native touch scrolling use pannuvom.
    // Desktop-la mattum Lenis smooth scrolling.
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (x: number) => 1 - Math.pow(1 - x, 4),
      smoothWheel: true,
      touchMultiplier: 1.6,
      autoRaf: false,
    })

    let frame = 0

    const loop = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey
      ) {
        return
      }

      const link = (e.target as Element | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null

      const hash = link?.getAttribute('href')

      if (!hash || hash === '#') return

      const target = document.querySelector(hash)

      if (!target) return

      e.preventDefault()

      lenis.scrollTo(target as HTMLElement, {
        duration: 1.2,
        immediate: false,
      })

      history.pushState(null, '', hash)
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}