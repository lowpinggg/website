// app/api/webhook/route.ts
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe-server'
import Stripe from 'stripe'

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
      { error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}` },
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
  // Get the metadata from the session
  const { eventId, userEmail, userName, userDiscord } = session.metadata || {}

  if (!eventId || !userEmail || !userName || !userDiscord) {
    console.error('Missing metadata in Stripe session')
    return
  }

  try {
    // TODO: Add your database logic here
    // Example:
    // await prisma.registration.create({
    //   data: {
    //     eventId,
    //     userEmail,
    //     userName,
    //     userDiscord,
    //     paymentId: session.id,
    //     amount: session.amount_total,
    //     status: 'completed'
    //   }
    // })

    // TODO: Send confirmation email
    // Example:
    // await sendConfirmationEmail({
    //   to: userEmail,
    //   eventId,
    //   userName
    // })

  } catch (error) {
    console.error('Error processing successful payment:', error)
    // You might want to notify your error tracking service here
  }
}

// This is needed to disable the automatic body parsing
// so we can access the raw body for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
}