// app/api/checkout/route.ts
import { handleCheckout } from '@/features/registration/actions/checkout'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { event, formData } = await request.json()
    const result = await handleCheckout(event, formData)
    return NextResponse.json(result)
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: 'Checkout failed' },
      { status: 500 }
    )
  }
}