// components/GameBadge.tsx
import { LeagueOfLegends, TeamfightTactics } from '@components/icons'
import { Badge } from '@ui/badge'
import clsx from 'clsx'

export const GAME_CONFIG = {
  'League of Legends': {
    icon: LeagueOfLegends,
  },
  'Teamfight Tactics': {
    icon: TeamfightTactics,
  },
} as const

export type Game = keyof typeof GAME_CONFIG

type GameBadgeProps = {
  game: string | null
  className?: string
}

export function GameBadge({ game, className }: GameBadgeProps) {
  if (!game) return null

  const gameConfig = GAME_CONFIG[game as Game]
  const IconComponent = gameConfig?.icon

  return (
    <Badge
      variant="secondary"
      className={clsx(
        'flex items-center gap-1 whitespace-nowrap px-2 font-normal',
        className,
      )}
    >
      {IconComponent && <IconComponent size={18} />}
      {game}
    </Badge>
  )
}
