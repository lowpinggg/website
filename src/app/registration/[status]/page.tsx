// app/registration/[status]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CircleCheck, CircleX } from 'lucide-react'

import { stripe } from '@/lib/stripe/stripe-server'
import { Button } from '@/components/ui/button'

type Props = {
  params: Promise<{
    status: string
  }>
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
  const { status } = await params
  const { session_id: sessionId } = await searchParams
  let receiptUrl = null

  console.log('RegistrationStatusPage - status:', status)

  if (!(status in messages)) {
    return notFound()
  }

  if (status === 'success' && sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      if (typeof session.payment_intent === 'string') {
        const charges = await stripe.charges.list({
          payment_intent: session.payment_intent
        })
        receiptUrl = charges.data[0]?.receipt_url
      }
    } catch (error) {
      console.error('Error fetching receipt URL:', error)
    }
  }

  const { title, description } = messages[status as keyof typeof messages]

  return (
    <section className="flex flex-col items-center justify-center h-full space-y-6 max-w-xl mx-auto">
      <div className="container py-10 h-screen mx-auto flex gap-4 justify-center flex-col items-start">
        <div>
          {status === 'success' ? (
            <CircleCheck size={32} className="text-success text-green-600" />
          ) : (
            <CircleX size={32} className="text-error text-red-600" />
          )}
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-base font-normal">
            {description}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/">
            <Button>Retour</Button>
          </Link>
          {status === 'success' && receiptUrl && (
            <Link href={receiptUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">Voir ma commande</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
