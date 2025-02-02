import { motion, useScroll, useTransform } from 'motion/react'
import { MotionValue } from 'motion/react'
import { useRef } from 'react'
import { GameBadge } from '@components/GameBadge'

interface BadgeWrapperProps {
  game: string
  scrollProgress: MotionValue<number>
  index: number
}

const BadgeWrapper: React.FC<BadgeWrapperProps> = ({
  game,
  scrollProgress,
  index,
}) => {
  const opacity = useTransform(
    scrollProgress,
    [0, 0.2 + (index + 1) * 0.1, 0.3 + (index + 1) * 0.1],
    [0, 0, 1],
  )

  const y = useTransform(
    scrollProgress,
    [0, 0.2 + (index + 1) * 0.1, 0.3 + (index + 1) * 0.1],
    [20, 20, 0],
  )

  return (
    <motion.div style={{ opacity, y }}>
      <GameBadge game={game} />
    </motion.div>
  )
}

export function TextSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Section animations
  const sectionY = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="container mx-auto py-24 [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)] md:py-32"
    >
      <motion.div
        style={{ y: sectionY }}
        className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
      >
        <h2 className="leading-tighter text-4xl font-black md:text-5xl">
          Nous gérons votre tournoi, vous vivez la compétition
        </h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-bold text-zinc-200">
              {"De l'expertise à l'excellence"}
            </h5>
            <p className="tracking-snug text-md font-light leading-relaxed lg:text-lg">
              {
                "Notre équipe gère l'intégralité de vos tournois, de l'organisation à la diffusion en passant par l'arbitrage et le support. Nous assurons des compétitions de niveau professionnel."
              }
            </p>
          </div>
          <div className="flex gap-2">
            <BadgeWrapper
              game="League of Legends"
              scrollProgress={scrollYProgress}
              index={0}
            />
            <BadgeWrapper
              game="Teamfight Tactics"
              scrollProgress={scrollYProgress}
              index={1}
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
