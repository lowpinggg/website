'use client'

import { ArrowRightIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Footer } from '@components/Footer'
import { NavBar } from '@components/NavBar'
import ShinyText from '@components/ShinyText/ShinyText'
import { BorderBeam } from '@components/ui/border-beam'
import { Button } from '@components/ui/button'
import { EventsSection } from '@events/components/EventsSection'
import { CardSection, Hero, TextSection } from '@home/components'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.5', 'end start'],
  })

  const height = useTransform(scrollYProgress, [0, 1], ['100vh', '30vh'])

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <>
      <NavBar />
      <Hero />
      <TextSection />

      <div className="relative container pt-20">
        <ShinyText
          text="Just some shiny text!"
          className="text-white text-5xl"
          disabled={false}
          speed={4}
        />

        <motion.div
          className="bg-background sticky top-0 [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
          style={{
            height,
          }}
        >
          <BorderBeam colorFrom={'white'} colorTo={'white'} />
          <motion.div
            className="h-full relative z-20 rounded-[20px] overflow-hidden border border-white/10"
            style={{
              backgroundImage: "url('/textsection.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <motion.div className="flex flex-col justify-center items-center h-full relative z-20 gap-8 mix-blend-screen">
              <div className="flex flex-col gap-1">
                <motion.h2
                  style={{ scale }}
                  className="text-6xl font-bold text-center tracking-tight"
                >
                  Nous comblons les écarts
                </motion.h2>
                <motion.p
                  style={{ scale }}
                  className="text-3xl font-medium text-center tracking-tight"
                >
                  Joueurs. Tournois. Compétition. Simple.
                </motion.p>
              </div>
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-black"
              >
                Prochain tournoi
                <ArrowRightIcon size={18} />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <CardSection />
      <EventsSection className="pt-10 pb-20" />
      <Footer />
    </>
  )
}
