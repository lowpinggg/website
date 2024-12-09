// app/[event]/register/client.tsx (Client Component)
'use client'

import { useState } from 'react'

import { Separator } from '@/components/ui/separator'
import RegisterForm from '@/components/register/RegisterForm'
import Summary from '@/components/register/Summary'

type RegistrationData = {
  name: string
  email: string
  discord: string
  riotId: string
  rank: string
}

type Props = {
  event: {
    id: string
    name: string
    date: string
    price: number
  }
}

export function RegisterClient({ event }: Props) {
  const [step, setStep] = useState(1)
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null)

  const handleRegistrationComplete = (data: RegistrationData) => {
    setRegistrationData(data)
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <main className="container gap-6 max-w-md py-10 h-screen mx-auto flex justify-center flex-col items-center">
      <div className="flex flex-col gap-2 w-full">
        <h3>Registration</h3>
        <h1 className="text-4xl font-bold">{event.name} </h1>
      </div>
      <Separator />
      {step === 1 && (
        <RegisterForm event={event} onComplete={handleRegistrationComplete} />
      )}

      {step === 2 && registrationData && (
        <Summary
          formData={registrationData}
          event={event}
          onBack={handleBack}
        />
      )}
    </main>
  )
}
