// app/[event]/register/page.tsx (Server Component)
import { RegisterClient } from '@/app/[event]/register/client'
import { events } from '@/data/events'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ event: string }>
}

export default async function RegisterPage(props: Props) {
  const { event: eventId } = await props.params
  const event = events.find((e) => e.id === eventId)

  if (!event) {
    return notFound()
  }

  return <RegisterClient event={event} />
}