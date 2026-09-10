import { crumple, fibre, inkMask } from '@/lib/paper'

type Props = {
  
  seed: number
  ruled?: boolean
  
  crease?: number
  grain?: number
  
  vignette?: boolean
  
  reveal?: boolean
  revealDelay?: number
  className?: string
  children?: React.ReactNode
}

export default function Sheet({
  seed,
  ruled = true,
  crease = 0.5,
  grain = 0.05,
  vignette = true,
  reveal = false,
  revealDelay = 0,
  className = '',
  children,
}: Props) {
  return (
    <div
      className={`paper-sheet ${reveal ? 'sheet-in' : ''} ${className}`}
      style={reveal ? { animationDelay: `${revealDelay}s` } : undefined}
    >
      {ruled && (
        <div
          className="paper-layer paper-grid"
          style={{
            maskImage: inkMask(seed + 91),
            WebkitMaskImage: inkMask(seed + 91),
          }}
        />
      )}
      <div
        className="paper-layer paper-crumple"
        style={{ backgroundImage: crumple(seed), opacity: crease }}
      />
      <div
        className="paper-layer paper-fibre"
        style={{ backgroundImage: fibre(seed + 13), opacity: grain }}
      />
      {vignette && <div className="paper-layer paper-edge-shade" />}
      {children}
    </div>
  )
}
