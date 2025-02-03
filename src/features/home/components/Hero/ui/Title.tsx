import { introVariants } from '@lib/animations'
import { cn } from '@lib/utils'
import { motion } from 'motion/react'

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
            `max-w-5xl text-[15vw] font-black leading-[85%] tracking-[0.64px] xs:text-[64px] sm:leading-[85%] md:text-[86px] lg:text-[94px] lg:leading-[85%]`,
            isOverlay ? 'text-black' : 'text-white',
          )}
        >
          TOURNOIS ESPORT SANS FRICTION
        </h1>
      </motion.div>
    </div>
  )
}
