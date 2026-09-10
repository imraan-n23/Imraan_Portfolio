'use client'

import { usePointerVector } from '@/lib/hooks'
import Sheet from './Sheet'

export default function PaperRun({ children }: { children: React.ReactNode }) {
  usePointerVector()

  return (
    <div className="relative overflow-x-clip">
      {}
      <div
        className="absolute inset-x-[-2.5%] inset-y-0 -z-10"
        style={{
          transform: 'translate3d(calc(var(--px, 0) * 7px), calc(var(--py, 0) * 5px), 0)',
          willChange: 'transform',
        }}
      >
        <Sheet
          seed={3}
          crease={0.5}
          grain={0.05}
          vignette={false}
          className="h-full w-full"
          reveal
          revealDelay={0.18}
        />
      </div>
      {children}
    </div>
  )
}
