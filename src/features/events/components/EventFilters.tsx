// features/events/components/EventFilters.tsx
import type { EventFiltersProps, FilterType } from '../types'

export function EventFilters({ 
  activeFilter, 
  onFilterChange, 
}: EventFiltersProps) {
  return (
    <div className="flex gap-2">
      {['all', 'upcoming', 'past'].map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter as FilterType)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            activeFilter === filter
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          {filter === 'all' && `Tous`}
          {filter === 'upcoming' && 'À venir'}
          {filter === 'past' && 'Passés'}
        </button>
      ))}
    </div>
  )
}