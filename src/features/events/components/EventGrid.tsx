// features/events/components/EventGrid.tsx
'use client'
import { motion } from 'motion/react'
import { animations } from '@/lib/animation'
import { EventPoster } from './EventPoster'
import type { Database } from '@/types/generated-types'

type Event = Database['public']['Tables']['events']['Row']

interface EventGridProps {
  events: Event[]
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          variants={animations.fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4 * index}
          className="w-full mx-auto"
        >
          <EventPoster
            event={event}
            size='responsive'
            tiltProps={{
              tiltMaxAngleX: 8,
              tiltMaxAngleY: 8,
              glareMaxOpacity: .2,
              transitionSpeed: 400,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}