// features/registration/components/layout/PaymentStatus/SuccessView.tsx
import { BadgeCheck } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { EventPoster } from '@features/events/components/display/EventPoster'
import { baseVariants, staggerVariants } from '@lib/animations'
import { CalendarButton } from '@registration/components/checkout/CalendarButton'
import { EventSummaryCard } from '@registration/components/display/EventSummaryCard'
import type { RegistrationDetails } from '@registration/types/registrations'
import { Button } from '@ui/button'

interface SuccessViewProps {
  details: RegistrationDetails
  title: string
}

export function SuccessView({ details, title }: SuccessViewProps) {
  if (!details?.event) return null

  return (
    <motion.div
      variants={staggerVariants.parent}
      initial="initial"
      animate="animate"
      className="flex flex-col md:flex-row items-center justify-center gap-12 h-full w-full"
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
