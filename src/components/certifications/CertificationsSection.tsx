'use client'

import { motion, type Variants } from 'framer-motion'
import { site } from '@/config/site'
import { ease, viewportOnce } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'

export default function CertificationsSection() {
  const reduced = usePrefersReducedMotion()

  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : {
            duration: 0.75,
            delay: i * 0.07,
            ease: ease.paper,
          },
    }),
  }

  return (
    <section
      aria-label={site.certifications.heading}
      className="relative w-full py-[clamp(4rem,10vw,8rem)]"
    >
      <div className="mx-auto max-w-[112rem] px-[max(1.5rem,7vw)]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.p
            className="eyebrow m-0 text-ink/55"
            variants={item}
            custom={0}
          >
            06 / CERTIFICATIONS
          </motion.p>

          <motion.h2
            className="display m-0 mt-[0.18em] text-ink"
            style={{
              fontSize: 'clamp(3.25rem, 7vw, 8rem)',
              letterSpacing: '-0.045em',
            }}
            variants={item}
            custom={1}
          >
            {site.certifications.heading}
          </motion.h2>

          <div className="mt-[clamp(2rem,5vw,4rem)] grid gap-[0.85rem] md:grid-cols-2 xl:grid-cols-3">
            {site.certifications.items.map((cert, i) => (
              <motion.a
                key={cert.name}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-ink/20 px-[1.1rem] py-[1rem] transition hover:border-ink hover:bg-ink/5"
                variants={item}
                custom={i + 2}
              >
                <span
                  className="eyebrow text-ink/45"
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.16em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <p className="body-copy m-0 mt-[0.45rem] font-bold text-ink">
                  {cert.name}
                </p>

                <p className="body-copy m-0 mt-[0.2rem] text-sm text-ink/60">
                  {cert.provider}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
