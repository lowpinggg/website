// src/app/[event]/register/page.tsx
import RegisterForm from '@/components/RegisterForm'
import { events } from '@/data/events'
import { notFound } from 'next/navigation'

export default async function RegisterPage({
  params: eventParams
}: {
  params: Promise<{ event: string }>
}) {
  const params = await eventParams
  const event = events.find(e => e.id === params.event)
  if (!event) return notFound()

  return (
    <main className="container py-10">
      <div className="pattern-overlay" />
      <h1 className="text-4xl font-bold mb-8">{event.name} Registration</h1>
      <RegisterForm event={event} />
    </main>
  )
}