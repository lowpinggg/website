// features/events/components/layout/EventsContent.tsx
'use client'

import { motion } from 'motion/react'
import { useEvents } from '@events/hooks/useEvents'
import { EventsGrid } from '@features/events/components/EventGallery/EventsGrid'
import { baseVariants } from '@lib/animations'
import { cn } from '@lib/utils'
import type { Event } from '@events/types'

function LoadingSpinner() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border border-primary border-t-transparent" />
    </div>
  )
}

function ErrorMessage() {
  return (
    <div className="py-40 text-center text-sm text-muted-foreground">
      Failed to load events. Please try again later.
    </div>
  )
}

interface EventsContentProps {
  className?: string
  limitEvents?: number
  events?: Event[]
}

export function EventsContent({ className, events }: EventsContentProps) {
  const { isLoading, error } = useEvents()

  if (error) return <ErrorMessage />
  if (isLoading) return <LoadingSpinner />
  if (!events) {
    return (
      <motion.div
        variants={baseVariants.fadeIn}
        className="flex h-[400px] w-full items-center justify-center text-sm text-muted-foreground"
      >
        Aucun événement trouvé.
      </motion.div>
    )
  }

  return (
    <section className={cn('relative z-10 flex flex-col gap-6', className)}>
      {events.length > 0 ? (
        <EventsGrid events={events} />
      ) : (
        <motion.div
          variants={baseVariants.fadeIn}
          className="flex h-[400px] w-full items-center justify-center text-sm text-muted-foreground"
        >
          Aucun événement trouvé.
        </motion.div>
      )}
    </section>
  )
}
