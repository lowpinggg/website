// features/events/components/EventFilters.tsx
import clsx from 'clsx'
import { Button } from '@components/ui/button'
import type { EventFiltersProps, FilterType } from '@events/types'

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
          <Button
            key={value}
            onClick={() => handleFilterChange(value)}
            size="sm"
            className={clsx(
              'h-full rounded-full px-3 py-1 text-sm transition-colors',
              {
                'pointer-events-none bg-white text-black text-primary-foreground':
                  activeFilter === value,
                'bg-muted text-white hover:bg-muted/80': activeFilter !== value,
              },
            )}
            type="button"
            aria-pressed={activeFilter === value}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
