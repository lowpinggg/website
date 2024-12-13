// features/registration/components/checkout/OrderCard.tsx
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Database } from '@/types/generated-types'
import { FormData } from '../../types/forms'
import { motion } from 'motion/react'
import { animations } from '@/lib/animation'

type Props = {
  event: Database['public']['Tables']['events']['Row']
  registration: FormData
  variant?: 'preview' | 'confirmation'
}

export function OrderCard({ event, registration, variant = 'preview' }: Props) {
  return (
    <motion.div
      className="w-full flex flex-col gap-4"
      variants={animations.stagger.parent}
      initial="hidden"
      animate="visible"
    >
      <Card className="space-y-4 bg-none border-none">
        {variant === 'confirmation' && (
          <motion.div variants={animations.stagger.child}>
            <h2 className="text-xl font-semibold">{"Confirmer l'inscription"}</h2>
          </motion.div>
        )}

        <motion.div className="space-y-4 font-light" variants={animations.stagger.child}>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Événement</h3>
            <p className="text-xs text-muted-foreground">{event.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        <motion.div variants={animations.stagger.child}>
          <Separator className="bg-white/10" />
        </motion.div>

        <motion.div className="space-y-2" variants={animations.stagger.child}>
          <h3 className="text-sm font-medium">Vos informations</h3>
          <div className="text-xs space-y-1">
            {Object.entries(registration).map(([key, value]) => (
              <p key={key} className="font-medium">
                {key}:{' '}
                <span className="font-light">{value}</span>
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div variants={animations.stagger.child}>
          <Separator className="bg-white/10" />
        </motion.div>

        <motion.div className="space-y-1" variants={animations.stagger.child}>
          <h3 className="text-sm font-medium">Total</h3>
          <p className="text-2xl font-bold">
            {(event.price / 100).toFixed(2)} $CAD
          </p>
        </motion.div>
      </Card>
    </motion.div>
  )
}