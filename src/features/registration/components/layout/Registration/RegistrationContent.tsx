// components/layout/Registration/RegistrationContent.tsx
import { motion } from 'motion/react'
import type { Database } from '@generated/index'
import { staggerVariants } from '@lib/animations'
import { CheckoutSummary } from '@registration/components/checkout/CheckoutSummary'
import { EventSummaryCard } from '@registration/components/display/EventSummaryCard'
import { DynamicForm } from '@registration/components/forms/DynamicForm'
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
        <div className="bg-black/20 rounded-lg border border-white/10 p-4 lg:p-6 overflow-hidden mt-4">
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
          className="text-xs text-muted-foreground text-center"
        >
          En vous inscrivant, vous acceptez nos conditions générales de
          participation.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
