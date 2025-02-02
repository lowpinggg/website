'use client'

import { ArrowRightIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Link from 'next/link'
import { useUpcomingEvent } from '@features/events/hooks/useEvents'
import { useScreenResolution } from '@hooks/use-screen-resolution'
import { Button } from '@ui/button'

export function Banner() {
  const { isMobile } = useScreenResolution()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const height = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? ['300px', '420px'] : ['200px', '500px'],
  )
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const { upcomingEvent } = useUpcomingEvent()

  return (
    <motion.div ref={sectionRef} className="container relative py-16 md:py-24">
      <motion.div
        className="bg-background [mask-image:radial-gradient(650px_circle_at_center,white,transparent)]"
        style={{ height, opacity }}
      >
        <motion.div className="relative h-full overflow-hidden rounded-[20px] border border-white/20">
          <motion.div className="flex h-full flex-col items-center justify-center gap-8 mix-blend-screen">
            <div className="flex flex-col">
              <motion.h2
                style={{ scale }}
                className="text-center text-5xl font-bold tracking-tight text-white sm:text-6xl"
              >
                Nous réduisons les écarts
              </motion.h2>
              <motion.p
                style={{ scale }}
                className="text-center text-2xl font-medium tracking-tight text-white md:text-3xl"
              >
                Joueurs. Tournois. Compétition. Simple.
              </motion.p>
            </div>
            <Button
              size="lg"
              className="min-h-12 bg-white pl-5 pr-4 font-medium tracking-wide text-black hover:bg-white/90"
            >
              <Link
                className="flex items-center gap-2"
                href={`/events/${upcomingEvent?.slug}/register`}
                target="_blank"
              >
                Prochain Tournoi
                <ArrowRightIcon size={20} />
              </Link>
            </Button>
          </motion.div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            src="/animated-darkstar-thresh.webm"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
