'use client'

import { motion, type Variants } from 'framer-motion'

export default function StudioTitle({ text, variants }: { text: string; variants: Variants }) {
  return (
    <motion.h2
      className="display m-0 text-center text-ink"
      style={{ fontSize: 'clamp(1.75rem, 3.6vw, 4.5rem)', letterSpacing: '-0.035em' }}
      variants={variants}
    >
      {text}
    </motion.h2>
  )
}
