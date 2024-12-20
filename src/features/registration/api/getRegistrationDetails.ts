// features/registration/api/getRegistrationDetails.ts
import { getEventById } from '@/features/events/api/getEvents'
import { stripe } from '@/lib/stripe/stripe-server'
import { supabase } from '@/lib/supabase'
import { FormData } from '../types/forms'

type RegistrationDetails = {
  event: NonNullable<Awaited<ReturnType<typeof getEventById>>['data']>
  registration: FormData | null
  receipt_url: string | null
}

export async function getRegistrationDetails(
  sessionId: string
): Promise<RegistrationDetails | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const { data: event } = await getEventById(
      session.metadata?.event_id as string
    )
    if (!event) return null

    let registration = null
    let receipt_url = null

    if (typeof session.payment_intent === 'string') {
      const { data: regData } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('payment_id', session.payment_intent)
        .single()

      registration = regData

      const charges = await stripe.charges.list({
        payment_intent: session.payment_intent
      })
      receipt_url = charges.data[0]?.receipt_url
    }

    return {
      event,
      registration,
      receipt_url
    }
  } catch (error) {
    console.error('Error fetching registration details:', error)
    return null
  }
}
