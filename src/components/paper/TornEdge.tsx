import { tearPoints, tearCurve, fillBelow, fillAbove } from '@/lib/tear'

const VB_W = 1600

type Props = {
  
  side: 'top' | 'bottom'
  
  color?: string
  
  seed: number
  
  height?: number
  
  bandHeight?: string
  roughness?: number
  className?: string
}

export default function TornEdge({
  side,
  color = 'var(--color-noir)',
  seed,
  height = 110,
  bandHeight = 'clamp(2.5rem, 7.5vw, 8.125rem)',
  roughness = 0.72,
  className = '',
}: Props) {
  const pts = tearPoints({ width: VB_W, height, seed, roughness, detail: 150 })
  const shape = side === 'top' ? fillBelow(pts, VB_W, height) : fillAbove(pts, VB_W)
  const line = tearCurve(pts)

  const fray = `fray-${seed}`
  const blur = `soften-${seed}`
  const rimShift = side === 'top' ? -2.6 : 2.6
  const shadeShift = side === 'top' ? -9 : 9

  return (
    <svg
      className={`block w-full ${className}`}
      viewBox={`0 0 ${VB_W} ${height}`}
      style={{ height: bandHeight }}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={fray} x="-4%" y="-40%" width="108%" height="180%" colorInterpolationFilters="sRGB">
          {}
          <feTurbulence type="fractalNoise" baseFrequency="0.028 0.6" numOctaves="4" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={blur} x="-4%" y="-40%" width="108%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {}
      <path
        d={line}
        fill="none"
        stroke="rgba(48, 42, 32, 0.20)"
        strokeWidth="9"
        transform={`translate(0 ${shadeShift})`}
        filter={`url(#${blur})`}
      />

      <g filter={`url(#${fray})`}>
        {}
        <path
          d={line}
          fill="none"
          stroke="#fffdf7"
          strokeWidth="4"
          strokeOpacity="0.95"
          transform={`translate(0 ${rimShift})`}
        />
        <path d={shape} fill={color} />
      </g>
    </svg>
  )
}
