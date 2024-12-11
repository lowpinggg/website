// components/register/Poster.tsx
'use client'
import Image from 'next/image'
import Tilt from 'react-parallax-tilt'
import { motion } from 'motion/react'

type Props = {
  className?: string
  imageUrl?: string
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  scale?: number
  glareMaxOpacity?: number
}

export function Poster({ 
  className = '', 
  imageUrl = '/default-poster.png',
  tiltMaxAngleX = 15,
  tiltMaxAngleY = 15,
  scale = 1.03,
  glareMaxOpacity = 0.5
}: Props) {
  return (
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Tilt
        className={`w-[420px] h-[560px] mx-auto ${className}`}
        perspective={1000}
        scale={scale}
        tiltMaxAngleX={tiltMaxAngleX}
        tiltMaxAngleY={tiltMaxAngleY}
        glareEnable={true}
        glareMaxOpacity={glareMaxOpacity}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="11px"
      >
        <Image
          src={imageUrl}
          alt="Poster image"
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 420px) 100vw, 420px"
          priority
        />
      </Tilt>
    </motion.div>
  )
}