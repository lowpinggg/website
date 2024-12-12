// features/registration/types/forms.ts
import { Database } from '@/types/generated-types'
import { TftForm } from '@/features/registration/components/forms/TftForm'
import { SummonerForm } from '@/features/registration/components/forms/SummonerForm'

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
  riotId: string
  rank: string
}

export type SummonerFormData = {
  name: string
  email: string
  discord: string
  riotId: string
  rank: string
}

export type FormData = TftFormData | SummonerFormData

// Form configurations
export const tftFields: BaseField[] = [
  { name: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
  { name: 'riotId', label: 'Riot ID', type: 'text', placeholder: 'Pseudo#TAG' },
  {
    name: 'rank',
    label: 'Rang actuel',
    type: 'select',
    placeholder: 'Sélectionnez votre rang',
    options: ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']
  }
]

export const summonerFields: BaseField[] = [
  { name: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
  { name: 'discord', label: 'Discord', type: 'text', placeholder: 'Votre#0000' },
  { name: 'riotId', label: 'Riot ID', type: 'text', placeholder: 'Pseudo#TAG' },
  {
    name: 'rank',
    label: 'Rang actuel',
    type: 'select',
    placeholder: 'Sélectionnez votre rang',
    options: ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']
  }
]

// Form registry
export const formRegistry = {
  tft: {
    component: TftForm,  // You'll need to import these
    fields: tftFields
  },
  summoner: {
    component: SummonerForm,  // You'll need to import these
    fields: summonerFields
  }
} as const