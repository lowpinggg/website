// features/registration/components/PaymentStatusClient.tsx
'use client'

import confetti from 'canvas-confetti'
import { useEffect } from 'react'
import type { PaymentStatusProps } from '@registration/types/registrations'
import { CancelledView } from './layout/PaymentStatus/CancelledView'
import { SuccessView } from './layout/PaymentStatus/SuccessView'

export function PaymentStatusClient({
  status,
  details,
  title,
  description,
}: PaymentStatusProps) {
  useEffect(() => {
    if (status === 'success') {
      const duration = 100
      const end = Date.now() + duration
      const interval = setInterval(() => {
        confetti({
          particleCount: 50,
          startVelocity: 32,
          spread: 180,
        })
        if (Date.now() > end) clearInterval(interval)
      }, 200)
      return () => clearInterval(interval)
    }
  }, [status])

  return (
    <div className="py-12 flex flex-col min-h-screen items-center justify-center">
      {status === 'success' && details ? (
        <SuccessView details={details} title={title} />
      ) : (
        <CancelledView title={title} description={description} />
      )}
    </div>
  )
}
