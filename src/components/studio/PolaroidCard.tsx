'use client'

import { useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { usePrefersReducedMotion, useElementPointer } from '@/lib/hooks'
import PolaroidImage from './PolaroidImage'
import PolaroidCaption from './PolaroidCaption'

export type Polaroid = {
  quote: string
  author: string
  
  rotation: number
  
  drop: number
  
  shade: number
  
  skew: number
  
  indent: number
  src?: string | null
  objectPosition?: string
  
  href?: string | null
}

type Props = {
  item: Polaroid
  index: number
  variants: Variants
  onOpen: (index: number) => void
}

export default function PolaroidCard({ item, index, variants, onOpen }: Props) {
  const reduced = usePrefersReducedMotion()
  const place = useRef<HTMLDivElement>(null)
  useElementPointer(place, !reduced)

  const inner = (
    <>
      <PolaroidImage
        src={item.src}
        alt={`Project ${index + 1}: ${item.quote}`}
        index={index}
        objectPosition={item.objectPosition}
      />
      <PolaroidCaption
        quote={item.quote}
        author={item.author}
        skew={item.skew}
        indent={item.indent}
      />
    </>
  )

  return (
    
    <div className="polaroid-slot" style={{ transform: `translateY(${item.drop}%)` }}>
      <motion.div ref={place} className="polaroid-place" variants={variants} custom={index}>
        <div className="polaroid-tilt">
          {item.href ? (
            <a href={item.href} className="polaroid-card block" style={cardVars(item)}>
              {inner}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onOpen(index)}
              aria-label={`Open project ${index + 1}: ${item.quote}`}
              className="polaroid-card w-full cursor-pointer appearance-none border-0 text-left"
              style={cardVars(item)}
            >
              {inner}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function cardVars(item: Polaroid) {
  return {
    ['--rot' as string]: `${item.rotation}deg`,
    ['--shade' as string]: item.shade,
  }
}
