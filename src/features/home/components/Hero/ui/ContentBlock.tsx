import { motion } from 'motion/react'
import { introVariants } from '@lib/animations'
import { ActionButtons } from './ActionButtons'

export function ContentBlock() {
  return (
    <motion.div
      variants={introVariants.content.container}
      initial="initial"
      animate="animate"
      className="z-20 flex max-w-xl origin-top flex-col gap-6"
    >
      <div className="overflow-hidden">
        <motion.p
          variants={introVariants.content.text}
          initial="initial"
          animate="animate"
          className="sm:text-md tracking-snug w-full text-sm font-light leading-5 text-foreground/80 md:max-w-2xl"
        >
          {
            "La première solution professionnelle pour vos tournois esport. Notre équipe s'occupe de tout. Organisation, arbitrage, et diffusion. Concentrez-vous uniquement sur le jeu."
          }
        </motion.p>
      </div>
      <div className="overflow-hidden">
        <ActionButtons />
      </div>
    </motion.div>
  )
}
