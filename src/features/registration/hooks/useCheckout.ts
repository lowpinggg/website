// features/registration/hooks/useCheckout.ts
import { useState } from 'react'
import { Database } from '@generated/index'
import { useToast } from '@hooks/use-toast'
import { getStripe } from '@lib/services/stripe/stripe'
import { FormData } from '../types/forms'

type Event = Database['public']['Tables']['events']['Row']

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async (event: Event, formData: FormData) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event, formData }),
      })
      const data = await response.json()

      if (!data.sessionId) {
        throw new Error('No session ID returned')
      }

      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (error) {
        throw error
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description:
          'Un problème est survenu lors du traitement de votre paiement.',
      })
      console.error('Payment error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleCheckout,
  }
}
