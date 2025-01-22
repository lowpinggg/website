// features/home/components/Card/CardSection.tsx
import { HeadphonesIcon, Smartphone, Zap } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Button } from '@ui/button'
import CardItem from './CardItem'

export const CardSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const titleY = useTransform(scrollYProgress, [0, 0.5], [-50, 0])

  const buttonY = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

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
      className="
    container mx-auto w-full py-24 [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
    >
      <div className="flex flex-col items-center gap-12">
        <motion.h2
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center text-4xl font-black text-white"
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
            className=" min-h-12 bg-white px-4 text-black mix-blend-screen hover:bg-white/80"
          >
            Lire les règlements
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default CardSection
