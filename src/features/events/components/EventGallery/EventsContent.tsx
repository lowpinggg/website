// features/events/components/layout/EventsContent.tsx
'use client'

import { useEvents } from '@events/hooks/useEvents'
import type { Event } from '@events/types'
import { EventsGrid } from '@features/events/components/EventGallery/EventsGrid'
import { baseVariants } from '@lib/animations'
import { cn } from '@lib/utils'
import { AnimatePresence, motion } from 'motion/react'

function LoadingSpinner() {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-sm border border-white border-opacity-10">
      <div className="h-4 w-4 animate-spin rounded-full border border-white/50 border-t-transparent" />
    </div>
  )
}

function ErrorMessage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={baseVariants.fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        className="rounded-sm border border-white border-opacity-10 py-40 text-center text-sm text-muted-foreground"
      >
        Échec du chargement des événements. Veuillez réessayer plus tard.
      </motion.div>
    </AnimatePresence>
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
  if (!events || events.length === 0) {
    return (
      <motion.div
        variants={baseVariants.fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex h-[400px] w-full items-center justify-center rounded-sm border border-white border-opacity-10 text-sm text-muted-foreground"
      >
        Aucun événement trouvé.
      </motion.div>
    )
  }

  return (
    <section className={cn('relative z-10 flex flex-col gap-6', className)}>
      <EventsGrid events={events} />
    </section>
  )
}
