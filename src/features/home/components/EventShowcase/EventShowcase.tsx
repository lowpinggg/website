'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { EventsContent } from '@events/components/EventGallery/EventsContent'
import { useEvents } from '@events/hooks/useEvents'

export function EventShowcase() {
  const { events } = useEvents(4)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity, y }}
      className="container relative mx-auto flex flex-col gap-6 py-12"
    >
      <div className="flex w-full flex-col justify-between gap-4 xs:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-foreground sm:text-4xl">
          Événements
        </h1>
        <Link href={'/events'}>
          <Button variant="outline" size="sm">
            Voir tous
          </Button>
        </Link>
      </div>
      <EventsContent events={events} />
    </motion.div>
  )
}
