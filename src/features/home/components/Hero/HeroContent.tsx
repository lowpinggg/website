// features/home/components/Hero/HeroContent.tsx
import { Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Discord } from '@components/icons'
//import { useScramble } from 'use-scramble'
import { introVariants } from '@lib/animations'
import { timeline } from '@lib/animations'
import { Full } from '@lowping/brand-kit'
import { Button } from '@ui/button'

export function HeroContent() {
  const [showLogo, setShowLogo] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false)
    }, timeline.intro.logo.hideDelay * 1000) // Convert to milliseconds

    return () => clearTimeout(timer)
  }, [])
  // const { ref } = useScramble({
  //   text: `TOURNOIS ESPORT SANS FRICTION`,
  //   speed: 0.3,          // Slightly faster for smoother animation
  //   tick: 1,
  //   step: 1,             // Reduced to 1 for more granular animation
  //   scramble: 8,         // Reduced from 12 for less chaotic effect
  //   seed: 1,             // Reduced seed for more controlled randomization
  //   chance: 0.5,         // Reduced chance for clearer text visibility
  //   ignore: [' '],       // Keep ignoring spaces
  //   overdrive: false,     // Keep the underscore effect
  //   range: [65, 90]      // Limit to uppercase letters only (A-Z)
  // })
  return (
    <motion.div className="container relative z-50">
      <div className="flex h-fit max-w-4xl flex-col justify-center gap-6">
        <div className="overflow-hidden">
          <div className="overflow-hidden">
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  variants={introVariants.logo}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="origin-top mix-blend-darken"
                >
                  <Full width={210} color="black" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="overflow-hidden">
            <motion.div
              variants={introVariants.title.container}
              initial="initial"
              animate="animate"
              className="relative overflow-hidden"
            >
              {/* Base white text with original animations */}
              <motion.h1 className="relative text-8xl font-black leading-[85%] tracking-[0.64px] text-white">
                TOURNOIS ESPORT SANS FRICTION
              </motion.h1>

              {/* Black text clone with same animations plus clip */}
              <motion.h1
                variants={introVariants.title.text}
                initial="initial"
                animate="animate"
                className="absolute inset-0 text-8xl font-black leading-[85%] tracking-[0.64px] text-black"
              >
                TOURNOIS ESPORT SANS FRICTION
              </motion.h1>
            </motion.div>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            variants={introVariants.content.container}
            initial="initial"
            animate="animate"
            className="flex origin-top flex-col gap-6"
          >
            <p className="max-w-2xl text-base font-light leading-6 tracking-tight text-foreground/80">
              La première plateforme dédiée à lorganisation pro de vos tournois.
              Matchmaking équitable, gestion simplifiée - concentrez-vous
              uniquement sur le jeu.
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
  )
}
