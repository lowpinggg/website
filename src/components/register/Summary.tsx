// components/register/Summary.tsx
'use client'

import { useState } from 'react'

import { getStripe } from '@/lib/stripe'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type SummaryProps = {
  formData: {
    name: string
    email: string
    discord: string
    riotId: string
    rank: string
  }
  event: {
    id: string
    name: string
    date: string
    price: number
  }
  onBack: () => void
}

export default function Summary({ formData, event, onBack }: SummaryProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>{"Confirmer l'inscription"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">Événement</h3>
          <p className="text-sm text-muted-foreground">{event.name}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(event.date).toLocaleDateString()}
          </p>
        </div>

        <Separator />

        <div className="space-y-1">
          <h3 className="text-sm font-medium">Vos informations</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Nom: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Discord: {formData.discord}</p>
            <p>Riot ID: {formData.riotId}</p>
            <p>Rang: {formData.rank}</p>
          </div>
        </div>

        <Separator />

        <div className="pt-4 space-y-1">
          <h3 className="text-sm font-medium">Total</h3>
          <p className="text-2xl font-bold">
            {(event.price / 100).toFixed(2)} $CAD
          </p>
        </div>

        <div className="flex gap-4 pt-6">
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
      </CardContent>
    </Card>
  )
}
