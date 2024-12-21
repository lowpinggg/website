// features/events/hooks/useEvents.ts
import { useQuery } from '@tanstack/react-query'
import { getEvents } from '../api/getEvents'
import type { Event, FilterType } from '../types'
import { isEventPassed } from '../utils/eventHelpers'

export function useEvents() {
  const { 
    data: events, 
    isLoading, 
    error 
  } = useQuery<Event[], Error>({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await getEvents()
      if (error) throw error
      return data || []
    },
    initialData: [],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  const filterEvents = (filter: FilterType) => {
    if (!Array.isArray(events)) return []
    
    return events.filter(event => {
      if (!event || !event.date) return false
      
      switch (filter) {
        case 'all':
          return true
        case 'past':
          return isEventPassed(event.date)
        case 'upcoming':
          return !isEventPassed(event.date)
        default:
          return false
      }
    })
  }

  return {
    events: Array.isArray(events) ? events : [],
    isLoading,
    error,
    filterEvents,
  }
}