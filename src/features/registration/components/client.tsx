'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'

import { Database } from '@/types/generated-types'
import { animations } from '@/lib/animation'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { DynamicForm } from '@/features/registration/components/DynamicForm'
import { Poster } from '@/features/registration/components/Poster'
import { Summary } from '@/features/registration/components/Summary'
import { FormData, formRegistry } from '@/features/registration/types/forms'

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

  return (
    <main className="min-h-screen flex items-center justify-center max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 gap-40">
        {/* Left Column - Poster */}
        <div className="flex-shrink-0">
          <motion.div
            variants={animations.fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Poster
    imageUrl={event.poster_url || '/example-tournament.png'}
                altText={event.name}
                hoverCTA={{
                  link: '/register',
                  text: 'Register Now'
                }}
    
  />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col min-w-[400px]">
          {/* Back Button */}
          <Link
            href="/"
            className="flex text-sm items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-8"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Events</span>
          </Link>

          {step === 1 ? (
            <motion.div
              variants={animations.fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Event Info */}
              <div>
                <Badge className="font-medium mb-4">{event.game}</Badge>
                <h1 className="text-3xl font-bold text-white mb-4">
                  {event.name}
                </h1>
                <div className="text-gray-300 space-y-2 mb-4">
                  <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                  <p>Price: ${(event.price / 100).toFixed(2)}</p>
                </div>
                <Separator />
              </div>

              {/* Registration Form */}
              <DynamicForm
                type={event.type}
                event={event}
                onComplete={handleRegistrationComplete}
                defaultValues={registrationData}
              />
            </motion.div>
          ) : (
            <motion.div
              variants={animations.fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Summary
                formData={registrationData}
                event={event}
                fields={formRegistry[event.type].fields}
                onBack={() => setStep(1)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}