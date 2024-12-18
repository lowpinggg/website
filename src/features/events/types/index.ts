// features/events/types/index.ts
import type { Database } from '@/types/generated-types'

export type Event = Database['public']['Tables']['events']['Row']
export type FilterType = 'all' | 'past' | 'upcoming'

export interface EventFiltersProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}