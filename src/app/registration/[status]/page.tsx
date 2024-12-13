import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EventPoster } from '@/features/events/components/EventPoster'
import { getRegistrationDetails } from '@/features/registration/api/getRegistrationDetails'
import { CalendarButton } from '@/features/registration/components/checkout/CalendarButton'
import { RegistrationStatusClient } from '@/features/registration/components/RegistrationStatusClient'
import { Full } from '@lowping/brand-kit'
import { Check, X } from 'lucide-react'

import { Database } from '@/types/generated-types'
import { Button } from '@/components/ui/button'

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
      'Merci pour votre inscription. Vous recevrez un email de confirmation sous peu.'
  },
  cancelled: {
    title: 'Paiement annulé',
    description: "Votre paiement a été annulé. Aucun montant n'a été prélevé."
  }
} as const

export default async function RegistrationStatusPage({
  params,
  searchParams
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
    <main>
      <RegistrationStatusClient
        status={status}
        details={details}
        title={title}
        description={description}
      />
    </main>
  )
}

function SuccessSection({ details, title }: { details: any; title: string }) {
  return (
    <div className="flex flex-col md:grid grid-cols-1 gap-6 md:gap-12 sm:grid-cols-2 justify-center items-center flex-1">
      <EventPoster event={details.event} showCTA={false} size="lg" />
      <div className="flex flex-col items-center md:items-start gap-24">
        <div>
          <Check size={40} className="text-green-500" />
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-2xl font-bold">{title}</h1>
            {details.registration && (
              <p className="text-muted-foreground text-sm font-normal">
                Un email de confirmation a été envoyé à{' '}
                {details.registration.email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex gap-2 mt-6">
              <Link href="/">
                <Button>Retour</Button>
              </Link>
              <Link href={details.receipt_url!} target="_blank">
                <Button variant="outline">Voir la commande</Button>
              </Link>
            </div>
          </div>
        </div>
        <CalendarButton event={details.event} />
      </div>
    </div>
  )
}

function CancelledSection({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <div className="flex-1 justify-center items-center flex flex-col">
        <X size={50} className="text-red-500 mx-auto mb-2" />
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
        <Button variant="outline" className="mt-6">
          Retour
        </Button>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className="flex w-full justify-between border-t py-6">
      <Full width={100} />
      <div className="text-center text-xs text-muted-foreground/50">
        <p>Contactez-nous à support@example.com</p>
      </div>
    </div>
  )
}
