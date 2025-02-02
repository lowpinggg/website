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
        className="relative overflow-hidden text-start"
      >
        <h1
          className={cn(
            `text-[15vw] font-black leading-[85%] tracking-[0.64px] xs:text-[64px] sm:text-[80px] sm:leading-[85%] md:text-9xl md:leading-[85%]`,
            isOverlay ? 'text-black' : 'text-white',
          )}
        >
          TOURNOIS ESPORT SANS FRICTION
        </h1>
      </motion.div>
    </div>
  )
}
