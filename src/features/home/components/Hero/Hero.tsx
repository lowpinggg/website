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

// features/home/components/Hero/Hero.tsx

export function Hero() {
  useEffect(() => {
    setScrollLock(true)
  }, [])

  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false)
    }, timeline.intro.logo.hideDelay * 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="overlay"
          variants={introVariants.overlay}
          initial="initial"
          animate="animate"
          className="fixed inset-0 z-30 origin-top overflow-hidden bg-[#BFF603]"
          onAnimationComplete={() => {
            setScrollLock(false)
          }}
        >
          <div className="container flex h-full items-center">
            <div className="flex h-fit max-w-4xl flex-col justify-center">
              <div className="relative z-50 overflow-hidden">
                <AnimatePresence>
                  {showLogo && (
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
              <motion.div
                variants={introVariants.title.container}
                initial="initial"
                animate="animate"
                className="relative overflow-hidden"
              >
                <h1 className="text-8xl font-black leading-[85%] tracking-[0.64px] text-black">
                  TOURNOIS ESPORT SANS FRICTION
                </h1>
              </motion.div>

              <div className="invisible overflow-hidden">
                <motion.div
                  variants={introVariants.content.container}
                  initial="initial"
                  animate="animate"
                  className="flex origin-top flex-col gap-6"
                >
                  <p className="max-w-2xl text-base font-light leading-6 tracking-tight">
                    La première plateforme dédiée à lorganisation pro de vos
                    tournois. Matchmaking équitable, gestion simplifiée -
                    concentrez-vous uniquement sur le jeu.
                  </p>
                  <motion.div
                    variants={introVariants.content.button}
                    initial="initial"
                    animate="animate"
                    className="flex gap-2"
                  >
                    <div className="h-[40px] w-[120px]" />
                    <div className="h-[40px] w-[120px]" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Regular content */}
      <div className="flex h-screen items-center justify-center">
        <div className="relative mx-4 mt-4 flex h-full w-full items-center justify-center overflow-hidden py-40">
          <HeroBackground />
          <HeroContent />
        </div>
      </div>
    </>
  )
}
