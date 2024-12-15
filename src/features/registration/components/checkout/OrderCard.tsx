// features/registration/components/checkout/OrderCard.tsx
'use client'

import { FormData } from '@/features/registration/types/forms'
import { motion } from 'motion/react'

import { Database } from '@/types/generated-types'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  event: Database['public']['Tables']['events']['Row']
  registration: FormData
  variant?: 'preview' | 'confirmation'
}

export function OrderCard({ event, registration, variant = 'preview' }: Props) {
  return (
    <div className="w-full flex flex-col gap-4"
    >
      <Card className="space-y-4 bg-transparent border-none">
        {variant === 'confirmation' && (
          <motion.h2 className="text-xl font-semibold">
              {"Confirmer l'inscription"}
          </motion.h2>
        )}

        <div className="space-y-4 font-light"
        >
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Événement</h3>
            <p className="text-xs text-muted-foreground">{event.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        </div>

          <Separator className="bg-white/10" />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Vos informations</h3>
          <div className="text-xs space-y-1">
            {Object.entries(registration).map(([key, value]) => (
              <p key={key} className="font-medium">
                {key}: <span className="font-light">{value}</span>
              </p>
            ))}
          </div>
        </div>

          <Separator className="bg-white/10" />

        <div className="space-y-1">
          <h3 className="text-sm font-medium">Total</h3>
          <p className="text-2xl font-bold">
            {(event.price / 100).toFixed(2)} $CAD
          </p>
        </div>
      </Card>
    </div>
  )
}
