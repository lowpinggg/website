import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Discord } from '@components/icons'
import { Button } from '@components/ui/button'
import type { ButtonProps } from '@components/ui/button'
import { BorderBeam } from '@ui/border-beam'

interface ActionCardProps {
  title: string
  description: string
  button: {
    label: string
    icon?: React.ReactNode
    className?: string
    variant?: ButtonProps['variant']
  }[]
  videoSrc: string
}

function ActionCard({ title, description, button, videoSrc }: ActionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.4], [50, 0])

  const scale = useTransform(scrollYProgress, [0, 0.6], [1.1, 1])

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        y,
      }}
      className="
        relative
        flex h-full flex-col items-center overflow-hidden rounded border border-white/10 py-24 text-white [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        src={videoSrc}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background to-transparent" />

      <BorderBeam colorFrom="white" colorTo="transparent" />
      <motion.div
        style={{ scale, y }}
        className="relative mb-auto flex flex-col items-center gap-3 mix-blend-screen"
      >
        <h2 className="leading-tighter tracking-snug text-center text-4xl font-bold">
          {title}
        </h2>
        <p className="leading-0 max-w-2xl text-center text-base font-light tracking-tight text-white/90">
          {description}
        </p>
        <div className="mt-5 flex gap-2">
          {button.map((btn, index) => (
            <Button
              size="lg"
              className={btn.className}
              key={index}
              variant={btn.variant}
            >
              {btn.label}
              {btn.icon}
            </Button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CallToActions() {
  const cards: ActionCardProps[] = [
    {
      title: "Propulsez l'esport vers de nouveaux sommets",
      description:
        "Nous recherchons activement des partenaires pour développer la scène compétitive. Une opportunité de contribuer à l'avenir de l'esport",
      button: [
        {
          label: 'Discord',
          icon: <Discord className="text-[#000000]" />,
          className: 'text-background bg-white hover:bg-white/80 px-8',
        },
        {
          label: 'Contacter-nous',
          icon: null,
          className: 'px-6 bg-[#1e1e1e]',
          variant: 'outline',
        },
      ],
      videoSrc: '/animated-aurelionsol.webm',
    },
  ]

  return (
    <main className="container mx-auto pt-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
        {cards.map((card, index) => (
          <ActionCard key={index} {...card} />
        ))}
      </div>
    </main>
  )
}
