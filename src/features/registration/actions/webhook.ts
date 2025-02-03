// features/registration/actions/webhook.ts
import crypto from 'crypto'
import { supabase } from '@lib/services/supabase'
import { FormData } from '@registration/types/forms'
import Stripe from 'stripe'

export async function handleWebhook(
  stripeEvent: Stripe.Event,
  rawBody: string,
  signature: string,
) {
  try {
    console.log('Received webhook:', stripeEvent.type)
    console.log('Raw body:', rawBody)
    console.log('Signature:', signature)
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session

      // Get metadata from session
      const eventId = session.metadata?.event_id
      const registrationData = session.metadata?.registration_data
        ? (JSON.parse(session.metadata.registration_data) as FormData)
        : null

      if (!eventId || !registrationData) {
        throw new Error('Missing required metadata')
      }

      // Get the payment ID
      const paymentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id

      if (!paymentId) {
        throw new Error('Missing payment_intent in session')
      }

      // First, verify the event exists
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('id')
        .eq('id', eventId)
        .single()

      if (eventError || !event) {
        console.error('Event not found:', eventId)
        throw new Error('Event not found')
      }

      // Create registration record
      const { error } = await supabase.from('event_registrations').insert({
        id: crypto.randomUUID(),
        event_id: eventId,
        email: registrationData.email,
        name: registrationData.name,
        discord: registrationData.discord,
        riot_id: registrationData.riot_id,
        rank: registrationData.rank,
        payment_id: paymentId,
      })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Successfully registered user for event:', {
        name: registrationData.name,
        eventId,
        paymentId,
      })
    }

    return { received: true }
  } catch (error) {
    console.error('Webhook error:', error)
    throw error
  }
}
