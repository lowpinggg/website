// components/header/HeaderTitle.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useScramble } from 'use-scramble'
import packageJson from '@/package'
import { INTRO_TIMELINE, introVariants } from '@/lib/animations'

export function VersionBadge() {
  const { ref } = useScramble({
    text: `Alpha v${packageJson.version}`,
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 12,
    seed: 2,
    chance: 0.8,
    ignore: [' ']
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
      <motion.pre
        ref={ref}
        variants={introVariants.version}
        initial="initial"
        animate={isVisible ? 'animate' : 'exit'}
        className="text-sm text-black font-bold"
      />
    </div>
  )
}

export function HeaderTitle() {
  return (
    <>
      <div className="overflow-hidden relative mb-2">
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
