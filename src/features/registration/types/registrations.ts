import type { Database } from '@generated/index'

type Event = Database['public']['Tables']['events']['Row']
type Registration = Database['public']['Tables']['event_registrations']['Row']
export type RegistrationDetails = {
  event: Event
  registration: Registration
  receipt_url?: string
} | null

export interface PaymentStatusProps {
  status: 'success' | 'cancelled'
  details: RegistrationDetails
  title: string
  description: string
}
