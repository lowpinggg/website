// components/Logo.tsx
'use client'

import { motion } from 'motion/react'
import { Full } from '@lowping/brand-kit'

// components/Logo.tsx

interface LogoProps {
  isIntro?: boolean
}

export function Logo({ isIntro = false }: LogoProps) {
  return (
    <motion.div
      initial={
        isIntro
          ? {
              position: 'fixed',
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              scale: 2,
              zIndex: 45,
            }
          : {}
      }
      animate={{
        position: 'relative',
        top: 0,
        left: 0,
        x: 0,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: 2, // Match overlay slide timing
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Full width={160} />
    </motion.div>
  )
}
