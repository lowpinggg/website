// features/registration/components/checkout/CheckoutSummary.tsx
import { useState } from 'react'
import { Database } from '@/types/generated-types'
import { getStripe } from '@/lib/stripe/stripe'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

import { FormData } from '../../types/forms'
import { OrderCard } from './OrderCard'

type Props = {
  formData: FormData
  event: Database['public']['Tables']['events']['Row']
  onBack: () => void
}

export function CheckoutSummary({ formData, event, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handlePayment = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ event, formData })
      })

      const data = await response.json()
      if (!data.sessionId) {
        throw new Error('No session ID returned')
      }

      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description:
          'Un problème est survenu lors du traitement de votre paiement.'
      })
      console.error('Payment error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-4"
    >
      <OrderCard event={event} registration={formData} variant="preview" />

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1"
          >
            Retour
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'En cours...' : 'Payer maintenant'}
          </Button>
        </div>
      <div className="text-xs text-muted-foreground text-start font-light"
      >
        En cliquant sur &ldquo;Payer maintenant&rdquo;, vous serez redirigé vers
        Stripe pour effectuer votre paiement de manière sécurisée.
      </div>
    </div>
  )
}
