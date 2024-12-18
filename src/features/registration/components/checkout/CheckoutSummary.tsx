// features/registration/components/checkout/CheckoutSummary.tsx
import { motion } from 'motion/react'
import { Database } from '@/types/generated-types'
import { staggerVariants } from '@/lib/animations'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCheckout } from '../../hooks/useCheckout'
import { BaseField, FormData, formRegistry, FormType } from '../../types/forms'

type Props = {
  event: Database['public']['Tables']['events']['Row']
  formData: FormData
  onBack: () => void
}

export function CheckoutSummary({ event, formData, onBack }: Props) {
  const { isLoading, handleCheckout } = useCheckout()
  const config = formRegistry[event.type as FormType]
  const allFields = [
    ...config.baseFields,
    ...config.specificFields
  ] as readonly BaseField[]

  return (
    <motion.div
      className="space-y-6"
      variants={staggerVariants.list.parent}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={staggerVariants.list.child} className="space-y-2">
        <h3 className="text-sm font-medium">Événement</h3>
        <p className="text-xs text-muted-foreground">{event.name}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(event.date).toLocaleDateString()}
        </p>
      </motion.div>

      <motion.div variants={staggerVariants.list.child}>
        <Separator />
      </motion.div>

      <motion.div variants={staggerVariants.list.child} className="space-y-2">
        <h3 className="text-sm font-medium">Vos informations</h3>
        <div className="text-xs space-y-1">
          {allFields.map((field: BaseField) => {
            const key = field.name as keyof FormData
            return (
              <motion.p key={field.name} className="font-medium">
                {field.label}:{' '}
                <span className="font-light">{formData[key]}</span>
              </motion.p>
            )
          })}
        </div>
      </motion.div>

      <motion.div variants={staggerVariants.list.child}>
        <Separator />
      </motion.div>

      <motion.div variants={staggerVariants.list.child} className="space-y-1">
        <h3 className="text-sm font-medium">Total</h3>
        <p className="text-2xl font-bold">
          ${(event.price / 100).toFixed(2)} CAD
        </p>
      </motion.div>

      <motion.div variants={staggerVariants.list.child} className="flex gap-4">
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

      <motion.div
        variants={staggerVariants.list.child}
        className="text-xs text-muted-foreground"
      >
        En cliquant sur Payer maintenant, vous serez redirigé vers Stripe pour
        effectuer votre paiement de manière sécurisée.
      </motion.div>
    </motion.div>
  )
}