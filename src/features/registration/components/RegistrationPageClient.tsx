// components/RegistrationPageClient.tsx
'use client'

import { motion } from 'motion/react'
import { Footer } from '@components/Footer'
import { EventPoster } from '@features/events/components/EventGallery/EventPoster'
import { RegistrationContent } from '@features/registration/components/Registration'
import type { Database } from '@generated/index'
import { useScreenResolution } from '@hooks/use-screen-resolution'
import { staggerVariants } from '@lib/animations'
import { useRegistration } from '@registration/hooks/useRegistration'

// components/RegistrationPageClient.tsx

// components/RegistrationPageClient.tsx

// components/RegistrationPageClient.tsx

// components/RegistrationPageClient.tsx

type Props = {
  event: Database['public']['Tables']['events']['Row']
}

export function RegistrationPageClient({ event }: Props) {
  const { step, registrationData, handleRegistrationComplete, handleBack } =
    useRegistration(event)
  const { isMobile, isTablet } = useScreenResolution()

  return (
    <>
      <motion.div
        variants={staggerVariants.parent}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 items-start gap-6 py-12 md:grid-cols-2 lg:gap-0"
      >
        <motion.div
          variants={staggerVariants.child}
          className="top-10 flex items-center justify-center md:sticky"
        >
          <EventPoster
            tiltProps={{ scale: 1.02, glareMaxOpacity: 0.3 }}
            event={event}
            size={isMobile || isTablet ? 'md' : 'lg'}
            showCTA={false}
          />
        </motion.div>

        <div className="flex w-full items-center justify-center">
          <RegistrationContent
            step={step}
            event={event}
            registrationData={registrationData}
            onRegistrationComplete={handleRegistrationComplete}
            onBack={handleBack}
          />
        </div>
      </motion.div>
      <Footer />
    </>
  )
}
