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
    <div className="overflow-hidden w-fit">
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
      <div className="overflow-hidden relative h-fit mb-2">
        <motion.h1
          variants={introVariants.title}
          initial="initial"
          animate="animate"
          className="font-bold leading-auto md:leading-[62px] text-center text-4xl sm:text-left sm:text-5xl md:text-6xl"
        >
          Portail Événementiel
        </motion.h1>
      </div>
      <VersionBadge />
    </>
  )
}
