// features/registration/components/RegisterClient.tsx
'use client'

import { useState } from 'react'
import { EventPoster } from '@/features/events/components/EventPoster'
import { DynamicForm } from '@/features/registration/components/DynamicForm'
import { FormData, formRegistry } from '@/features/registration/types/forms'
import { motion } from 'motion/react'

import { Database } from '@/types/generated-types'
import { Badge } from '@/components/ui/badge'
import { Footer } from '@/components/Footer'

import { CheckoutSummary } from './checkout/CheckoutSummary'

type Props = {
  event: Database['public']['Tables']['events']['Row']
}

function generateInitialState(eventType: keyof typeof formRegistry): FormData {
  const fields = formRegistry[eventType].fields
  return fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]:
        field.type === 'select' && field.options ? field.options[0] : ''
    }),
    {}
  ) as FormData
}

export function RegisterClient({ event }: Props) {
  const [step, setStep] = useState(1)

  const [registrationData, setRegistrationData] = useState<FormData>(
    generateInitialState(event.type)
  )
  const handleRegistrationComplete = (data: FormData) => {
    setRegistrationData(data)
    setStep(2)
  }

  return (
    <div className="min-h-screen flex flex-col w-full container mx-auto p-4">
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[calc(100vh-64px)] items-start gap-6 md:gap-12 lg:gap-0 py-4 md:py-12">
          <div className="flex items-center justify-center sm:sticky top-0">
            <EventPosterSection event={event} />
          </div>

          <div className="flex items-center">
            <ContentSection
              step={step}
              event={event}
              registrationData={registrationData}
              onRegistrationComplete={handleRegistrationComplete}
              onBack={() => setStep(1)}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function EventPosterSection({ event }: { event: Props['event'] }) {
  return (
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <EventPoster event={event} size="xl" showCTA={false} />
      </motion.div>
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
    <div className="w-full sm:max-w-xl md:max-w-xl">
      <div className="flex flex-col w-full space-y-6">
          <div>
            <Badge className="font-medium">{event.game}</Badge>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mt-4 mb-1">
              {event.name}
            </h1>
            <p className="text-muted-foreground text-xs md:text-base">
              {step === 1
                ? 'Complete your registration details below'
                : 'Review your order'}
            </p>
          </div>

        {/* Event details - only show in step 1 */}
        {step === 1 && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-black/30 rounded-lg border border-white/10">
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
            </div>
        )}

        <div className="bg-black/20 rounded-lg border border-white/10 p-6">
          {step === 1 ? (
              <DynamicForm
                type={event.type}
                event={event}
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

        <div className="text-xs text-muted-foreground text-center">
          <p>By registering, you agree to our terms and conditions.</p>
        </div>
      </div>
    </div>
  )
}
