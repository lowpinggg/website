// app/[event]/register/client.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { Database } from '@/types/generated-types'
import { DynamicForm } from '@/components/register/DynamicForm'
import { FormData, formRegistry } from '@/components/register/forms'
import { Poster } from '@/components/register/Poster'
import Summary from '@/components/register/Summary'
import { Badge } from '@/components/ui/badge'
import { animations } from '@/lib/animation'
import { Separator } from '@/components/ui/separator'

type Props = {
  event: Database['public']['Tables']['events']['Row']
}

export function RegisterClient({ event }: Props) {
  const [step, setStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<FormData>({
    name: '',
    email: '',
    riotId: '',
    rank: 'IRON'
  })

  const handleRegistrationComplete = (data: FormData) => {
    setRegistrationData(data)
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

// app/[event]/register/client.tsx
return (
  <main className="min-h-screen relative max-w-4xl mx-auto">
      <div className="flex gap-24">
        {/* Left Column - Poster */}
        <div className="">
          <motion.div
            variants={animations.fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="sticky top-20 h-screen flex items-center justify-center" // Added sticky here instead
          >
            <Poster imageUrl={event.poster_url || ''} />
          </motion.div>
        </div>

        {/* Right Column - Content */}
        <div className="mx-auto flex flex-col justify-center">
          {/* Back Button */}
          <motion.div
            variants={animations.fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mb-6 hidden"
          >
            <Link
              href="/"
              className="flex text-sm items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Events</span>
            </Link>
          </motion.div>

          {step === 1 && (
            <div className="flex flex-col gap-6">
              {/* Event Info */}
              <motion.div
                variants={animations.fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.3}
              >
                <div className="flex gap-2 mb-4">
                  <Badge className="font-medium">{event.game}</Badge>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
                <div className="text-gray-300 space-y-2 mb-4">
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Price: ${event.price}</p>
                </div>
                <Separator />

              </motion.div>

              {/* Form */}
              <motion.div
                variants={animations.fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.4}
              >
                <DynamicForm
                  type={event.type}
                  event={event}
                  onComplete={handleRegistrationComplete}
                  defaultValues={registrationData}
                />
              </motion.div>
            </div>
          )}

          {/* Summary */}
          {step === 2 && registrationData && (
            <motion.div
              variants={animations.fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              <Summary
                formData={registrationData}
                event={event}
                fields={formRegistry[event.type].fields}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </div>
      </div>
  </main>
)
}