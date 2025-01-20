// components/layout/Registration/RegistrationContent.tsx
import { motion } from 'motion/react'
import { CheckoutSummary } from '@features/registration/components/CheckoutSummary/CheckoutSummary'
import { EventSummaryCard } from '@features/registration/components/EventSummary/EventSummary'
import { DynamicForm } from '@features/registration/components/forms'
import type { Database } from '@generated/index'
import { staggerVariants } from '@lib/animations'
import type { FormData } from '@registration/types/forms'
import { RegistrationHeader } from './RegistrationHeader'

interface RegistrationContentProps {
  step: number
  event: Database['public']['Tables']['events']['Row']
  registrationData: FormData
  onRegistrationComplete: (data: FormData) => void
  onBack: () => void
}

export function RegistrationContent({
  step,
  event,
  registrationData,
  onRegistrationComplete,
  onBack,
}: RegistrationContentProps) {
  return (
    <motion.div
      variants={staggerVariants.parent}
      initial="initial"
      animate="animate"
      className="w-full max-w-lg"
    >
      <motion.div variants={staggerVariants.child} className="mb-4">
        <RegistrationHeader step={step} />
      </motion.div>

      <motion.div variants={staggerVariants.child}>
        <EventSummaryCard event={event} />
      </motion.div>

      <motion.div
        variants={staggerVariants.child}
        className="flex flex-col gap-4"
      >
        <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-black/20 p-4 lg:p-6">
          {step === 1 ? (
            <DynamicForm
              type={event.type}
              onComplete={onRegistrationComplete}
              defaultValues={registrationData}
            />
          ) : (
            <CheckoutSummary
              event={event}
              formData={registrationData}
              onBack={onBack}
            />
          )}
        </div>

        <motion.p
          variants={staggerVariants.child}
          className="text-center text-xs text-muted-foreground"
        >
          En vous inscrivant, vous acceptez nos conditions générales de
          participation.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
