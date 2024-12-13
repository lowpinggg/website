// features/registration/types/forms.ts
import { SummonerForm } from '@/features/registration/components/forms/SummonerForm'
import { TftForm } from '@/features/registration/components/forms/TftForm'

import { Database } from '@/types/generated-types'

// Base types
export type FormType = Database['public']['Enums']['event_type']

export type BaseField = {
  name: string
  label: string
  type: 'text' | 'email' | 'select'
  placeholder: string
  options?: string[]
  required?: boolean
}

// Form specific types
export type TftFormData = {
  name: string
  email: string
  discord: string
  riot_id: string
  rank: string
}

export type SummonerFormData = {
  name: string
  email: string
  discord: string
  riot_id: string
  rank: string
}

export type FormData = TftFormData | SummonerFormData

// Form fields with explicit typing
export const tftFields: readonly BaseField[] = [
  { name: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'votre@email.com'
  },
  {
    name: 'discord',
    label: 'Discord',
    type: 'text',
    placeholder: 'Votre#0000'
  },
  {
    name: 'riot_id',
    label: 'Riot ID',
    type: 'text',
    placeholder: 'Pseudo#TAG'
  },
  {
    name: 'rank',
    label: 'Rang actuel',
    type: 'select',
    placeholder: 'Sélectionnez votre rang',
    options: [
      'IRON',
      'BRONZE',
      'SILVER',
      'GOLD',
      'PLATINUM',
      'DIAMOND'
    ] as const
  }
] as const

export const summonerFields: readonly BaseField[] = [
  { name: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'votre@email.com'
  },
  {
    name: 'discord',
    label: 'Discord',
    type: 'text',
    placeholder: 'Votre#0000'
  },
  {
    name: 'riot_id',
    label: 'Riot ID',
    type: 'text',
    placeholder: 'Pseudo#TAG'
  },
  {
    name: 'rank',
    label: 'Rang actuel',
    type: 'select',
    placeholder: 'Sélectionnez votre rang',
    options: [
      'IRON',
      'BRONZE',
      'SILVER',
      'GOLD',
      'PLATINUM',
      'DIAMOND'
    ] as const
  }
] as const

// Registry with proper typing
export const formRegistry = {
  tft: {
    component: TftForm,
    fields: tftFields
  },
  summoner: {
    component: SummonerForm,
    fields: summonerFields
  }
} as const

// Type helpers for components that need them
export type FormFields = typeof tftFields | typeof summonerFields
