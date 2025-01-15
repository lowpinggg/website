import { motion } from 'motion/react'
import { introVariants } from '@lib/animations'
import { cn } from '@lib/utils'
import { ActionButtons } from './ActionButtons'

export function ContentBlock({ isOverlay = false }) {
  return (
    <motion.div
      variants={introVariants.content.container}
      initial="initial"
      animate="animate"
      className={cn(
        `flex origin-top flex-col gap-6`,
        isOverlay ? 'invisible' : '',
      )}
    >
      <div className="overflow-hidden">
        <motion.p
          variants={introVariants.content.text}
          initial="initial"
          animate="animate"
          className="max-w-2xl text-base font-light leading-6 tracking-tight text-foreground/80"
        >
          La première plateforme dédiée à lorganisation pro de vos tournois.
          Matchmaking équitable, gestion simplifiée - concentrez-vous uniquement
          sur le jeu.
        </motion.p>
      </div>
      <div className={cn('overflow-hidden', isOverlay ? 'invisible' : '')}>
        <ActionButtons />
      </div>
    </motion.div>
  )
}
