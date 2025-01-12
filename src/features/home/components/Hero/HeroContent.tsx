// features/home/components/Hero/HeroContent.tsx
import { Calendar } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Discord } from '@components/icons'
import { Button } from '@ui/button'

export function HeroContent() {
  return (
    <motion.div className="container relative z-50">
      <div className="flex h-fit max-w-4xl flex-col justify-center gap-6">
        <div className="flex flex-col gap-5 overflow-hidden">
          <div className="overflow-hidden ">
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.77, 0, 0.175, 1],
              }}
              className="relative overflow-hidden"
            >
              {/* White text underneath */}
              <motion.h1 className="relative text-8xl font-black leading-[85%] tracking-[0.64px] text-white">
                TOURNOIS ESPORT SANS FRICTION
              </motion.h1>

              {/* Black text overlay */}
              <motion.div
                className="absolute inset-0 origin-top overflow-hidden"
                initial={{ height: '100%' }}
                animate={{ height: '0%' }}
                transition={{
                  delay: 1.8,
                  duration: 0.8,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <h1 className="text-8xl font-black leading-[85%] tracking-[0.64px] text-black">
                  TOURNOIS ESPORT SANS FRICTION
                </h1>
              </motion.div>
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <p className="max-w-2xl text-base font-light leading-6 tracking-tight text-foreground/80">
                La première plateforme dédiée à lorganisation pro de vos
                tournois. Matchmaking équitable, gestion simplifiée -
                concentrez-vous uniquement sur le jeu.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2,
              duration: 0.8,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            <div className="flex gap-2">
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
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
