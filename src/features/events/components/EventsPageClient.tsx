// features/events/pages/EventsPage.tsx
'use client'

import { useEffect, useState } from 'react'
import { Footer } from '@components/Footer'
import { EventsContent } from '@features/events/components/EventGallery/EventsContent'
import { setScrollLock } from '@hooks/use-lockscroll'
import { useEvents } from '../hooks/useEvents'
import { FilterType } from '../types'
import { EventFilters } from './EventGallery/EventFilters'

// features/events/pages/EventsPage.tsx

export function EventsPageClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const { filterEvents } = useEvents()

  useEffect(() => {
    setScrollLock(true)
  }, [])

  return (
    <>
      <main>
        <div className="relative z-30">
          <section className="container">
            <div className="overflow-hidden pb-24">
              <div className="flex w-full flex-col justify-between gap-4 xs:flex-row sm:items-center">
                <h1 className="text-2xl font-bold text-foreground sm:text-4xl">
                  Événements
                </h1>
                <EventFilters
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />
              </div>
              <EventsContent
                events={filterEvents(activeFilter)}
                className="container mx-auto py-10"
              />
            </div>
            <Footer />
          </section>
        </div>
      </main>
    </>
  )
}
