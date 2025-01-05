// components/GameBadge.tsx
import clsx from 'clsx'
import { LeagueOfLegends } from '@/components/icons/LeagueOfLegends'
import { TeamfightTactics } from '@/components/icons/TeamFightTactics'
import { Badge } from '@/components/ui/badge'

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

  return (
    <Badge
      variant="secondary"
      className={clsx('font-normal flex items-center gap-1 px-2', className)}
    >
      {gameConfig?.icon && <gameConfig.icon size={18} />}
      {game}
    </Badge>
  )
}
