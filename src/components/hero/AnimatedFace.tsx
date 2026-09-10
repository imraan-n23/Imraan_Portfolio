'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { assets } from '@/config/assets'
import { cue, ease } from '@/lib/motion'
import { FACE_VB, topCurls, sideCurls, beardCurls, specks, path, eye } from './faceGeometry'
import { usePrefersReducedMotion } from '@/lib/hooks'

const INK = '#121211'
const PAPER = '#f3f1eb'

export default function AnimatedFace({ className = '' }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)

  const [blink, setBlink] = useState(false)
  const [smile, setSmile] = useState(false)
  const [dart, setDart] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (reduced) return
    const timers: ReturnType<typeof setTimeout>[] = []

    const shut = (then: () => void) => {
      setBlink(true)
      timers.push(
        setTimeout(() => {
          setBlink(false)
          timers.push(setTimeout(then, 130))
        }, 78),
      )
    }

    const schedule = () => {
      timers.push(
        setTimeout(
          () => {
            if (Math.random() < 0.22) shut(() => shut(schedule))
            else shut(schedule)
          },
          3200 + Math.random() * 4600,
        ),
      )
    }

    timers.push(setTimeout(() => shut(schedule), cue.firstBlink * 1000))
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const timers: ReturnType<typeof setTimeout>[] = []

    const schedule = () => {
      timers.push(
        setTimeout(
          () => {
            setDart({ x: (Math.random() - 0.5) * 4.4, y: (Math.random() - 0.5) * 2 })
            timers.push(
              setTimeout(
                () => {
                  setDart({ x: 0, y: 0 })
                  schedule()
                },
                700 + Math.random() * 1200,
              ),
            )
          },
          2600 + Math.random() * 4200,
        ),
      )
    }

    schedule()
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const timers: ReturnType<typeof setTimeout>[] = []
    const schedule = () => {
      timers.push(
        setTimeout(
          () => {
            setSmile(true)
            timers.push(
              setTimeout(() => {
                setSmile(false)
                schedule()
              }, 2100),
            )
          },
          15000 + Math.random() * 14000,
        ),
      )
    }
    schedule()
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const el = svgRef.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let rect = el.getBoundingClientRect()
    const measure = () => {
      rect = el.getBoundingClientRect()
    }

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let frame = 0
    let running = false

    const tick = () => {
      cx += (tx - cx) * 0.075
      cy += (ty - cy) * 0.075
      el.style.setProperty('--ex', cx.toFixed(3))
      el.style.setProperty('--ey', cy.toFixed(3))
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) {
        frame = requestAnimationFrame(tick)
      } else {
        running = false
      }
    }

    const onMove = (e: PointerEvent) => {
      const fx = rect.left + rect.width / 2
      const fy = rect.top + rect.height / 2
      tx = Math.max(-1, Math.min(1, (e.clientX - fx) / (window.innerWidth * 0.34)))
      ty = Math.max(-1, Math.min(1, (e.clientY - fy) / (window.innerHeight * 0.42)))
      if (!running) {
        running = true
        frame = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
      cancelAnimationFrame(frame)
    }
  }, [reduced])

  const lidScale = blink ? 0.05 : smile ? 0.84 : 1
  const lidTransition = { duration: blink ? 0.075 : 0.22, ease: ease.ink }

  const irisTrack = {
    transform: 'translate(calc(var(--ex, 0) * 2.6px), calc(var(--ey, 0) * 1.7px))',
    transition: 'transform 120ms linear',
  }

  const renderEye = (side: 'left' | 'right') => {
    const outer = side === 'left' ? path.eyeOuterL : path.eyeOuterR
    const inner = side === 'left' ? path.eyeInnerL : path.eyeInnerR
    const c = side === 'left' ? eye.left : eye.right
    const clip = `eye-clip-${side}`

    return (
      <motion.g
        animate={{ scaleY: lidScale }}
        transition={lidTransition}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <clipPath id={clip}>
          <path d={inner} />
        </clipPath>
        <path d={outer} fill={INK} />
        <path d={inner} fill={PAPER} />
        <g clipPath={`url(#${clip})`}>
          <g style={irisTrack}>
            <motion.g animate={dart} transition={{ duration: 0.42, ease: ease.paper }}>
              <circle cx={c.cx} cy={c.cy} r={eye.iris} fill={INK} />
              <circle cx={c.cx + 2.2} cy={c.cy - 2.4} r={1.7} fill={PAPER} />
            </motion.g>
          </g>
        </g>
      </motion.g>
    )
  }

  const flat = assets.heroFace.flat
  const layers = assets.heroFace.layers

  return (
    <motion.div
      className={`relative h-full w-full ${className}`}
      initial={{ opacity: 0, scale: 1.06, y: 8, filter: 'blur(7px)' }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
      transition={reduced ? { duration: 0 } : { duration: 0.95, delay: cue.face, ease: ease.paper }}
      onHoverStart={() => !reduced && setSmile(true)}
      onHoverEnd={() => !reduced && setSmile(false)}
    >
      {}
      <div
        className="h-full w-full"
        style={{
          transform: 'translate3d(calc(var(--px, 0) * -6px), calc(var(--py, 0) * -4px), 0)',
          willChange: 'transform',
        }}
      >
        <motion.div
          className="h-full w-full"
          animate={{ y: [0, -2.2, 0] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 7.5, repeat: Infinity, ease: ease.breath, delay: cue.face }
          }
        >
          {layers ? (
            <FaceLayers layers={layers} blink={blink} smile={smile} />
          ) : flat ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={flat} alt="" className="h-full w-full object-contain" draggable={false} />
          ) : (
            <svg
              ref={svgRef}
              viewBox={FACE_VB}
              className="h-full w-full overflow-visible"
              role="img"
              aria-label="Illustrated self-portrait"
            >
              {}
              <path d={path.headFill} fill={PAPER} />

              {}
              <g fill={INK}>
                <path d={path.sideburnL} />
                <path d={path.sideburnR} />
                {sideCurls.map((c, i) => (
                  <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
                ))}
              </g>

              <g fill={PAPER}>
                <path d={path.earFillL} />
                <path d={path.earFillR} />
              </g>

              <g fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
                <path d={path.jaw} />
                <path d={path.earL} />
                <path d={path.earR} />
                <path d={path.earInnerL} strokeWidth={1.8} />
                <path d={path.earInnerR} strokeWidth={1.8} />
              </g>

              {}
              <g fill={INK}>
                <path d={path.beardBase} />
                {beardCurls.map((c, i) => (
                  <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
                ))}
              </g>

              <g fill={INK}>
                {topCurls.map((c, i) => (
                  <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
                ))}
                <path d={path.hair} />
              </g>
              <g fill={PAPER} opacity={0.62}>
                {specks.map((s, i) => (
                  <circle key={i} cx={s.cx} cy={s.cy} r={s.r} />
                ))}
              </g>

              <motion.g
                fill={INK}
                animate={{ y: smile ? -1.6 : 0 }}
                transition={{ duration: 0.4, ease: ease.paper }}
              >
                <path d={path.browL} />
                <path d={path.browR} />
              </motion.g>

              {renderEye('left')}
              {renderEye('right')}

              <g fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d={path.nose} />
                <path d={path.nostrilL} strokeWidth={1.8} />
                <path d={path.nostrilR} strokeWidth={1.8} />
              </g>

              <path d={path.mustache} fill={INK} />

              {}
              <g fill="none" stroke={INK} strokeWidth={2.8} strokeLinecap="round">
                <motion.path
                  d={path.mouthNeutral}
                  animate={{ opacity: smile ? 0 : 1 }}
                  transition={{ duration: 0.26, ease: ease.soft }}
                />
                <motion.path
                  d={path.mouthSmile}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: smile ? 1 : 0 }}
                  transition={{ duration: 0.26, ease: ease.soft }}
                />
              </g>

              <motion.g
                fill="none"
                stroke={INK}
                strokeWidth={1.6}
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: smile ? 0.5 : 0 }}
                transition={{ duration: 0.35, ease: ease.soft }}
              >
                <path d={path.cheekL} />
                <path d={path.cheekR} />
              </motion.g>

              <path d={path.goatee} fill={INK} />
            </svg>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

function FaceLayers({
  layers,
  blink,
  smile,
}: {
  layers: NonNullable<typeof assets.heroFace.layers>
  blink: boolean
  smile: boolean
}) {
  const cls = 'absolute inset-0 h-full w-full object-contain'
  
  return (
    <div className="relative h-full w-full">
      <img src={layers.base} alt="" className={cls} draggable={false} />
      <motion.img
        src={layers.eyes}
        alt=""
        className={cls}
        animate={{ scaleY: blink ? 0.05 : smile ? 0.84 : 1 }}
        transition={{ duration: blink ? 0.075 : 0.22, ease: ease.ink }}
        style={{ transformOrigin: '50% 50%' }}
        draggable={false}
      />
      <motion.img
        src={layers.lids}
        alt=""
        className={cls}
        animate={{ opacity: blink ? 1 : 0 }}
        transition={{ duration: blink ? 0.06 : 0.12, ease: ease.ink }}
        draggable={false}
      />
      <motion.img
        src={layers.mouth}
        alt=""
        className={cls}
        animate={{ scaleX: smile ? 1.07 : 1, scaleY: smile ? 0.9 : 1, y: smile ? 1 : 0 }}
        transition={{ duration: 0.32, ease: ease.paper }}
        style={{ transformOrigin: '50% 50%' }}
        draggable={false}
      />
    </div>
  )
  
}
