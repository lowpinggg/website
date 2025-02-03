// components/layout/Registration/RegistrationHeader.tsx
import { staggerVariants } from '@lib/animations'
import { motion } from 'motion/react'

interface RegistrationHeaderProps {
  step: number
}

export function RegistrationHeader({ step }: RegistrationHeaderProps) {
  return (
    <motion.div
      variants={staggerVariants.child}
      className="mb-2 flex flex-col gap-1"
    >
      <h1 className="text-2xl font-bold text-white md:text-3xl">Inscription</h1>
      <p className="text-xs text-muted-foreground md:text-base">
        {step === 1
          ? 'Complétez les informations ci-dessous'
          : 'Vérifiez votre commande'}
      </p>
    </motion.div>
  )
}
