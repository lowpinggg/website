// features/home/components/Card/CardSection.tsx
import { useRef } from 'react'
import { useScreenResolution } from '@hooks/use-screen-resolution'
import { Button } from '@ui/button'
import clsx from 'clsx'
import { HeadphonesIcon, Smartphone, Zap } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import CardItem from './CardItem'

export const CardSection: React.FC = () => {
  const { isMobile } = useScreenResolution()
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const titleOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.1] : [0.2, 0.5],
    [0, 1],
  )
  const titleY = useTransform(scrollYProgress, [0, 0.5], [-50, 0])

  const buttonY = useTransform(
    scrollYProgress,
    isMobile ? [0.4, 0.7] : [0, 0.5],
    isMobile ? [40, 0] : [100, 0],
  )
  const buttonOpacity = useTransform(
    scrollYProgress,
    isMobile ? [0.4, 0.7] : [0, 0.5],
    isMobile ? [0, 1] : [0, 1],
  )

  const cards = [
    {
      Icon: Zap,
      title: 'Gestion Pro',
      description:
        "Des règles claires et une équipe d'experts qui gère votre tournoi de A à Z, du planning jusqu'à la finale.",
    },
    {
      Icon: HeadphonesIcon,
      title: 'Support Live',
      description:
        'Des admins présents pendant toute la durée du tournoi pour répondre à vos questions et résoudre les problèmes instantanément.',
    },
    {
      Icon: Smartphone,
      title: 'Expérience Simple',
      description:
        "De l'inscription aux résultats, un processus simplifié sans complications administratives pour vous concentrer sur le jeu.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className={clsx('container mx-auto w-full py-24', {
        'mask-image:radial-gradient(1400px_circle_at_center,white,transparent)':
          !isMobile,
      })}
    >
      <div className="flex flex-col items-center gap-8 md:gap-12">
        <motion.h2
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center text-3xl font-black text-white lg:text-4xl"
        >
          DES TOURNOIS SANS PRISE DE TÊTE
        </motion.h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {cards.map((card, index) => (
            <CardItem
              key={index}
              Icon={card.Icon}
              title={card.title}
              description={card.description}
              scrollProgress={scrollYProgress}
              index={index}
            />
          ))}
        </div>
        <motion.div style={{ opacity: buttonOpacity, y: buttonY }}>
          <Button
            size="lg"
            className="min-h-12 bg-white px-6 text-black mix-blend-screen hover:bg-white/80"
          >
            Lire les règlements
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default CardSection
