'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePrefersReducedMotion, useElementPointer } from '@/lib/hooks'

type Props = {
  
  video?: string | null
  
  poster?: string | null
  
  image?: string | null
  
  aspect: number
  objectFit?: 'cover' | 'contain'
  
  objectPosition?: string
  
  keyBand?: { low: number; high: number } | null
  
  feather?: number
  
  drift?: number
  
  ground?: boolean
  alt?: string
  className?: string
}

export default function VideoArtFrame({
  video = null,
  poster = null,
  image = null,
  aspect,
  objectFit = 'cover',
  objectPosition = '50% 50%',
  keyBand = { low: 0.62, high: 0.78 },
  feather = 4,
  drift = 4,
  ground = true,
  alt = '',
  className = '',
}: Props) {
  const reduced = usePrefersReducedMotion()
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const filterId = `paper-key-${uid}`

  const root = useRef<HTMLElement>(null) as React.RefObject<HTMLElement | null>
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false)

  useElementPointer(root, drift > 0 && !reduced)

  useEffect(() => {
    const el = root.current
    if (!el || !video) return
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {

      rootMargin: '100% 0px',
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [video])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !video) return

    if (!active) {
      el.pause()
      return
    }

    let cancelled = false
    el.play().catch(() => {
      if (cancelled) return

      const retry = () => {
        el.play().catch(() => {})
      }
      window.addEventListener('pointerdown', retry, { once: true })
      window.addEventListener('keydown', retry, { once: true })
    })

    return () => {
      cancelled = true
    }
  }, [active, video])

  const slope = keyBand ? 1 / Math.max(keyBand.high - keyBand.low, 0.01) : 0
  const intercept = keyBand ? -(1 - keyBand.high) * slope : 0

  const treatment = [
    keyBand ? `url(#${filterId})` : '',

    'saturate(0.95) contrast(1.03)',
  ]
    .filter(Boolean)
    .join(' ')

  const edge = `linear-gradient(to right, transparent 0, #000 ${feather}%, #000 ${100 - feather}%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 ${(feather * 0.7).toFixed(1)}%, #000 ${(100 - feather * 0.7).toFixed(1)}%, transparent 100%)`

  const softEdge = feather
    ? {
        maskImage: edge,
        WebkitMaskImage: edge,
        maskComposite: 'intersect' as const,
        WebkitMaskComposite: 'source-in',
      }
    : undefined

  const mediaStyle = { objectFit, objectPosition, filter: treatment }

  return (
    <figure ref={root} className={`relative m-0 ${className}`}>
      {keyBand && (
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
          <defs>
            <filter
              id={filterId}
              x="0"
              y="0"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              {}
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -0.2126 -0.7152 -0.0722 0 1"
              />
              {}
              <feComponentTransfer>
                <feFuncA type="linear" slope={slope.toFixed(4)} intercept={intercept.toFixed(4)} />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
      )}

      {ground && <Ground />}

      {}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: String(aspect),
          transform: `translate3d(calc(var(--tx, 0) * ${drift}px), calc(var(--ty, 0) * ${(drift * 0.75).toFixed(2)}px), 0)`,
          willChange: drift ? 'transform' : undefined,
          ...softEdge,
        }}
      >
        {video ? (
          <video
            ref={videoRef}
            
            src={active ? video : undefined}
            poster={poster ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controls={false}
            aria-label={alt || undefined}
            className="h-full w-full"
            style={mediaStyle}
          />
        ) : image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={alt}
            className="h-full w-full"
            style={mediaStyle}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="sr-only">Media placeholder</span>
        )}
      </div>
    </figure>
  )
}

function Ground() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 block">
      <span
        className="absolute left-1/2 top-[89%] h-[5%] w-[64%] -translate-x-1/2"
        style={{ background: 'radial-gradient(closest-side, rgba(34,29,20,0.20), transparent 74%)' }}
      />
      <span className="absolute left-0 top-[calc(100%+16px)] h-px w-[46%] bg-ink/20" />
      <span className="absolute left-0 top-[calc(100%+16px)] h-px w-[10px] bg-signal/70" />
    </span>
  )
}
