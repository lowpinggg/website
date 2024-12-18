import type { Event } from '../types'
import { EventPoster } from './EventPoster'
import { isEventPassed } from '../utils/eventHelpers'
import { AnimatePresence, motion } from 'motion/react'
import { TRANSITIONS } from '@/lib/animations'

interface EventGridProps {
  events: Event[]
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
      {events.map((event, index) => {
        const eventHasPassed = isEventPassed(event.date)
        return (
          <AnimatePresence mode="wait" key={event.id}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: TRANSITIONS.easeOutExpo,
                delay: index * 0.1 // This creates the stagger effect
              }}
              className={`w-full mx-auto ${
                eventHasPassed ? 'hover:grayscale-0' : ''
              }`}
            >
              <EventPoster
                event={event}
                size="responsive"
                showCTA={!eventHasPassed}
                tiltProps={{
                  tiltMaxAngleX: 8,
                  tiltMaxAngleY: 8,
                  glareMaxOpacity: !eventHasPassed ? 0.2 : 0.1,
                  transitionSpeed: 800
                }}
              />
            </motion.div>
          </AnimatePresence>
        )
      })}
    </div>
  )
}