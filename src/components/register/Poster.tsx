// components/register/Poster.tsx
'use client'
import Image from 'next/image'
import Tilt from 'react-parallax-tilt'

type Props = {
  className?: string
  imageUrl?: string
}

export function Poster({ className = '', imageUrl = '/default-poster.png' }: Props) {
  return (
    <Tilt
      className={`w-[420px] h-[560px] ${className}`}
      perspective={1000}
      scale={1.03}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      glareEnable={true}
      glareMaxOpacity={0.5}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="11px"
    >

        <Image
          src={imageUrl}
          alt="Poster image"
          fill
          className="object-cover"
          sizes="(max-width: 420px) 100vw, 420px"
          priority
        />
    </Tilt>
  )
}