'use client'

import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { VelocityScroll } from '@components/ui/scroll-based-velocity'
import { EventPoster } from '@events/components/EventGallery/EventPoster'
import { useUpcomingEvent } from '@events/hooks/useEvents'

export function EventShowcase() {
  const { upcomingEvent } = useUpcomingEvent()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.4 && latest < 0.6) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  const posterY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50])
  const posterRotation = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [25, -5, -15],
  )
  const posterScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.8])

  const textY = useTransform(scrollYProgress, [0.3, 0.5, 1], [-100, 0, -20])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 0.9])

  const divOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <motion.div
      style={{
        opacity: divOpacity,
      }}
      ref={sectionRef}
      className={upcomingEvent ? 'container pb-24 pt-12' : 'py-0'}
    >
      <div className="relative flex items-center justify-center">
        <motion.h1
          style={{
            y: textY,
            opacity: textOpacity,
            scale: textScale,
          }}
          className="pointer-events-none absolute z-0 flex h-full items-center justify-center text-6xl font-black uppercase tracking-tight text-foreground [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        >
          <VelocityScroll defaultVelocity={0.5}>
            Prochain événement Inscription ouverte
          </VelocityScroll>
          ;
        </motion.h1>
        <div className="relative inset-0 h-full w-full">
          <motion.div
            className="relative z-0 flex w-full items-center justify-center"
            style={{
              y: posterY,
              rotate: posterRotation,
              scale: posterScale,
            }}
          >
            {upcomingEvent && (
              <EventPoster
                cta={{
                  label: 'INSCRIPTION',
                  icon: ArrowRight,
                }}
                tiltProps={{
                  tiltMaxAngleX: 16,
                  tiltMaxAngleY: 16,
                }}
                buttonBounce={true}
                size="md"
                event={upcomingEvent}
                isHovered={isHovered}
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
