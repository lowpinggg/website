'use client'

// features/events/components/EventSection.tsx
import { motion } from 'motion/react'
import { useState } from 'react'
import { baseVariants } from '@lib/animations'
import { useEvents } from '../hooks/useEvents'
import type { FilterType } from '../types'
import { EventFilters } from './EventFilters'
import { EventGrid } from './EventGrid'

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

export function EventSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const { isLoading, error, filterEvents } = useEvents()
  const filteredEvents = filterEvents(activeFilter)

  return (
    <section className="flex flex-col gap-8 relative z-10">
      <div className="flex flex-col xs:flex-row sm:items-center gap-4 w-full justify-between border-b pb-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
          Événements
        </h1>
        {!error && (
          <EventFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        )}
      </div>
      {!error ? (
        isLoading ? (
          <LoadingSpinner />
        ) : filteredEvents.length > 0 ? (
          <EventGrid events={filteredEvents} />
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
