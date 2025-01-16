// features/home/components/Hero/Hero.tsx
'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { setScrollLock } from '@hooks/use-lockscroll'
import { introVariants } from '@lib/animations'
import { timeline } from '@lib/animations'
import { Full } from '@lowping/brand-kit'
import { HeroBackground } from './HeroBackground'
import { HeroContent } from './HeroContent'
import { ContentBlock } from './ui/ContentBlock'
import { Title } from './ui/Title'

// features/home/components/Hero/Hero.tsx

// features/home/components/Hero/Hero.tsx

export function Logo({ show }: { show: boolean }) {
  return (
    <div className="relative z-50 overflow-hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            variants={introVariants.logo}
            initial="initial"
            animate="animate"
            exit="exit"
            className="origin-top"
          >
            <Full width={210} color="black" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Hero() {
  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    setScrollLock(true)
    const timer = setTimeout(() => {
      setShowLogo(false)
    }, timeline.intro.logo.hideDelay * 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          variants={introVariants.overlay}
          initial="initial"
          animate="animate"
          className="fixed inset-0 z-30 origin-top overflow-hidden bg-[#BFF603]"
          onAnimationComplete={() => setScrollLock(false)}
        >
          <div className="container flex h-full items-center">
            <div className="flex h-fit max-w-4xl flex-col justify-center px-4 md:px-0">
              <Logo show={showLogo} />
              <Title isOverlay />
              <ContentBlock />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative flex min-h-screen items-center justify-center">
        <HeroBackground />
        <HeroContent />
      </div>
    </>
  )
}
