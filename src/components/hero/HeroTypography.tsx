'use client'

import { motion } from 'framer-motion'
import { site } from '@/config/site'
import { hero } from '@/config/tokens'
import { cue, ease } from '@/lib/motion'
import AnimatedPortfolio from './AnimatedPortfolio'
import { usePrefersReducedMotion } from '@/lib/hooks'

export default function HeroTypography() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="lockup relative mx-auto w-fit">
      <div className="lockup-labels">
        <motion.p
          className="eyebrow m-0 text-ink"
          style={{ fontSize: hero.eyebrowSize }}
          initial={{ opacity: 0, y: '0.5em', clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 -20% 0)' }}
          transition={reduced ? { duration: 0 } : { duration: 0.9, delay: cue.eyebrow, ease: ease.paper }}
        >
          {site.eyebrow}
        </motion.p>

        {}

      </div>

      <AnimatedPortfolio word={site.displayWord} faceIndex={site.faceLetterIndex} />
    </div>
  )
}
