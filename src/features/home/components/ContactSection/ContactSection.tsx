import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Discord } from '@components/icons'
import { Button } from '@components/ui/button'
import { BorderBeam } from '@ui/border-beam'

export function ContactSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.4], [50, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.1, 1])

  return (
    <main className="container mx-auto pt-6 md:pt-12">
      <motion.div
        ref={cardRef}
        style={{ opacity, y }}
        className="relative flex h-full flex-col items-center overflow-hidden rounded-[20px] border border-white/10 py-24 text-white [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
          src="/animated-aurelionsol.webm"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background to-transparent" />
        <BorderBeam colorFrom="white" colorTo="transparent" />

        <motion.div
          style={{ scale, y }}
          className="container relative flex flex-col items-center gap-3 mix-blend-screen"
        >
          <h2 className="leading-tighter text-center text-4xl font-bold tracking-tight">
            {"Propulsez l'esport vers de nouveaux sommets"}
          </h2>
          <p className="max-w-2xl text-center text-base font-light leading-snug tracking-tight text-white/90">
            {
              'Nous recherchons activement des partenaires pour développer la scène esport. Sponsoring de tournois, création de ligues ou autres projets.'
            }
          </p>
          <div className="mt-5 flex gap-2">
            <Button
              size="lg"
              className="bg-white px-5 text-background hover:bg-white/80 xs:px-8"
            >
              Discord
              <Discord className="text-[#000000]" />
            </Button>
            <Button
              size="lg"
              className="bg-[#1e1e1e] px-3 xs:px-6"
              variant="outline"
            >
              Contacter-nous
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}
