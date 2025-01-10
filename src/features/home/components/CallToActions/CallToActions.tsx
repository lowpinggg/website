import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Discord } from '@components/icons'
import { Button } from '@components/ui/button'
import { BorderBeam } from '@ui/border-beam'

interface ActionCardProps {
  title: string
  description: string
  button: {
    label: string
    icon?: React.ReactNode
    className?: string
  }
  backgroundImage: string
}

function ActionCard({
  title,
  description,
  button,
  backgroundImage,
}: ActionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        y,
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="
        [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]
        bg-center
        flex flex-col h-full items-center relative overflow-hidden py-16 text-white bg-cover bg-no-repeat rounded-lg border border-white/10"
    >
      <BorderBeam colorFrom="white" colorTo="transparent" />
      <div className="flex flex-col gap-2 mb-auto items-center mix-blend-screen">
        <h2 className="text-4xl font-bold leading-tighter tracking-normal text-center">
          {title}
        </h2>
        <p className="text-base font-light text-white/90 leading-0 tracking-tight max-w-xl text-center">
          {description}
        </p>
      </div>
      <div className="mt-6 mix-blend-screen">
        <Button size="lg" className={button.className}>
          {button.label}
          {button.icon}
        </Button>
      </div>
    </motion.div>
  )
}

export function CallToActions() {
  const cards: ActionCardProps[] = [
    {
      title: 'Ne manquez aucun de nos tournois à venir',
      description:
        'Rejoignez notre communauté Discord et soyez les premiers informés de nos événements à venir. Ne manquez aucune annonce importante!',
      button: {
        label: 'Discord',
        icon: <Discord className="text-[#000]" />,
        className: 'text-background bg-white hover:bg-white/80 px-6',
      },
      backgroundImage: '/textsection.png',
    },
  ]

  return (
    <main className="container mx-auto pb-10">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {cards.map((card, index) => (
          <ActionCard key={index} {...card} />
        ))}
      </div>
    </main>
  )
}
