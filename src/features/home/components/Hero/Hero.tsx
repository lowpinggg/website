// features/home/components/Hero/Hero.tsx
'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { setScrollLock } from '@hooks/use-lockscroll'
import { HeroBackground } from './HeroBackground'
import { HeroContent } from './HeroContent'

// features/home/components/Hero/Hero.tsx

export function Hero() {
  useEffect(() => {
    setScrollLock(true)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="overlay"
          className="fixed inset-0 z-40 origin-top"
          style={{ backgroundColor: '#BFF603' }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{
            delay: 2,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={() => setScrollLock(false, 600)}
        />
      </AnimatePresence>

      <div className="flex items-center justify-center">
        <div className="relative mx-4 mt-4 flex h-full w-full items-center justify-center overflow-hidden py-40">
          <HeroBackground />
          <HeroContent />
        </div>
      </div>
    </>
  )
}
