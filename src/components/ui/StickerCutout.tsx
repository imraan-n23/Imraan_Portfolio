'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  
  id: string
  
  ratio?: number
  color?: string
  
  enabled?: boolean
  className?: string
  children: React.ReactNode
}

export default function StickerCutout({
  id,
  ratio = 0.052,
  color = '#eb1926',
  enabled = true,
  className = '',
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [radius, setRadius] = useState(10)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setRadius(Math.max(3, Math.round(entry.contentRect.width * ratio)))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ratio])

  if (!enabled) {
    return <div className={`relative ${className}`}>{children}</div>
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <filter id={id} x="-25%" y="-20%" width="150%" height="140%" colorInterpolationFilters="sRGB">
            <feMorphology in="SourceAlpha" operator="dilate" radius={radius} result="spread" />
            <feFlood floodColor={color} result="paint" />
            <feComposite in="paint" in2="spread" operator="in" result="edge" />
            <feMerge>
              <feMergeNode in="edge" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="h-full w-full" style={{ filter: `url(#${id})` }}>
        {children}
      </div>
    </div>
  )
}
