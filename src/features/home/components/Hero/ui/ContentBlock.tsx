import { motion } from 'motion/react'
import { introVariants } from '@lib/animations'
import { cn } from '@lib/utils'
import { ActionButtons } from './ActionButtons'

export function ContentBlock() {
  return (
    <motion.div
      variants={introVariants.content.container}
      initial="initial"
      animate="animate"
      className="z-20 flex origin-top flex-col gap-6 text-center"
    >
      <div className="overflow-hidden">
        <motion.p
          variants={introVariants.content.text}
          initial="initial"
          animate="animate"
          className="text-md tracking-snug max-w-2xl font-light leading-5 text-foreground/80"
        >
          {
            "La première solution professionnelle pour vos tournois esport. Notre équipe s'occupe de tout : organisation, arbitrage, et diffusion - concentrez-vous uniquement sur le jeu."
          }
        </motion.p>
      </div>
      <div className={cn('overflow-hidden')}>
        <ActionButtons />
      </div>
    </motion.div>
  )
}
