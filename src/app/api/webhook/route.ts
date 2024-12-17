// app/api/webhook/route.ts
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { handleWebhook } from '@/features/registration/actions/webhook'

import { stripe } from '@/lib/stripe/stripe-server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    // Construct the Stripe event
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    const result = await handleWebhook(stripeEvent, body, signature)
    return NextResponse.json(result)
  } catch (error) {
    console.error(
      'Webhook error:',
      error instanceof Error ? error.message : 'Unknown Error'
    )
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 })
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}
