// components/header/HeaderTitle.tsx
'use client'

import { motion } from 'motion/react'
import { useScramble } from 'use-scramble'
import { useEffect, useState } from 'react'
import { INTRO_TIMELINE, introVariants } from '@lib/animations'
import packageJson from '@package'

export function VersionBadge() {
  const { ref } = useScramble({
    text: `Alpha v${packageJson.version}`,
    speed: 0.4,
    tick: 1,
    step: 1,
    scramble: 10,
    seed: 2,
    chance: 0.8,
    ignore: [' '],
  })

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, INTRO_TIMELINE.version.delay * 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="overflow-hidden w-full text-center xs:text-left">
      <motion.p
        ref={ref}
        variants={introVariants.version}
        initial="initial"
        animate={isVisible ? 'animate' : 'exit'}
        className="text-base text-black font-medium -tracking-wider"
      />
    </div>
  )
}

export function HeaderTitle() {
  return (
    <>
      <div className="overflow-hidden relative mb-3">
        <motion.h1
          variants={introVariants.title}
          initial="initial"
          animate="animate"
          className="font-bold leading-[12vw] 2xs:leading-[45px] xs:leading-[60px] text-center xs:text-left text-[12vw] 2xs:text-5xl xs:text-6xl break-words"
        >
          Portail Événementiel
        </motion.h1>
      </div>
      <VersionBadge />
    </>
  )
}
