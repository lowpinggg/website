// features/registration/actions/checkout.ts
import { headers } from 'next/headers'
import { Database } from '@generated/index'
import { stripe } from '@lib/services/stripe/stripe-server'
import { FormData } from '@registration/types/forms'

type Event = Database['public']['Tables']['events']['Row']

export async function handleCheckout(event: Event, formData: FormData) {
  // Await the headers
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: event.name,
              description: `Registration for ${event.name}`,
            },
            unit_amount: event.price * 100, // Price in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/events/registration/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/events/registration/cancelled`,
      metadata: {
        event_id: event.id,
        registration_data: JSON.stringify(formData),
      },
    })

    if (!session?.id) {
      throw new Error('No session ID returned from Stripe')
    }

    return { sessionId: session.id }
  } catch (error) {
    console.error('Checkout error:', error)
    throw error
  }
}
