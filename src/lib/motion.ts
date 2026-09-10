import type { Transition } from 'framer-motion'

export const ease = {
  
  paper: [0.16, 1, 0.3, 1] as const,
  
  ink: [0.25, 0.8, 0.3, 1] as const,
  
  soft: [0.4, 0, 0.2, 1] as const,
  
  breath: [0.45, 0, 0.55, 1] as const,
}

export const cue = {
  paper: 0.0,
  grid: 0.18,
  eyebrow: 0.44,
  word: 0.6,
  letterStagger: 0.058,
  
  face: 1.45,
  firstBlink: 2.15,
  name: 2.45,
  scroll: 2.95,
} as const

export const t = {
  slow: { duration: 1.1, ease: ease.paper } satisfies Transition,
  base: { duration: 0.78, ease: ease.paper } satisfies Transition,
  quick: { duration: 0.45, ease: ease.ink } satisfies Transition,
}

export const riseIn = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: t.base },
}

export const viewportOnce = { once: true, amount: 0.28 } as const
