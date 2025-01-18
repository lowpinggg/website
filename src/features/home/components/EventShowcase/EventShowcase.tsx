'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { EventPoster } from '@events/components/EventGallery/EventPoster'
import { useEvents } from '@events/hooks/useEvents'

export function EventShowcase() {
  const { events } = useEvents(4)
  const upcomingEvent = events[0]
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

  const posterY = useTransform(scrollYProgress, [0, 0.4, 1], [500, 0, -50])
  const posterRotation = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [45, 10, -10],
  )
  const posterScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.1])
  const textY = useTransform(scrollYProgress, [0.3, 0.8, 1], [-100, 0, -20])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 0.9])

  return (
    <motion.div ref={sectionRef} className="container py-24">
      <div className="relative flex items-center justify-center">
        <motion.h1
          style={{
            y: textY,
            opacity: textOpacity,
            scale: textScale,
          }}
          className="pointer-events-none absolute z-10 text-6xl font-bold text-foreground"
        >
          Prochain événement
        </motion.h1>
        <motion.div
          className="relative z-0 flex w-full items-center justify-center"
          style={{ y: posterY, rotate: posterRotation, scale: posterScale }}
        >
          {upcomingEvent && (
            <EventPoster
              size="md"
              event={upcomingEvent}
              isHovered={isHovered}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
