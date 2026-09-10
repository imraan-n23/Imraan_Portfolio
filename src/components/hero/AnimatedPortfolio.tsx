'use client'

import { motion } from 'framer-motion'
import { hero } from '@/config/tokens'
import { cue, ease } from '@/lib/motion'
import { mulberry32 } from '@/lib/random'
import AnimatedFace from './AnimatedFace'
import { usePrefersReducedMotion } from '@/lib/hooks'

const wobble = (() => {
  const rand = mulberry32(7351)
  return Array.from({ length: 24 }, () => (rand() - 0.5) * 1.15)
})()

type Props = {
  word: string
  
  faceIndex: number
}

export default function AnimatedPortfolio({ word, faceIndex }: Props) {
  const reduced = usePrefersReducedMotion()
  const chars = word.split('')
  const { face } = hero

  return (
    <h1
      aria-label={word}
      className="display relative m-0 select-none"
      style={{
        fontSize: '1em',
        fontStretch: hero.displayStretch,
        letterSpacing: hero.displayTracking,
        whiteSpace: 'nowrap',
        lineHeight: 1,
      }}
    >
      {}
      <span
        aria-hidden="true"
        className="word-ghost pointer-events-none absolute inset-0 text-ink"
      >
        {chars.map((c, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              width: i === faceIndex ? `${face.slot}em` : undefined,
              visibility: i === faceIndex ? 'hidden' : undefined,
            }}
          >
            {c}
          </span>
        ))}
      </span>

      {}
      <span aria-hidden="true" className="relative">
        {chars.map((char, i) => {
          if (i === faceIndex) {
            return (
              <span
                key={i}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: `${face.slot}em`,
                  height: 0,
                  verticalAlign: 'baseline',
                }}
              >
                <span
                  style={{
                    position: 'absolute',

                    left: `${-(face.width - face.slot) / 2}em`,
                    right: `${-(face.width - face.slot) / 2}em`,

                    bottom: `${-face.belowBaseline - 0.16}em`,

                    height: `${face.height}em`,
                  }}
                >
                  <AnimatedFace />
                </span>
              </span>
            )
          }

          return (
            <motion.span
              key={i}
              className="inline-block will-change-transform"
              initial={{
                opacity: 0,
                y: '0.085em',
                scale: 1.04,
                rotate: wobble[i],
                filter: 'blur(7px)',
              }}
              animate={
                reduced
                  ? {
                      opacity: 1,
                      y: '0em',
                      scale: 1,
                      rotate: 0,
                      filter: 'blur(0px)',
                    }
                  : {
                      opacity: [0, 0.16, 0.16, 1],
                      y: ['0.085em', '0.05em', '0.022em', '0em'],
                      scale: [1.04, 1.02, 1.008, 1],
                      rotate: [
                        wobble[i],
                        wobble[i] * 0.6,
                        wobble[i] * 0.25,
                        0,
                      ],
                      filter: [
                        'blur(7px)',
                        'blur(3.5px)',
                        'blur(1.2px)',
                        'blur(0px)',
                      ],
                    }
              }
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      duration: 0.92,
                      delay: cue.word + i * cue.letterStagger,
                      ease: ease.paper,
                      times: [0, 0.28, 0.52, 1],
                    }
              }
            >
              {char}
            </motion.span>
          )
        })}
      </span>
    </h1>
  )
}
