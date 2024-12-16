'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { EventPoster } from '@/features/events/components/EventPoster'
import { CalendarButton } from '@/features/registration/components/checkout/CalendarButton'
import { Full } from '@lowping/brand-kit'
import confetti from 'canvas-confetti'
import { Check, X } from 'lucide-react'

import { Database } from '@/types/generated-types'
import { Button } from '@/components/ui/button'

type Event = Database['public']['Tables']['events']['Row']
type Registration = Database['public']['Tables']['event_registrations']['Row']

type RegistrationDetails = {
  event: Event
  registration: Registration
  receipt_url?: string
} | null

type Props = {
  status: 'success' | 'cancelled'
  details: RegistrationDetails
  title: string
  description: string
}

export function PaymentStatusPage({
  status,
  details,
  title,
  description
}: Props) {
  useEffect(() => {
    if (status === 'success') {
      const duration = 100
      const end = Date.now() + duration

      const interval = setInterval(() => {
        confetti({
          particleCount: 50,
          startVelocity: 32,
          spread: 180
        })

        if (Date.now() > end) clearInterval(interval)
      }, 200)

      return () => clearInterval(interval)
    }
  }, [status])

  return (
    <main className="container px-4 mx-auto h-screen flex flex-col sm:justify-evenly items-center">
      {status === 'success' && details ? (
        <SuccessSection details={details} title={title} />
      ) : (
        <CancelledSection title={title} description={description} />
      )}
      <Footer />
    </main>
  )
}

function SuccessSection({
  details,
  title
}: {
  details: RegistrationDetails
  title: string
}) {
  if (!details?.event) {
    return null
  }

  return (
    <div className="flex flex-col md:grid grid-cols-1 gap-6 md:gap-12 sm:grid-cols-2 justify-center items-center flex-1">
      <div>
        <EventPoster event={details.event} showCTA={false} size="lg" />
      </div>

      <div className="flex flex-col items-center md:items-start gap-24">
        <div className="flex flex-col gap-6">
          <div>
            <Check size={40} className="text-green-500" />
          </div>

          <div className="flex flex-col gap-2 text-center md:text-left">
            <h1 className="text-2xl font-bold">{title}</h1>
            {details.registration && (
              <p className="text-muted-foreground text-sm font-normal">
                Un email de confirmation a été envoyé à{' '}
                {details.registration.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex gap-2">
              <Link href="/">
                <Button>Retour</Button>
              </Link>
              {details.receipt_url && (
                <Link href={details.receipt_url} target="_blank">
                  <Button variant="outline">Voir la commande</Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div>
          <CalendarButton event={details.event} />
        </div>
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
      <div className="flex-1 justify-center items-center flex flex-col gap-4">
        <div>
          <X size={50} className="text-red-500" />
        </div>

        <h1 className="text-2xl font-bold">{title}</h1>

        <p className="text-muted-foreground text-sm">{description}</p>

        <div>
          <Button variant="outline">Retour</Button>
        </div>
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