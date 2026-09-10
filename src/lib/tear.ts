import { mulberry32 } from './random'

export type TearPoint = { x: number; y: number; sharp: boolean }

type TearOptions = {
  
  width: number
  
  height: number
  seed: number
  
  roughness?: number
  
  detail?: number
}

export function tearPoints({
  width,
  height,
  seed,
  roughness = 0.62,
  detail = 120,
}: TearOptions): TearPoint[] {
  const rand = mulberry32(seed)
  const mid = height * 0.5
  const amp = height * 0.5 * roughness

  const s1 = { f: 0.7 + rand() * 0.6, p: rand() * Math.PI * 2, a: 0.5 }
  const s2 = { f: 1.9 + rand() * 1.4, p: rand() * Math.PI * 2, a: 0.3 }
  const s3 = { f: 4.1 + rand() * 3.0, p: rand() * Math.PI * 2, a: 0.16 }

  const notchCount = 3 + Math.floor(rand() * 4)
  const notches = Array.from({ length: notchCount }, () => ({
    at: rand(),
    dir: rand() > 0.45 ? 1 : -1,
    depth: 0.45 + rand() * 0.55,
    width: 0.008 + rand() * 0.022,
  }))

  const pts: TearPoint[] = []
  for (let i = 0; i <= detail; i++) {
    const t = i / detail
    const x = t * width

    let y =
      mid +
      amp *
        (s1.a * Math.sin(t * Math.PI * 2 * s1.f + s1.p) +
          s2.a * Math.sin(t * Math.PI * 2 * s2.f + s2.p) +
          s3.a * Math.sin(t * Math.PI * 2 * s3.f + s3.p))

    y += (rand() - 0.5) * amp * 0.22

    let sharp = false
    for (const n of notches) {
      const d = Math.abs(t - n.at)
      if (d < n.width) {
        const falloff = 1 - d / n.width
        y += n.dir * amp * n.depth * falloff * falloff
        if (d < n.width * 0.35) sharp = true
      }
    }

    pts.push({
      x: Math.round(x * 100) / 100,
      y: Math.round(Math.max(2, Math.min(height - 2, y)) * 100) / 100,
      sharp,
    })
  }

  pts[0].y = mid + (pts[0].y - mid) * 0.5
  pts[pts.length - 1].y = mid + (pts[pts.length - 1].y - mid) * 0.5

  return pts
}

export function tearCurve(pts: TearPoint[], moveTo = true): string {
  if (pts.length < 2) return ''
  let d = moveTo ? `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}` : ''

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? pts[i + 1]

    if (p1.sharp || p2.sharp) {
      d += ` L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
      continue
    }

    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

const OVERFILL = 24

export function fillBelow(pts: TearPoint[], width: number, height: number): string {
  const b = height + OVERFILL
  return `${tearCurve(pts)} L ${width} ${b} L 0 ${b} Z`
}

export function fillAbove(pts: TearPoint[], width: number): string {
  const reversed = [...pts].reverse()
  const head = reversed[0]
  const t = -OVERFILL
  return `M 0 ${t} L ${width} ${t} L ${head.x.toFixed(2)} ${head.y.toFixed(2)} ${tearCurve(reversed, false)} Z`
}

export function tearMask({
  seed,
  height,
  roughness = 0.7,
  width = 1600,
}: {
  seed: number
  height: number
  roughness?: number
  width?: number
}): string {
  const pts = tearPoints({ width, height, seed, roughness, detail: 150 })
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' preserveAspectRatio='none'>
      <defs>
        <filter id='f' x='-4%' y='-40%' width='108%' height='180%' color-interpolation-filters='sRGB'>
          <feTurbulence type='fractalNoise' baseFrequency='0.028 0.6' numOctaves='4' seed='${seed}' result='n'/>
          <feDisplacementMap in='SourceGraphic' in2='n' scale='7' xChannelSelector='R' yChannelSelector='G'/>
        </filter>
      </defs>
      <path d='${fillAbove(pts, width)}' fill='#fff' filter='url(#f)'/>
    </svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}")`
}
