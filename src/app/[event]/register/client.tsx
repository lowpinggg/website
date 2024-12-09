// app/[event]/register/client.tsx (Client Component)
'use client'
import RegisterForm from '@/components/register/RegisterForm'
import Summary from '@/components/register/Summary'
import { useState } from 'react'

type RegistrationData = {
  name: string
  email: string
  discord: string
}

type Props = {
  event: {
    id: string
    name: string
    date: string
  }
}

export function RegisterClient({ event }: Props) {
  const [step, setStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null)

  const handleRegistrationComplete = (data: RegistrationData) => {
    setRegistrationData(data)
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <main className="container py-10">
      <div className="pattern-overlay" />
      <h1 className="text-4xl font-bold mb-8">{event.name} Registration</h1>
      
      {step === 1 && (
        <RegisterForm 
          event={event} 
          onComplete={handleRegistrationComplete} 
        />
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