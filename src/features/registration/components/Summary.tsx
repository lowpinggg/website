'use client'

import { useState } from 'react'
import { BaseField, FormData } from '@/features/registration/types/forms'
import { Database } from '@/types/generated-types'
import { getStripe } from '@/lib/stripe/stripe'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Props = {
  formData: FormData
  event: Database['public']['Tables']['events']['Row']
  fields: readonly BaseField[]
  onBack: () => void
}

export function Summary({ formData, event, fields, onBack }: Props) {
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

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      })

      if (error) {
        throw error
      }
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
    <div>
      <div className="w-full flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold">{"Confirmer l'inscription"}</h2>
        </div>

        <div className="space-y-4 font-light">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Événement</h3>
            <p className="text-xs text-muted-foreground">{event.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Vos informations</h3>
          <div className="text-xs space-y-1">
            {fields.map(
              (field) =>
                formData[field.name as keyof FormData] && (
                  <p key={field.name} className="font-medium">
                    {field.label}:{' '}
                    <span className="font-light">
                      {formData[field.name as keyof FormData]}
                    </span>
                  </p>
                )
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <h3 className="text-sm font-medium">Total</h3>
          <p className="text-2xl font-bold">
            {(event.price / 100).toFixed(2)} $CAD
          </p>
        </div>

        <div className="flex gap-4">
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

        <div className="text-xs text-muted-foreground font-light">
          {
            'En cliquant sur "Payer maintenant", vous serez redirigé vers Stripe pour effectuer votre paiement de manière sécurisée.'
          }
        </div>
      </div>
    </div>
  )
}