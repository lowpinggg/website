import { motion } from 'motion/react'
import { introVariants } from '@lib/animations'
import { cn } from '@lib/utils'

export function Title({ isOverlay = false }) {
  return (
    <motion.div
      variants={introVariants.title.container}
      initial="initial"
      animate="animate"
      className="relative overflow-hidden text-center"
    >
      <h1
        className={cn(
          `text-8xl font-black leading-[85%] tracking-[0.64px]`,
          isOverlay ? 'text-black' : 'text-white',
        )}
      >
        TOURNOIS ESPORT SANS FRICTION
      </h1>
    </motion.div>
  )
}
