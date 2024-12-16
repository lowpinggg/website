// features/registration/actions/checkout.ts
import { FormData } from '../types/forms'
import { Database } from '@/types/generated-types'
import { stripe } from '@/lib/stripe/stripe-server'

type Event = Database['public']['Tables']['events']['Row']

export async function handleCheckout(event: Event, formData: FormData) {
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
              description: `Registration for ${event.name}`
            },
            unit_amount: event.price // Price in cents
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/registration/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/registration/cancelled`,
      metadata: {
        event_id: event.id,
        registration_data: JSON.stringify(formData)
      }
    })

    return { sessionId: session.id }
  } catch (error) {
    console.error('Checkout error:', error)
    throw error
  }
}