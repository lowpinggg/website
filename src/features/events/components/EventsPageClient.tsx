// features/events/pages/EventsPage.tsx
'use client'

import { useState } from 'react'
import { Footer } from '@components/Footer'
import { EventFilters } from '@features/events/components/EventGallery/EventFilters'
import { EventsContent } from '@features/events/components/EventGallery/EventsContent'
import { useEvents } from '@features/events/hooks/useEvents'
import { FilterType } from '@features/events/types'

// features/events/pages/EventsPage.tsx

// features/events/pages/EventsPage.tsx

// features/events/pages/EventsPage.tsx

// features/events/pages/EventsPage.tsx

// features/events/pages/EventsPage.tsx

export function EventsPageClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const { filterEvents } = useEvents()

  return (
    <>
      <main className="container">
        <div className="flex flex-col justify-center gap-6 pt-12">
          <div className="flex w-full flex-col justify-between border-b pb-4 xs:flex-row sm:items-center">
            <h1 className="text-2xl font-bold text-foreground sm:text-4xl">
              Événements
            </h1>
            <EventFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
          <EventsContent events={filterEvents(activeFilter)} />
        </div>
        <Footer />
      </main>
    </>
  )
}
