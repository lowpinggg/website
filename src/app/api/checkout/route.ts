// app/api/checkout/route.ts
import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe-server'

export async function POST(req: Request) {
  try {
    console.log('Raw request:', req)
    const body = await req.json()
    console.log('Parsed body:', body)
    const { event, formData } = body

    console.log('Event:', event)
    console.log('FormData:', formData)

    if (!event || !formData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      metadata: {
        eventId: event.id,
        eventName: event.name,
        userName: formData.name,
        userEmail: formData.email,
        userDiscord: formData.discord,
        userRiotId: formData.riotId,
        userRank: formData.rank
      },
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: event.name
            },
            unit_amount: event.price
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/registration/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/registration/cancelled?session_id={CHECKOUT_SESSION_ID}`
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Detailed error:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}
