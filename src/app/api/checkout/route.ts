// app/api/checkout/route.ts
import { stripe } from '@/lib/stripe-server'
import { NextResponse } from 'next/server'

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
        userEmail: formData.email,
        userName: formData.name,
        userDiscord: formData.discord,
      },
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: event.name,
            },
            unit_amount: event.price, // $20.00 - replace with actual event price
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/registration/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/registration/cancelled`,
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