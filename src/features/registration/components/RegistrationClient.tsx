// features/registration/components/RegisterClient.tsx
'use client'

import { EventPoster } from '@/features/events/components/EventPoster'
import { useRegistration } from '@/features/registration/hooks/useRegistration'
import { motion } from 'motion/react'

import { Database } from '@/types/generated-types'
import { baseVariants, staggerVariants } from '@/lib/animations'
import { Footer } from '@/components/Footer'
import { useMedia } from '@/hooks/useMedia'
import { FormData } from '../types/forms'
import { CheckoutSummary } from './checkout/CheckoutSummary'
import { DynamicForm } from './forms/DynamicForm'

import { EventSummaryCard } from '@/features/registration/components/shared/EventSummaryCard'

type Props = {
  event: Database['public']['Tables']['events']['Row']
}
function EventHeader({ step }: { step: number }) {
  return (
    <motion.div variants={staggerVariants.child} className="mb-2 flex flex-col gap-1">
      <h1 className="text-2xl lg:text-3xl font-bold text-white">
        Inscription
      </h1>
      <p className="text-muted-foreground text-xs md:text-base">
        {step === 1
          ? 'Complétez les informations ci-dessous'
          : 'Vérifiez votre commande'
        }
      </p>
    </motion.div>
  )
}

interface ContentSectionProps {
  step: number
  event: Props['event']
  registrationData: FormData
  onRegistrationComplete: (data: FormData) => void
  onBack: () => void
}

export function ContentSection({
  step,
  event,
  registrationData,
  onRegistrationComplete,
  onBack
}: ContentSectionProps) {
  return (
    <motion.div
      variants={staggerVariants.parent}
      initial="initial"
      animate="animate"
      className="w-full max-w-lg"
    >
      <motion.div variants={staggerVariants.child}>
        <EventHeader step={step} />
      </motion.div>

      <motion.div variants={staggerVariants.child}>
        <EventSummaryCard event={event} />
      </motion.div>

      <motion.div variants={staggerVariants.child} className="flex flex-col gap-4">
        <div className="bg-black/20 rounded-lg border border-white/10 p-8 overflow-hidden mt-4">
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
          En vous inscrivant, vous acceptez nos conditions générales de participation.
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export function RegistrationClient({ event }: Props) {
  const { step, registrationData, handleRegistrationComplete, handleBack } = useRegistration(event)
  const isMobile = useMedia('(max-width: 767px)')

  return (
    <>
      <motion.div
          variants={staggerVariants.parent}
          initial="initial"
          animate="animate"
        
        className="grid grid-cols-1 md:grid-cols-2 items-start py-12 gap-6 lg:gap-0">
        <motion.div
          variants={staggerVariants.child}
          className="flex items-center justify-center md:sticky top-10"
        >
          <EventPoster tiltProps={{ scale: 1.02, glareMaxOpacity: 0.3 }} event={event} size={isMobile ? 'md' : 'lg'} showCTA={false} />
        </motion.div>

        <div className="flex items-center w-full justify-center">
          <ContentSection
            step={step}
            event={event}
            registrationData={registrationData}
            onRegistrationComplete={handleRegistrationComplete}
            onBack={handleBack}
          />
        </div>
      </motion.div>
      <Footer />
    </>
  )
}