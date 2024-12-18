// features/registration/schemas/index.ts
import * as z from 'zod'

export const baseSchema = {
  name: z.string().min(2, 'Nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide')
}

export const tftSchema = z.object({
  ...baseSchema,
  discord: z.string().min(2, 'Discord doit contenir au moins 2 caractères'),
  riot_id: z.string().min(2, 'Riot ID doit contenir au moins 2 caractères'),
  rank: z.enum(['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'])
})

export const schemas = {
  tft: tftSchema
} as const
