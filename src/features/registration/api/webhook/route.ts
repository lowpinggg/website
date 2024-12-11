// app/api/webhook/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { stripe } from '@/lib/stripe/stripe-server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json(
      {
        error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`
      },
      { status: 400 }
    )
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      // Handle the successful payment
      await handleSuccessfulPayment(session)
      break
    }
    // Add other event types as needed
  }

  return NextResponse.json({ received: true })
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const { eventId, userEmail, userName, userDiscord, userRiotId, userRank } =
    session.metadata || {}

  if (!session.metadata) {
    console.error('Missing metadata in Stripe session')
    return
  }

  // Get the payment ID
  const paymentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id

  if (!paymentId) {
    console.error('Missing payment_intent in session')
    return
  }

  try {
    // First, verify the event exists
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('id')
      .eq('id', eventId)
      .single()

    if (eventError || !event) {
      console.error('Event not found:', eventId)
      return
    }

    // Insert the registration
    const { error } = await supabase.from('event_registrations').insert({
      name: userName,
      email: userEmail,
      discord: userDiscord,
      riot_id: userRiotId,
      rank: userRank,
      event_id: eventId,
      payment_id: paymentId
    })

    if (error) {
      console.error('Error inserting registration:', error)
      throw error
    }

    console.log('Successfully registered user for event:', {
      userName,
      eventId,
      paymentId
    })
  } catch (error) {
    console.error('Error processing successful payment:', error)
  }
}

// This is needed to disable the automatic body parsing
// so we can access the raw body for webhook verification
export const config = {
  api: {
    bodyParser: false
  }
}
