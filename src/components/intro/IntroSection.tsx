'use client'

import { motion, type Variants } from 'framer-motion'
import { site } from '@/config/site'
import { assets } from '@/config/assets'
import { intro } from '@/config/tokens'
import { ease, viewportOnce } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'
import VideoArtFrame from './VideoArtFrame'
import SkillsGrid from './SkillsGrid'

export default function IntroSection() {
  const reduced = usePrefersReducedMotion()

  const group: Variants = {
    hidden: {},
    show: { transition: { delayChildren: reduced ? 0 : 0.05 } },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: 0 } : { duration: 0.95, delay: i * 0.13, ease: ease.paper },
    }),
  }

  const plate: Variants = {
    hidden: { opacity: 0, scale: 1.045 },
    show: {
      opacity: 1,
      scale: 1,
      transition: reduced ? { duration: 0 } : { duration: 1.5, ease: ease.paper },
    },
  }

  const heading: Variants = {
    hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: reduced ? { duration: 0 } : { duration: 0.95, delay: 0.13, ease: ease.paper },
    },
  }

  return (
    <section
      id="intro"
      className="relative w-full pb-0 pt-[clamp(3.5rem,10vh,8rem)]"
      aria-label="Introduction"
    >
      <div className="relative z-10 px-[max(1.5rem,7vw)] pb-[clamp(2.5rem,6vh,4.5rem)]">
        <motion.div
          className="intro-grid mx-auto max-w-[112rem]"
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {}
          <motion.div className="area-heading" variants={heading}>
            <h2
              className="display m-0 text-ink"
              style={{ fontSize: 'clamp(3.25rem, 6.4vw, 8.5rem)', letterSpacing: '-0.045em' }}
            >
              {site.intro.heading}
            </h2>
          </motion.div>

          {}
          <motion.div className="area-portrait relative z-[3] lg:-mb-[7vw]" variants={plate}>
            <VideoArtFrame
              video={assets.frame.video}
              poster={assets.frame.poster}
              image={assets.frame.image}
              aspect={intro.portraitAspect}
              objectFit={assets.frame.fit}
              objectPosition={assets.frame.position}
              keyBand={assets.frame.key}
              alt={`${site.firstName}, full length`}
            />
          </motion.div>

          {}
          <motion.div className="area-copy" variants={item} custom={2}>
            <p className="body-copy m-0 mt-[0.6em] font-bold text-ink">{site.intro.lede}</p>

            <div className="mt-[1.6em] flex flex-col gap-[1.15em]">
              {site.intro.paragraphs.map((para) => (
                <p key={para} className="body-copy copy m-0 text-graphite">
                  {para}
                </p>
              ))}
            </div>

            <h3 className="section-head m-0 mt-[1.5em] text-ink">{site.education.heading}</h3>

            <dl className="m-0 mt-[1.1em] flex flex-col gap-[1.15em]">
              {site.education.items.map((edu) => (
                <div key={edu.degree}>
                  <dt className="body-copy m-0 font-bold leading-snug text-ink">{edu.degree}</dt>
                  <dd className="body-copy m-0 mt-[0.2em] leading-snug text-graphite">{edu.detail}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {}
          <motion.div className="area-aside" variants={item} custom={3}>
            <div>
              <h3 className="section-head m-0 mb-[0.75em] text-ink">{site.skills.heading}</h3>
              <SkillsGrid />
            </div>

            <div>
              <h3 className="section-head m-0 mb-[0.75em] text-ink">{site.experience.heading}</h3>
              <ol className="m-0 flex list-none flex-col gap-[1.5em] p-0">
                {site.experience.items.map((job) => (
                  <li key={job.period}>
                    <p className="body-copy m-0 font-bold leading-snug tracking-[-0.01em] text-ink">
                      {job.period}
                    </p>
                    <p className="body-copy m-0 mt-[0.15em] font-bold leading-snug text-ink">{job.role}</p>
                    <p className="body-copy m-0 mt-[0.1em] leading-snug text-graphite">{job.company}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
