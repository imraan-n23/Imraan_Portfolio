'use client'

import { useRef } from 'react'
import HeroTypography from './HeroTypography'
import ScrollReveal from './ScrollReveal'

export default function Hero() {
  const hero = useRef<HTMLElement>(null)

  return (
    <section ref={hero} className="relative min-h-svh w-full" aria-label="Cover">
      <div className="relative z-10 flex min-h-svh w-full items-center justify-center px-[4vw]">
        <div
          style={{
            transform:
              'translate3d(calc(var(--px, 0) * -2.5px), calc(var(--lockup-shift) + var(--py, 0) * -2px), 0)',
            willChange: 'transform',
          }}
        >
          <HeroTypography />
        </div>
      </div>

      {}
      <ScrollReveal target={hero} />
    </section>
  )
}
