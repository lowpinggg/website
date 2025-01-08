// features/home/components/TextSection/TextSection.tsx

import { motion } from 'motion/react'
import { GameBadge } from '@components/GameBadge'
import { staggerVariants } from '@lib/animations'

export function TextSection() {
  return (
    <section className="py-32 container mx-auto">
      <div className="grid grid-cols-2 gap-8 container mx-auto">
        <h2 className="text-5xl font-black leading-tighter">
          {
            "Une organisation pour des tournois fluides. Vous n'avez plus qu'à jouer."
          }
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="hidden text-2xl font-black text-zinc-200 uppercase tracking-tight">
              {'Vos jeux, vos tournois.'}
            </h2>
            <p className="text-lg font-light leading-relaxed tracking-snug">
              Figma ipsum component variant main layer. Asset shadow community
              inspect pencil ellipse background content. Link effect invite
              layer component reesizing community ipsum editor.
            </p>
          </div>
          <motion.div
            variants={staggerVariants.parent}
            initial="initial"
            animate="animate"
            className="flex gap-2"
          >
            <motion.div variants={staggerVariants.child}>
              <GameBadge game="League of Legends" />
            </motion.div>
            <motion.div variants={staggerVariants.child}>
              <GameBadge game="Teamfight Tactics" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
