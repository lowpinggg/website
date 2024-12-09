// app/[event]/register/client.tsx
'use client'

import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import Summary from '@/components/register/Summary'
import RegistrationForm from '@/components/register/RegistrationForm'
import { FormData, formConfigs } from '@/types/registration'

type Props = {
  event: {
    id: string
    name: string
    date: string
    price: number
    type: keyof typeof formConfigs
  }
}

export function RegisterClient({ event }: Props) {
  const [step, setStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<FormData | null>(null)

  const handleRegistrationComplete = (data: FormData) => {
    setRegistrationData(data)
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  // Verify that the event type exists in our configs
  if (!formConfigs[event.type]) {
    return <div>Invalid event type</div>
  }

  return (
    <main className="container gap-6 max-w-md py-10 h-screen mx-auto flex justify-center flex-col items-center">
      <div className="flex flex-col gap-2 w-full">
        <h3>Registration</h3>
        <h1 className="text-4xl font-bold">{event.name}</h1>
      </div>
      
      <Separator />
      
      {step === 1 && (
        <RegistrationForm
          type={event.type}
          event={event}
          onComplete={handleRegistrationComplete}
        />
      )}

      {step === 2 && registrationData && (
        <Summary
          formData={registrationData}
          formFields={formConfigs[event.type].fields}
          event={event}
          onBack={handleBack}
        />
      )}
    </main>
  )
}