'use client'

import { motion, type Variants } from 'framer-motion'
import { site } from '@/config/site'
import { assets } from '@/config/assets'
import { ease, viewportOnce } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/hooks'
import TornEdge from '@/components/paper/TornEdge'
import ConnectCTA from './ConnectCTA'

const DRIFT = '58s'
const COPIES = 3

export default function SiteFooter() {
  const reduced = usePrefersReducedMotion()
  const phrase = site.footer.marquee.join('  —  ')

  const group: Variants = {
    hidden: {},
    show: { transition: { delayChildren: reduced ? 0 : 0.06 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduced ? { duration: 0 } : { duration: 0.95, delay: i * 0.14, ease: ease.paper },
    }),
  }

  return (
    <footer id="contact" className="relative w-full" aria-label="Contact">
      <div className="relative overflow-hidden pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(4rem,11vw,9rem)]">
        {}
        <div
          className="footer-marquee pointer-events-none absolute inset-0 flex items-center"
          aria-hidden="true"
        >
          <div className="marquee-track" style={{ ['--marquee-duration' as string]: DRIFT }}>
            {Array.from({ length: COPIES }, (_, i) => (
              <span
                key={i}
                className="display whitespace-nowrap"
                style={{ fontSize: 'clamp(2.25rem, 8vw, 10rem)', letterSpacing: '-0.03em', paddingRight: '0.4em' }}
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="relative z-10 mx-auto max-w-[112rem] px-[max(1.5rem,7vw)]"
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {}
          <motion.h2 className="m-0" variants={item} custom={0}>
            <ConnectCTA />
          </motion.h2>

          <motion.p
            className="eyebrow m-0 mt-[1.15em] text-ink"
            style={{ fontSize: 'clamp(0.6875rem,1vw,0.875rem)', letterSpacing: '0.18em' }}
            variants={item}
            custom={1}
          >
            {site.firstName} {site.connect.status}.
          </motion.p>

          <motion.p
            className="body-copy copy m-0 mt-[0.85em] text-graphite"
            variants={item}
            custom={2}
          >
            {site.footer.sub}
          </motion.p>

          <motion.p
            className="body-copy m-0 mt-[0.45em] text-graphite"
            variants={item}
            custom={2}
          >
            imraannabi7@gmail.com · {site.footer.location}
          </motion.p>

          <motion.div
            className="mt-[clamp(3rem,8vw,6rem)] flex flex-wrap items-end justify-between gap-[clamp(1.5rem,4vw,3rem)]"
            variants={item}
            custom={3}
          >
            <Signature />
            <SocialRow />
          </motion.div>
        </motion.div>
      </div>

      {}
      <TornEdge side="top" seed={73} roughness={0.76} />
      <div className="on-noir bg-noir px-[max(1.5rem,7vw)] pb-[clamp(1.75rem,4vw,3rem)] pt-[clamp(0.5rem,1.5vw,1rem)]">
        <p
          className="meta m-0 text-white/45"
          style={{ fontSize: 'clamp(0.625rem,0.85vw,0.75rem)', letterSpacing: '0.14em' }}
        >
          © {site.firstName}
        </p>
      </div>
    </footer>
  )
}

function Signature() {
  return (
    <div className="flex flex-col items-start gap-[0.5rem]">
      <span className="block h-[3px] w-[2.25rem] bg-signal" aria-hidden="true" />
      {assets.signature ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={assets.signature}
          alt={site.firstName}
          className="block h-[clamp(2.25rem,4.5vw,3.5rem)] w-auto"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span
          className="text-ink"
          style={{
            fontFamily: 'var(--font-hand)',
            fontSize: 'clamp(1.6rem,3.4vw,2.75rem)',
            lineHeight: 1,
          }}
        >
          {site.firstName}
        </span>
      )}
    </div>
  )
}

function SocialRow() {
  return (
    <ul className="m-0 flex list-none flex-wrap items-center gap-[clamp(1rem,2.4vw,2rem)] p-0">
      {site.footer.links.map((link, index) => {
        const external =
          !!link.href && /^https?:/i.test(link.href)

        return (
          <li key={`${link.label}-${index}`}>
            <a
              href={link.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="eyebrow group/link inline-flex items-center gap-[0.5em] text-ink transition-colors duration-300 hover:text-signal"
              style={{
                fontSize: 'clamp(0.6875rem,1vw,0.8125rem)',
                letterSpacing: '0.14em',
              }}
            >
              {link.label}
              <span className="block h-px w-[0.9em] bg-current transition-transform duration-300 group-hover/link:translate-x-[3px]" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
