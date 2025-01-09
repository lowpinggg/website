// features/events/components/layout/EventsContent.tsx
'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import Link from 'next/link'
import { useEvents } from '@events/hooks/useEvents'
import type { FilterType } from '@events/types'
import { EventsGrid } from '@features/events/components/display'
import { EventFilters } from '@features/events/components/filters'
import { baseVariants } from '@lib/animations'
import { cn } from '@lib/utils'
import { Button } from '@ui/button'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-4 w-4 border border-primary border-t-transparent" />
    </div>
  )
}

function ErrorMessage() {
  return (
    <div className="py-40 text-center text-muted-foreground text-sm">
      Failed to load events. Please try again later.
    </div>
  )
}

interface EventsContentProps {
  className?: string
  title?: string
  showFilters?: boolean
  showCTA?: boolean
  ctaText?: string
  ctaHref?: string
  limitEvents?: number
}

export function EventsContent({
  className,
  title = 'Événements',
  showFilters = false,
  showCTA = false,
  ctaText = 'Voir tous',
  ctaHref = '/events',
  limitEvents,
}: EventsContentProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const { isLoading, error, filterEvents } = useEvents()

  let events = filterEvents(activeFilter)
  if (limitEvents) {
    events = events.slice(0, limitEvents)
  }

  return (
    <section className={cn('flex flex-col gap-6 relative z-10', className)}>
      <div className="flex flex-col xs:flex-row sm:items-center gap-4 w-full justify-between">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {showFilters && !error && (
            <EventFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          )}
          {showCTA && (
            <Link href={ctaHref}>
              <Button variant="outline" size="sm">
                {ctaText}
              </Button>
            </Link>
          )}
        </div>
      </div>

      {!error ? (
        isLoading ? (
          <LoadingSpinner />
        ) : events.length > 0 ? (
          <EventsGrid events={events} />
        ) : (
          <motion.div
            variants={baseVariants.fadeIn}
            className="flex items-center justify-center w-full h-[400px] text-muted-foreground text-sm"
          >
            Aucun événement trouvé.
          </motion.div>
        )
      ) : (
        <ErrorMessage />
      )}
    </section>
  )
}
