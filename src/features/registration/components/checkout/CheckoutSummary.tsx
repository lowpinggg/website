// features/registration/components/checkout/CheckoutSummary.tsx
import { FormData, formRegistry, FormType } from '../../types/forms'
import { Database } from '@/types/generated-types'
import { useCheckout } from '../../hooks/useCheckout'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { motion } from 'motion/react'
import { formStaggerVariants } from '@/lib/animations/variants'

type Props = {
  event: Database['public']['Tables']['events']['Row']
  formData: FormData
  onBack: () => void
}

export function CheckoutSummary({ event, formData, onBack }: Props) {
  const { isLoading, handleCheckout } = useCheckout()

  // Get the correct fields based on event type
  const fields = formRegistry[event.type as FormType].fields

  return (
    <motion.div 
      className="space-y-6"
      variants={formStaggerVariants.parent}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={formStaggerVariants.child} className="space-y-2">
        <h3 className="text-sm font-medium">Événement</h3>
        <p className="text-xs text-muted-foreground">{event.name}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(event.date).toLocaleDateString()}
        </p>
      </motion.div>

      <motion.div variants={formStaggerVariants.child}>
        <Separator />
      </motion.div>

      <motion.div variants={formStaggerVariants.child} className="space-y-2">
        <h3 className="text-sm font-medium">Vos informations</h3>
        <div className="text-xs space-y-1">
          {fields.map((field) => {
            const key = field.name as keyof FormData
            return (
              <motion.p key={field.name} className="font-medium">
                {field.label}:{' '}
                <span className="font-light">
                  {formData[key]}
                </span>
              </motion.p>
            )
          })}
        </div>
      </motion.div>

      <motion.div variants={formStaggerVariants.child}>
        <Separator />
      </motion.div>

      <motion.div variants={formStaggerVariants.child} className="space-y-1">
        <h3 className="text-sm font-medium">Total</h3>
        <p className="text-2xl font-bold">
          ${(event.price / 100).toFixed(2)} CAD
        </p>
      </motion.div>

      <motion.div variants={formStaggerVariants.child} className="flex gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1"
        >
          Retour
        </Button>
        <Button
          onClick={() => handleCheckout(event, formData)}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? 'En cours...' : 'Payer maintenant'}
        </Button>
      </motion.div>

      <motion.div variants={formStaggerVariants.child} className="text-xs text-muted-foreground">
        En cliquant sur Payer maintenant, vous serez redirigé vers Stripe pour effectuer votre paiement de manière sécurisée.
      </motion.div>
    </motion.div>
  )
}