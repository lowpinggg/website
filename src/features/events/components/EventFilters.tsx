// features/events/components/EventFilters.tsx
import type { EventFiltersProps, FilterType } from '../types'
import clsx from 'clsx'

export function EventFilters({
  activeFilter,
  onFilterChange,
}: EventFiltersProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {['all', 'upcoming', 'past'].map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter as FilterType)}
            className={clsx('px-3 py-1 rounded-full text-sm transition-colors', {
              'bg-primary text-primary-foreground': activeFilter === filter,
              'bg-muted hover:bg-muted/80': activeFilter !== filter,
            })}
          >
            {filter === 'all' && `Tous`}
            {filter === 'upcoming' && 'À venir'}
            {filter === 'past' && 'Passés'}
          </button>
        ))}
      </div>
    </div>
  )
}