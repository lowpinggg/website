// features/events/components/EventGrid.tsx
'use client'

import type { Database } from '@/types/generated-types'

import { EventPoster } from './EventPoster'

type Event = Database['public']['Tables']['events']['Row']

interface EventGridProps {
  events: Event[]
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
      {events.map((event) => (
        <div key={event.id} className="w-full mx-auto">
          <EventPoster
            event={event}
            size="responsive"
            showCTA={!!events.find((e) => e.id === event.id)}
            tiltProps={{
              tiltMaxAngleX: 8,
              tiltMaxAngleY: 8,
              glareMaxOpacity: !!events.find((e) => e.id === event.id)
                ? 0.3
                : 0.1,
              transitionSpeed: 800
            }}
          />
        </div>
      ))}
    </div>
  )
}
