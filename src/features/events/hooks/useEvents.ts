// features/events/hooks/useEvents.ts
import { useQuery } from '@tanstack/react-query'
import { getEvents, getUpcomingEvents } from '../api/getEvents'
import type { FilterType } from '../types'
import { isEventPassed } from '../utils/eventHelpers'

export function useEvents(limit?: number) {
  const {
    data: rawEvents = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await getEvents()
      if (error) throw error
      return data || []
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  const events = limit ? rawEvents.slice(0, limit) : rawEvents

  const filterEvents = (filter: FilterType) => {
    return events.filter((event) => {
      if (filter === 'all') return true
      if (filter === 'past') return isEventPassed(event.date)
      return !isEventPassed(event.date)
    })
  }

  return {
    events,
    isLoading,
    error,
    filterEvents,
  }
}

export function useUpcomingEvent() {
  const {
    data: upcomingEvent,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['upcomingEvent'],
    queryFn: async () => {
      const { data, error } = await getUpcomingEvents()
      if (error) throw error
      return data || null // Return null if no upcoming event
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  return {
    upcomingEvent,
    isLoading,
    error,
    isEmpty: !upcomingEvent,
  }
}
