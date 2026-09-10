'use client'

import { type RefObject } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { site } from '@/config/site'
import { usePrefersReducedMotion } from '@/lib/hooks'

const DRAW: [number, number] = [0.12, 0.39]
const MARK: [number, number] = [0.39, 0.45]
const NAME: [number, number] = [0.45, 0.6]

export default function ScrollReveal({
  target,
}: {
  target: RefObject<HTMLElement | null>
}) {
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target,
    offset: ['start start', 'end start'],
  })

  const draw = useTransform(scrollYProgress, DRAW, [0, 1])

  const inkFade = useTransform(
    scrollYProgress,
    [DRAW[0], DRAW[0] + 0.04],
    [0, 1],
  )

  const inkY = useTransform(
    scrollYProgress,
    DRAW,
    [-7, 0],
  )

  const markIn = useTransform(
    scrollYProgress,
    MARK,
    [0, 1],
  )

  const markScale = useTransform(
    scrollYProgress,
    MARK,
    [0.7, 1],
  )

  const nameIn = useTransform(
    scrollYProgress,
    [NAME[0], NAME[1] - 0.02],
    [0, 1],
  )

  const nameY = useTransform(
    scrollYProgress,
    NAME,
    ['108%', '0%'],
  )

  return (
    <div
      className="pointer-events-none absolute left-[45vw] top-[57%] z-10 select-none"
      aria-hidden="true"
      style={{
        contain: 'layout style paint',
      }}
    >
      <motion.svg
        viewBox="0 0 190 210"
        fill="none"
        className="block w-[clamp(7rem,12.5vw,12rem)] overflow-visible"
        style={{
          opacity: inkFade,
          y: reduced ? 0 : inkY,
          willChange: reduced ? 'auto' : 'transform, opacity',
        }}
      >
        <motion.path
          d="M 176 6 C 173 48, 156 78, 127 98 C 95 120, 55 133, 40 170 M 21 147 C 28 155, 35 161, 40 173 C 48 163, 57 156, 66 151"
          stroke="var(--color-ink)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{
            pathLength: draw,
          }}
        />

        <motion.path
          d="M 29 186 L 51 186 L 40 202 Z"
          fill="var(--color-signal)"
          style={{
            opacity: markIn,
            scale: reduced ? 1 : markScale,
            originX: 0.5,
            originY: 0.5,
            willChange: reduced ? 'auto' : 'transform, opacity',
          }}
        />
      </motion.svg>

      <motion.p
        className="eyebrow m-0 mt-[0.9em] overflow-hidden text-ink"
        style={{
          fontSize: 'clamp(0.875rem, 1.55vw, 1.75rem)',
          letterSpacing: '0.22em',
        }}
      >
        <motion.span
          className="block"
          style={{
            opacity: nameIn,
            y: reduced ? '0%' : nameY,
            willChange: reduced ? 'auto' : 'transform, opacity',
          }}
        >
          {site.signatureName}
        </motion.span>
      </motion.p>
    </div>
  )
}