import { notFound } from 'next/navigation'

import { getRegistrationDetails } from '@/features/registration/api/getRegistrationDetails'
import { PaymentStatusPage } from '@/features/registration/components/PaymentStatusPage'
import { Database } from '@/types/generated-types'

type Event = Database['public']['Tables']['events']['Row']
type Registration = Database['public']['Tables']['event_registrations']['Row']

type RegistrationDetails = {
  event: Event
  registration: Registration
  receipt_url?: string
}

type Props = {
  params: Promise<{ status: string }>
  searchParams: Promise<{ session_id?: string }>
}

const messages = {
  success: {
    title: 'Paiement réussi !',
    description:
      'Merci pour votre inscription. Vous recevrez un email de confirmation sous peu.',
  },
  cancelled: {
    title: 'Paiement annulé',
    description: "Votre paiement a été annulé. Aucun montant n'a été prélevé.",
  },
} as const

export default async function RegistrationStatusPage({
  params,
  searchParams,
}: Props) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const { status } = resolvedParams as { status: keyof typeof messages }
  const { session_id: sessionId } = resolvedSearchParams

  if (!(status in messages)) return notFound()

  if (status === 'success' && !sessionId) {
    return notFound()
  }

  let details: RegistrationDetails | null = null
  if (status === 'success' && sessionId) {
    try {
      details = (await getRegistrationDetails(sessionId)) as RegistrationDetails
      if (!details) {
        console.error('Details not found for session ID:', sessionId)
        return notFound()
      }
    } catch (error) {
      console.error('Error fetching registration details:', error)
      return notFound()
    }
  }

  const { title, description } = messages[status]

  return (
    <main className="container">
      <PaymentStatusPage
        status={status}
        details={details}
        title={title}
        description={description}
      />
    </main>
  )
}
