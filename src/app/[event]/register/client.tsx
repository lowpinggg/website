// app/[event]/register/client.tsx
'use client'

import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import Summary from '@/components/register/Summary'
import RegistrationForm from '@/components/register/RegistrationForm'
import { FormData, formConfigs } from '@/types/registration'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

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
    <main className="container h-screen mx-auto justify-center gap-24 flex items-center">
      <section className='flex justify-center'>
        <div className='bg-zinc-900 border border-zinc-800 w-[420px] h-[560px]'></div>
      </section>
      <section className=' flex items-center justify-center w-full h-full max-w-sm'>

        {step === 1 && (
          <div className='flex flex-col gap-4'>
            <div className="flex flex-col gap-2 w-full">
              <Link href="/" className='mb-4'>
                <Button variant="outline" className='w-4 h-8'> <ArrowLeft /></Button>
              </Link>
              <h3 className='text-sm text-muted-foreground'>Registration</h3>
              <h1 className="text-xl font-bold">{event.name}</h1>
            </div>
            <Separator />
            <RegistrationForm
              type={event.type}
              event={event}
              onComplete={handleRegistrationComplete}
            />
          </div>
        )}

        {step === 2 && registrationData && (
             <Summary
            formData={registrationData}
            formFields={formConfigs[event.type].fields}
            event={event}
            onBack={handleBack}
          />
        )}
      </section>
    </main>
  )
}