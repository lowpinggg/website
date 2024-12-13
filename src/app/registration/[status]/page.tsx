// app/registration/[status]/page.tsx
import { notFound } from 'next/navigation'
import { CircleCheck, CircleX } from 'lucide-react'
import { getRegistrationDetails } from '@/features/registration/api/getRegistrationDetails'
import { OrderCard } from '@/features/registration/components/checkout/OrderCard'
import { ActionButtons } from '@/features/registration/components/checkout/ActionButtons'

type Props = {
  params: Promise<{ status: string }>
  searchParams: Promise<{ session_id?: string }>
}

const messages = {
  success: {
    title: 'Paiement réussi !',
    description: 'Merci pour votre inscription. Vous recevrez un email de confirmation sous peu.'
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
  
  if (!(status in messages)) return notFound()

  let details = null
  if (status === 'success' && sessionId) {
    try {
      details = await getRegistrationDetails(sessionId)
      console.log('Details:', details)
    } catch (error) {
      console.error('Error fetching details:', error)
    }
  }

  const { title, description } = messages[status as keyof typeof messages]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container max-w-2xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Status Header */}
          <div className="text-center">
            {status === 'success' ? (
              <>
                <CircleCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                {details?.registration && (
                  <p className="text-muted-foreground">
                    Un email de confirmation a été envoyé à {details.registration.email}
                  </p>
                )}
              </>
            ) : (
              <>
                <CircleX className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
              </>
            )}
          </div>

          {/* Order Details */}
          {details?.registration && details.event && (
            <div className="space-y-6">
              <OrderCard 
                event={details.event} 
                registration={details.registration}
                variant="confirmation"
              />
              
              <ActionButtons 
                receiptUrl={details.receipt_url} 
                event={details.event}
              />

              <div className="text-center text-sm text-muted-foreground">
                <p>Des questions? Contactez-nous à support@example.com</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}