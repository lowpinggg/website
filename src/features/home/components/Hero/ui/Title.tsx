import { motion } from 'motion/react'
import { introVariants } from '@lib/animations'
import { cn } from '@lib/utils'

export function Title({ isOverlay = false }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        variants={introVariants.title.container}
        initial="initial"
        animate="animate"
        className="relative overflow-hidden text-center"
      >
        <h1
          className={cn(
            `leading-tighter text-6xl font-black tracking-[0.64px] md:text-7xl lg:text-[80px] lg:leading-[85%]`,
            isOverlay ? 'text-black' : 'text-white',
          )}
        >
          TOURNOIS ESPORT SANS FRICTION
        </h1>
      </motion.div>
    </div>
  )
}
