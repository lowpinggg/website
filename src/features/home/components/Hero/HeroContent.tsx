// features/home/components/Hero/HeroContent.tsx
import { Calendar } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Discord } from '@components/icons'
import { introVariants } from '@lib/animations'
import { Button } from '@ui/button'

export function HeroContent() {
  return (
    <>
      {/* Main content with white text */}
      <motion.div className="container z-20">
        <div className="flex h-fit max-w-4xl flex-col justify-center gap-6">
          <div className="overflow-hidden">
            <motion.div className="relative overflow-hidden">
              <h1 className="text-8xl font-black leading-[85%] tracking-[0.64px] text-white">
                TOURNOIS ESPORT SANS FRICTION
              </h1>
            </motion.div>
          </div>

          {/* Content section */}
          <div className="overflow-hidden">
            <motion.div
              variants={introVariants.content.container}
              initial="initial"
              animate="animate"
              className="flex origin-top flex-col gap-6"
            >
              <p className="max-w-2xl text-base font-light leading-6 tracking-tight text-foreground/80">
                La première plateforme dédiée à lorganisation pro de vos
                tournois. Matchmaking équitable, gestion simplifiée -
                concentrez-vous uniquement sur le jeu.
              </p>
              <motion.div
                variants={introVariants.content.button}
                initial="initial"
                animate="animate"
                className="flex gap-2"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="px-6 mix-blend-screen"
                >
                  <Link href="/events" className="flex items-center gap-2">
                    <Calendar />
                    Évenements
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-white px-6 text-background mix-blend-screen hover:bg-white/80"
                >
                  Discord
                  <Discord className="text-[#000000]" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
