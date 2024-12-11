// components/register/forms/index.ts
import { Database } from '@/types/generated-types'
import { TftForm, TftFormData, tftFields } from './TftForm'
import { SummonerForm, SummonerFormData, summonerFields } from './SummonerForm'

export type FormType = Database['public']['Enums']['event_type']

export type FormField = {
  name: string
  label: string
  type: 'text' | 'email' | 'select'
  placeholder: string
  options?: string[]
}

export type FormData = TftFormData | SummonerFormData

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