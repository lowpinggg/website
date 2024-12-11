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
  }) // Initialize with default values

  const handleRegistrationComplete = (data: FormData) => {
    setRegistrationData(data) // Save form data
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <main className="container min-h-screen mx-auto justify-center flex items-center py-20">
      <div className="h-fit flex gap-12 items-start">
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 24, opacity: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
          className="sticky top-12"
        >
          <Poster imageUrl={event.poster_url || ''} />
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: 24, opacity: 0 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
          >
            <Link href="/" className="mb-4 flex text-xs items-center transition-all hover:-translate-x-1 w-fit">
                <ArrowLeft size={14} />Events
            </Link>
          </motion.div>
          <section className="flex items-center justify-center w-full h-full max-w-sm">
            {step === 1 && (
              <div className="flex flex-col">
                <DynamicForm
                  type={event.type}
                  event={event}
                  onComplete={handleRegistrationComplete}
                  defaultValues={registrationData} // Pass saved data to the form
                />
              </div>
            )}
            {step === 2 && registrationData && (
              <Summary
                formData={registrationData}
                event={event}
                fields={formRegistry[event.type].fields}
                onBack={handleBack}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
