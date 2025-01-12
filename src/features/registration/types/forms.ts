// features/registration/types/forms.ts
import { Database } from '@generated/index'
import { schemas } from '@registration/schemas'
import { TftForm } from '../components/Forms/TftForm'

// ============================================================================
// Base Types
// ============================================================================

export type FormType = Database['public']['Enums']['event_type']

export type BaseField = {
  name: string
  label: string
  type: 'text' | 'email' | 'select'
  placeholder: string
  options?: readonly string[]
  required?: boolean
}

// ============================================================================
// Form Data Interfaces
// ============================================================================

export interface BaseFormData {
  name: string
  email: string
}

export interface TftFormData extends BaseFormData {
  discord: string
  riot_id: string
  rank: string
}

export type FormData = TftFormData

// ============================================================================
// Field Configurations
// ============================================================================

export const baseFields: readonly BaseField[] = [
  {
    name: 'name',
    label: 'Nom',
    type: 'text',
    placeholder: 'Votre nom',
  },
  {
    name: 'prenom',
    label: 'Prénom',
    type: 'text',
    placeholder: 'Votre prénom',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'votre@email.com',
  },
] as const

export const tftSpecificFields: readonly BaseField[] = [
  {
    name: 'discord',
    label: 'Discord',
    type: 'text',
    placeholder: 'Votre#0000',
  },
  {
    name: 'riot_id',
    label: 'Riot ID',
    type: 'text',
    placeholder: 'Pseudo#TAG',
  },
  {
    name: 'rank',
    label: 'Rang actuel',
    type: 'select',
    placeholder: 'Sélectionnez votre rang',
    options: [
      'Iron',
      'Bronze',
      'Silver',
      'Gold',
      'Platinum',
      'Diamond',
      'Master',
    ],
  },
] as const

// ============================================================================
// Form Registry
// ============================================================================

/**
 * Central registry for all form configurations.
 * Each entry contains:
 * - component: The React component for the form
 * - baseFields: Common fields shared across all forms
 * - specificFields: Fields specific to this form type
 * - schema: Zod validation schema
 */
export const formRegistry = {
  tft: {
    component: TftForm,
    baseFields: baseFields,
    specificFields: tftSpecificFields,
    schema: schemas.tft,
  },
} as const
