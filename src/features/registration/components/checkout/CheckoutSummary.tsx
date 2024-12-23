import { motion } from 'motion/react'
import { formatters } from '@/features/events/utils/eventHelpers'
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

// features/registration/components/checkout/CheckoutSummary.tsx
export function CheckoutSummary({ event, formData, onBack }: Props) {
  const { isLoading, handleCheckout } = useCheckout()
  const config = formRegistry[event.type as FormType]
  const allFields = [...config.baseFields, ...config.specificFields] as readonly BaseField[]

  return (
    <motion.div
      className="space-y-6"
      variants={staggerVariants.parent}
      initial="initial"
      animate="animate"
    >
      {/* User Information */}
      <motion.div variants={staggerVariants.child} className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Vos informations
        </h3>
        <div className="gap-4 grid grid-cols-2">
          {allFields.map((field: BaseField) => {
            const key = field.name as keyof FormData
            return (
              <div key={field.name} className="space-y-1 ">
                <p className="text-xs font-medium text-muted-foreground">
                  {field.label}
                </p>
                <p className="text-sm text-white">{formData[key] || 'Non renseigné'}</p>
              </div>
            )
          })}
        </div>
      </motion.div>

      <motion.div variants={staggerVariants.child}>
        <Separator />
      </motion.div>

      {/* Price and Actions */}
      <motion.div variants={staggerVariants.child} className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total</span>
          <span className="text-2xl font-bold text-primary">
            {formatters.price(event.price)}
          </span>
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
            onClick={() => handleCheckout(event, formData)}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'En cours...' : 'Payer maintenant'}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          En cliquant sur <strong>Payer maintenant</strong>, vous serez redirigé
          vers Stripe pour effectuer votre paiement de manière sécurisée.
        </p>
      </motion.div>
    </motion.div>
  )
}
