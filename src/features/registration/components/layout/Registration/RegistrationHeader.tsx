// components/layout/Registration/RegistrationHeader.tsx
import { motion } from 'motion/react'
import { staggerVariants } from '@lib/animations'

interface RegistrationHeaderProps {
  step: number
}

export function RegistrationHeader({ step }: RegistrationHeaderProps) {
  return (
    <motion.div
      variants={staggerVariants.child}
      className="mb-2 flex flex-col gap-1"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-white">Inscription</h1>
      <p className="text-muted-foreground text-xs md:text-base">
        {step === 1
          ? 'Complétez les informations ci-dessous'
          : 'Vérifiez votre commande'}
      </p>
    </motion.div>
  )
}
