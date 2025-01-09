'use client'

import { ArrowRightIcon } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Button } from '@ui/button'

export function Banner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const height = useTransform(scrollYProgress, [0, 1], ['600px', '200px'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  return (
    <div className="container relative py-20">
      <motion.div
        className="sticky top-0 bg-background [mask-image:radial-gradient(650px_circle_at_center,white,transparent)]"
        style={{
          height,
        }}
      >
        <motion.div className="relative h-full overflow-hidden rounded-[20px] border border-white/20">
          <motion.div className="flex h-full flex-col items-center justify-center gap-8 mix-blend-screen">
            <div className="flex flex-col">
              <motion.h2
                style={{ scale }}
                className="text-center text-6xl font-bold tracking-tight text-white"
              >
                Nous réduisons les écarts
              </motion.h2>
              <motion.p
                style={{ scale }}
                className="text-center text-3xl font-medium tracking-tight text-white"
              >
                Joueurs. Tournois. Compétition. Simple.
              </motion.p>
            </div>
            <Button
              size="lg"
              className="bg-white font-medium tracking-wide text-black hover:bg-white/90"
            >
              Prochaine évènement
              <ArrowRightIcon size={18} />
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
    </div>
  )
}
