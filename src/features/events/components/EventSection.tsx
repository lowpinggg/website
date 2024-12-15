// features/events/components/EventSection.tsx
'use client'

import { useEffect, useState } from 'react'
import type { Database } from '@/types/generated-types'

import { getEvents } from '../api/getEvents'
import { EventGrid } from './EventGrid'

type Event = Database['public']['Tables']['events']['Row']

export function EventSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await getEvents()
        if (error) throw error
        setEvents(data || [])
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching events:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] "></div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        Failed to load events. Please try again later.
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-6 relative z-10 pb-24">
      <h1
        className="text-2xl sm:text-4xl font-bold text-foreground"
      >
        Événements
      </h1>
      <EventGrid events={events} />
    </section>
  )
}
