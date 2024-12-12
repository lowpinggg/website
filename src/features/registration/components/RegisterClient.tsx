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
//import { Poster } from '@/features/registration/components/Poster'
import { EventPoster } from '@/features/events/components/EventPoster'
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
    <main className="h-screen flex items-start justify-center  mx-auto pt-10 w-full">
      <div className="flex justify-center w-full gap-16">
        {/* Left Column - Poster */}
        <motion.div
          variants={animations.stagger.child}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          >
            <EventPoster
              event={event}
              size="lg"
              showCTA={false}
            />
          </motion.div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div
          className="flex flex-col max-w-[400px]"
          variants={animations.stagger.parent}
          initial="hidden"
          animate="visible"
        >
          {/* Back Button */}
          <motion.div variants={animations.stagger.child}>
            <Link
              href="/"
              className="flex text-sm items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-8"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Events</span>
            </Link>
          </motion.div>

          {step === 1 ? (
            <>
              {/* Event Info */}
              <motion.div variants={animations.stagger.child}>
                <Badge className="font-medium mb-4">{event.game}</Badge>
              </motion.div>

              <motion.div variants={animations.stagger.child}>
                <h1 className="text-3xl font-bold text-white mb-4">
                  {event.name}
                </h1>
              </motion.div>

              <motion.div
                className="text-gray-300 space-y-2 mb-4"
                variants={animations.stagger.child}
              >
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Price: ${(event.price / 100).toFixed(2)}</p>
              </motion.div>

              <motion.div variants={animations.stagger.child}>
                <Separator className="mb-8" />
              </motion.div>

              {/* Registration Form */}
              <motion.div variants={animations.stagger.child}>
                <DynamicForm
                  type={event.type}
                  event={event}
                  onComplete={handleRegistrationComplete}
                  defaultValues={registrationData}
                />
              </motion.div>
            </>
          ) : (
            <Summary
              formData={registrationData}
              event={event}
              fields={formRegistry[event.type].fields}
              onBack={() => setStep(1)}
            />
          )}
        </motion.div>
      </div>
    </main>
  )
}