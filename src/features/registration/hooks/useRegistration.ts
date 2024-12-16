// features/registration/hooks/useRegistration.ts
import { useState } from 'react'
import { FormData, formRegistry } from '../types/forms'
import { Database } from '@/types/generated-types'

type Event = Database['public']['Tables']['events']['Row']

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

export function useRegistration(event: Event) {
  const [step, setStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<FormData>(
    generateInitialState(event.type)
  )

  const handleRegistrationComplete = (data: FormData) => {
    setRegistrationData(data)
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  return {
    step,
    registrationData,
    handleRegistrationComplete,
    handleBack
  }
}