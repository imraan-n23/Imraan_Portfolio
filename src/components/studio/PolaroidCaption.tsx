'use client'

type Props = {
  quote: string
  author: string
  
  skew?: number
  
  indent?: number
}

export default function PolaroidCaption({ quote, author, skew = 0, indent = 0 }: Props) {
  return (
    <figcaption className="polaroid-caption">
      <span
        className="block"
        style={{ transform: `rotate(${skew}deg)`, marginLeft: `${indent}%` }}
      >
        {quote}
        <span className="mt-[0.15em] block text-right">— {author}</span>
      </span>
    </figcaption>
  )
}
