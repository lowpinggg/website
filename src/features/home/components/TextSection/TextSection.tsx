import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { GameBadge } from '@components/GameBadge'

export function TextSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 0.3], [-20, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y }}
      className="container mx-auto py-32 [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
    >
      <motion.div style={{ y }} className="grid grid-cols-2 gap-12">
        <h2 className="leading-tighter text-5xl font-black">
          {
            "Une organisation pour des tournois fluides. Vous n'avez plus qu'à jouer."
          }
        </h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="hidden text-2xl font-black uppercase tracking-tight text-zinc-200">
              {'Vos jeux, vos tournois.'}
            </h2>
            <p className="tracking-snug text-lg font-light leading-relaxed">
              Figma ipsum component variant main layer. Asset shadow community
              inspect pencil ellipse background content. Link effect invite
              layer component reesizing community ipsum editor.
            </p>
          </div>

          <div className="flex gap-2">
            <GameBadge game="League of Legends" />
            <GameBadge game="Teamfight Tactics" />
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
