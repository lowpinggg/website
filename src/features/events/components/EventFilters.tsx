// features/events/components/EventFilters.tsx
import clsx from 'clsx'
import type { EventFiltersProps, FilterType } from '../types'

const FILTER_OPTIONS = [
  { value: 'all' as const, label: 'Tous' },
  { value: 'upcoming' as const, label: 'À venir' },
  { value: 'past' as const, label: 'Passés' },
] as const

export function EventFilters({
  activeFilter = 'all',
  onFilterChange,
}: EventFiltersProps) {
  const handleFilterChange = (filter: FilterType) => {
    if (onFilterChange) {
      onFilterChange(filter)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleFilterChange(value)}
            className={clsx(
              'px-3 py-1 rounded-full text-sm transition-colors',
              {
                'bg-primary text-primary-foreground': activeFilter === value,
                'bg-muted hover:bg-muted/80': activeFilter !== value,
              },
            )}
            type="button"
            aria-pressed={activeFilter === value}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
