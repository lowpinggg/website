// features/registration/components/RegisterClient.tsx
'use client'

import { EventPoster } from '@/features/events/components/EventPoster'
import { useRegistration } from '@/features/registration/hooks/useRegistration'
import { motion } from 'motion/react'

import { Database } from '@/types/generated-types'
import { slideUpVariants, staggerVariants } from '@/lib/animations/variants'
import { Badge } from '@/components/ui/badge'
import { Footer } from '@/components/Footer'

import { FormData } from '../types/forms'
import { CheckoutSummary } from './checkout/CheckoutSummary'
import { DynamicForm } from './forms/DynamicForm'

type Props = {
  event: Database['public']['Tables']['events']['Row']
}

export function RegistrationClient({ event }: Props) {
  const { step, registrationData, handleRegistrationComplete, handleBack } =
    useRegistration(event)

  return (
    <div className="min-h-screen flex flex-col w-full container mx-auto px-4 sm:px-0">
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[calc(100vh-64px)] items-start gap-6 sm:gap-12 xl:gap-0 py-4 md:py-12">
          <motion.div
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            className="flex items-center justify-center sm:sticky top-10 pb-10"
          >
            <EventPoster event={event} size="lg" showCTA={false} />
          </motion.div>

          <div className="flex items-center">
            <ContentSection
              step={step}
              event={event}
              registrationData={registrationData}
              onRegistrationComplete={handleRegistrationComplete}
              onBack={handleBack}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ContentSection({
  step,
  event,
  registrationData,
  onRegistrationComplete,
  onBack
}: {
  step: number
  event: Props['event']
  registrationData: FormData
  onRegistrationComplete: (data: FormData) => void
  onBack: () => void
}) {
  return (
    <motion.div
      variants={staggerVariants.parent}
      initial="initial"
      animate="animate"
      className="w-full sm:max-w-xl md:max-w-xl"
    >
      <motion.div
        variants={staggerVariants.child}
        className="flex flex-col w-full space-y-6"
      >
        <motion.div variants={staggerVariants.child}>
          <Badge className="font-medium">{event.game}</Badge>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mt-4 mb-1">
            {event.name}
          </h1>
          <p className="text-muted-foreground text-xs md:text-base">
            {step === 1
              ? 'Complete your registration details below'
              : 'Review your order'}
          </p>
        </motion.div>

        {step === 1 && (
          <motion.div
            variants={staggerVariants.child}
            className="grid grid-cols-2 gap-4 p-4 bg-black/30 rounded-lg border border-white/10"
          >
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="text-white font-medium">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400">Price</p>
              <p className="text-white font-medium">
                ${(event.price / 100).toFixed(2)}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          variants={staggerVariants.child}
          className="bg-black/20 rounded-lg border border-white/10 p-6"
        >
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
        </motion.div>

        <motion.div
          variants={staggerVariants.child}
          className="text-xs text-muted-foreground text-center"
        >
          <p>By registering, you agree to our terms and conditions.</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
