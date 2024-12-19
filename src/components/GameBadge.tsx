// components/GameBadge.tsx
import { Badge } from '@/components/ui/badge'
import { TeamfightTactics } from '@/components/icons/TeamFightTactics'
import { LeagueOfLegends } from '@/components/icons/LeagueOfLegends'
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
  game: string
  className?: string
}

export function GameBadge({ game, className }: GameBadgeProps) {
  const gameConfig = GAME_CONFIG[game as Game]

  if (!gameConfig) {
    return null
  }

  const { icon: Icon } = gameConfig

  return (
    <Badge 
      variant="secondary" 
      className={clsx('font-normal flex items-center gap-1 px-2', className)}
    >
      <Icon size={18} />
      {game}
    </Badge>
  )
}