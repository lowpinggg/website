// features/events/types/index.ts
import type { Database } from '@generated/index'

export type Event = Database['public']['Tables']['events']['Row']
export type FilterType = 'all' | 'past' | 'upcoming'

export interface EventFiltersProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}
export interface EventsGridProps {
  events: Event[]
}

export type PosterSize = 'sm' | 'md' | 'lg' | 'xl' | 'responsive' | 'full'

export interface TiltConfig {
  perspective?: number
  scale?: number
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  glareEnable?: boolean
  glareMaxOpacity?: number
  glareColor?: string
  glareBorderRadius?: string
  transitionSpeed?: number
  tiltEnable?: boolean
  glarePosition?: 'top' | 'right' | 'bottom' | 'left' | 'all'
}

export interface EventPosterProps {
  event: Event
  size?: PosterSize
  className?: string
  tiltProps?: Partial<TiltConfig>
  showCTA?: boolean
  isHovered?: boolean
  buttonText?: string
  cta?: {
    label: string
    icon?: React.ComponentType<{ className?: string }>
  }
  buttonBounce?: boolean
}
