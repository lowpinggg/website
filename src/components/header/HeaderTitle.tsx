// components/header/HeaderTitle.tsx
'use cient'

import { useEffect } from 'react'
import { motion, useAnimationControls } from 'motion/react'
import { useScramble } from 'use-scramble'

import { INTRO_SEQUENCE } from '@/lib/animations/constants'
import { EASE_OUT_EXPO } from '@/lib/animations/properties'
import { introVariants } from '@/lib/animations/variants'

export function VersionBadge() {
  const { ref } = useScramble({
    text: 'Alpha 0.0.1',
    speed: 0.5,
    tick: 1,
    step: 1,
    scramble: 12,
    seed: 2,
    chance: 0.8,
    ignore: [' ']
  })

  const controls = useAnimationControls()

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        y: 0,
        transition: {
          duration: INTRO_SEQUENCE.version.duration,
          ease: EASE_OUT_EXPO
        }
      })
      await new Promise((resolve) =>
        setTimeout(resolve, INTRO_SEQUENCE.version.hideDelay)
      )
      await controls.start({
        y: -50,
        transition: {
          duration: INTRO_SEQUENCE.version.duration,
          ease: EASE_OUT_EXPO
        }
      })
    }

    animate()
  }, [controls])

  return (
    <div className="overflow-hidden w-fit">
      <motion.pre
        ref={ref}
        animate={controls}
        initial={{ y: 50 }}
        className="text-sm text-black font-bold"
      />
    </div>
  )
}

export function HeaderTitle() {
  return (
    <div className="overflow-hidden relative">
      <motion.h1
        {...introVariants.title}
        className="font-bold leading-auto md:leading-[62px] text-center text-4xl sm:text-left sm:text-5xl md:text-6xl"
      >
        Portail Événementiel
      </motion.h1>
      <VersionBadge />
    </div>
  )
}
