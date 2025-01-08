import { AnimatePresence, motion } from 'motion/react'
import { isEventPassed } from '@events//utils/eventHelpers'
import { EventPoster } from '@events/components/EventPoster'
import type { EventGridProps } from '@events/types'
import { useScreenResolution } from '@hooks/use-screen-resolution'
import { TRANSITIONS } from '@lib/animations'
import { cn } from '@lib/utils'

export function EventGrid({ events }: EventGridProps) {
  const { isMobile } = useScreenResolution()

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 container mx-auto">
      {events.map((event, index) => {
        const eventHasPassed = isEventPassed(event.date)
        return (
          <AnimatePresence mode="wait" key={event.id}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: eventHasPassed && !isMobile ? 0.6 : 1 }}
              exit={{ y: -20, opacity: 0 }}
              whileHover={{
                opacity: 1,
                transition: { duration: 0.1, ease: TRANSITIONS.easeOutExpo },
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              className={cn('w-full h-full', {
                'cursor-border': eventHasPassed,
              })}
            >
              <div className="w-full h-full">
                <EventPoster
                  event={event}
                  size="responsive"
                  showCTA={!eventHasPassed}
                  tiltProps={{
                    tiltMaxAngleX: 8,
                    tiltMaxAngleY: 8,
                    glareMaxOpacity: !eventHasPassed ? 0.3 : 0.2,
                    transitionSpeed: 800,
                    scale: isMobile ? 1 : 1.02,
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )
      })}
    </div>
  )
}
