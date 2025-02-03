import { formatters } from '@events/utils/eventHelpers'
import { Database } from '@generated/index'
import { staggerVariants } from '@lib/animations'
import { Button } from '@ui/button'
import { Separator } from '@ui/separator'
import { motion } from 'motion/react'
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
    ...config.specificFields,
  ] as readonly BaseField[]

  return (
    <motion.div
      className="space-y-6"
      variants={staggerVariants.parent}
      initial="initial"
      animate="animate"
    >
      {/* User Information */}
      <motion.div variants={staggerVariants.child} className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Vos informations
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {allFields.map((field: BaseField) => {
            const key = field.name as keyof FormData
            return (
              <div key={field.name} className="space-y-1 ">
                <p className="text-xs font-medium text-muted-foreground">
                  {field.label}
                </p>
                <p className="text-sm text-white">
                  {formData[key] || 'Non renseigné'}
                </p>
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
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total</span>
          <span className="text-2xl font-bold text-primary text-white">
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
            className="flex-1 bg-white text-background hover:bg-white/80"
            variant="default"
          >
            {isLoading ? 'En cours...' : 'Payer maintenant'}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          En cliquant sur <strong>Payer maintenant</strong>, vous serez redirigé
          vers Stripe pour effectuer votre paiement de manière sécurisée.
        </p>
      </motion.div>
    </motion.div>
  )
}
