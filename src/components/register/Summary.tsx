'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

import { Database } from '@/types/generated-types'
import { getStripe } from '@/lib/stripe/stripe'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { FormData, FormField } from '@/components/register/forms'

type Props = {
  formData: FormData
  event: Database['public']['Tables']['events']['Row']
  fields: readonly FormField[]
  onBack: () => void
}

export default function Summary({ formData, event, fields, onBack }: Props) {
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

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delay: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.19, 1, 0.22, 1], duration: .8 }
    }
  }

  return (
    <div>
   
    <motion.div
      className="w-full flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
        animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-semibold">{"Confirmer l'inscription"}</h2>
      </motion.div>
        <motion.div className="space-y-4 font-light" variants={itemVariants}>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Événement</h3>
            <p className="text-xs text-muted-foreground">{event.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      <motion.div className="" variants={itemVariants}>
        <Separator />
      </motion.div>
        <motion.div className="space-y-2" variants={itemVariants}>
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
        </motion.div>
      <motion.div variants={itemVariants}>
        <Separator />
      </motion.div>
        <motion.div className="space-y-1" variants={itemVariants}>
          <h3 className="text-sm font-medium">Total</h3>
          <p className="text-2xl font-bold">
            {(event.price / 100).toFixed(2)} $CAD
          </p>
        </motion.div>
        <motion.div className="flex gap-4" variants={itemVariants}>
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
        </motion.div>
        <motion.div
          className="text-xs text-muted-foreground font-light"
          variants={itemVariants}
        >
          {
            'En cliquant sur "Payer maintenant", vous serez redirigé vers Stripe pour effectuer votre paiement de manière sécurisée.'
          }
        </motion.div>
      </motion.div>
     
      </div>
  )
}
