'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { site } from '@/config/site'
import { assets } from '@/config/assets'
import { ease, viewportOnce } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'
import StudioTitle from './StudioTitle'
import PolaroidCard, { type Polaroid } from './PolaroidCard'
import Lightbox from './Lightbox'

export default function StudioSection() {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState<number | null>(null)

  const items: Polaroid[] = site.studio.items.map((item, i) => ({
    ...item,
    src: assets.studio[i] ?? null,
  }))

  const group: Variants = {
    hidden: {},
    show: { transition: { delayChildren: reduced ? 0 : 0.05 } },
  }

  const title: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: 0 } : { duration: 0.9, ease: ease.paper },
    },
  }

  const card: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : { duration: 1.05, delay: 0.28 + i * 0.16, ease: ease.paper },
    }),
  }

  return (
    <section
      id="studio"
      className="relative w-full pt-[clamp(1rem,4vw,4rem)] pb-[clamp(4rem,11vw,9rem)]"
      aria-label={site.studio.heading}
    >
      <motion.div
        className="relative z-10 mx-auto max-w-[112rem] px-[max(1.25rem,5vw)]"
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <StudioTitle text={site.studio.heading} variants={title} />

        {}
        <div className="studio-row">
          {items.map((item, i) => (
            <PolaroidCard key={item.quote} item={item} index={i} variants={card} onOpen={setOpen} />
          ))}
        </div>
      </motion.div>

      <Lightbox items={items} open={open} onClose={() => setOpen(null)} />
    </section>
  )
}
