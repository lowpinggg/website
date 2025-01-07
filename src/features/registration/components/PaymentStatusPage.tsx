'use client'

import confetti from 'canvas-confetti'
import { BadgeCheck, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import Link from 'next/link'
import { EventPoster } from '@events/components/EventPoster'
import { Database } from '@generated/index'
import { baseVariants, staggerVariants } from '@lib/animations'
import { CalendarButton } from '@registration/components/checkout/CalendarButton'
import { Button } from '@ui/button'
import { EventSummaryCard } from './shared/EventSummaryCard'

type Event = Database['public']['Tables']['events']['Row']
type Registration = Database['public']['Tables']['event_registrations']['Row']
type RegistrationDetails = {
  event: Event
  registration: Registration
  receipt_url?: string
} | null

type Props = {
  status: 'success' | 'cancelled'
  details: RegistrationDetails
  title: string
  description: string
}

export function PaymentStatusPage({
  status,
  details,
  title,
  description,
}: Props) {
  useEffect(() => {
    if (status === 'success') {
      const duration = 100
      const end = Date.now() + duration
      const interval = setInterval(() => {
        confetti({
          particleCount: 50,
          startVelocity: 32,
          spread: 180,
        })
        if (Date.now() > end) clearInterval(interval)
      }, 200)
      return () => clearInterval(interval)
    }
  }, [status])

  return (
    <div className="py-12 flex flex-col min-h-screen items-center justify-center">
      {status === 'success' && details ? (
        <SuccessSection details={details} title={title} />
      ) : (
        <CancelledSection title={title} description={description} />
      )}
    </div>
  )
}

function SuccessSection({
  details,
  title,
}: {
  details: RegistrationDetails
  title: string
}) {
  if (!details?.event) {
    return null
  }

  return (
    <motion.div
      variants={staggerVariants.parent}
      initial="initial"
      animate="animate"
      className="flex flex-col md:flex-row items-center justify-center gap-12 h-full"
    >
      <motion.div variants={baseVariants.slideUp}>
        <EventPoster event={details.event} showCTA={false} size="md" />
      </motion.div>

      <div className="flex flex-col items-center md:items-start max-w-md">
        <motion.div
          variants={staggerVariants.child}
          className="flex flex-col gap-6 w-full"
        >
          <motion.div
            variants={staggerVariants.child}
            className="flex flex-col gap-2 text-center md:text-left"
          >
            <h1 className="flex items-center gap-2 justify-center md:justify-start text-2xl font-bold">
              <BadgeCheck className="text-green-500" size={28} />
              {title}
            </h1>
            {details.registration && (
              <p className="text-muted-foreground text-sm">
                Un email de confirmation a été envoyé à{' '}
                {details.registration.email}
              </p>
            )}
          </motion.div>

          <motion.div variants={staggerVariants.child} className="w-full">
            <EventSummaryCard event={details.event} />
          </motion.div>

          <motion.div
            variants={staggerVariants.child}
            className="flex gap-2 mx-auto md:mx-0"
          >
            <Link href="/">
              <Button>Retour</Button>
            </Link>
            {details.receipt_url && (
              <Link href={details.receipt_url} target="_blank">
                <Button variant="outline">Voir la commande</Button>
              </Link>
            )}
          </motion.div>

          <motion.div variants={staggerVariants.child}>
            <CalendarButton event={details.event} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function CancelledSection({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={baseVariants.slideUp}
      initial="initial"
      animate="animate"
      className="flex items-center justify-center"
    >
      <motion.div
        variants={staggerVariants.parent}
        className="flex flex-col items-center gap-4 max-w-md text-center"
      >
        <motion.div variants={staggerVariants.child}>
          <X size={50} className="text-red-500" />
        </motion.div>
        <motion.h1
          variants={staggerVariants.child}
          className="text-2xl font-bold"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={staggerVariants.child}
          className="text-muted-foreground text-sm"
        >
          {description}
        </motion.p>
        <motion.div variants={staggerVariants.child}>
          <Link href="/">
            <Button variant="outline">Retour</Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
