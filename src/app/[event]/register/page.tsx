// app/[event]/register/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMetadata as baseGenerateMetadata } from '@/app/metadata'
import { getEventBySlug } from '@/features/events/api/getEvents'
import { RegistrationClient } from '@/features/registration/components/RegistrationClient'
import { formRegistry } from '@/features/registration/types/forms'
import type { Database } from '@/types/generated-types'

type Event = Database['public']['Tables']['events']['Row'] & {
  type: keyof typeof formRegistry
}

type Props = {
  params: Promise<{ event: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event: slug } = await params
  const { data: event } = await getEventBySlug(slug)

  if (!event) notFound()

  return baseGenerateMetadata({
    title: event.name,
    description: `Inscrivez-vous à ${event.name} dès maintenant!`,
    path: `/${slug}/register`,
  })
}

export default async function RegistrationPage({ params }: Props) {
  const { event: slug } = await params
  const { data: event } = await getEventBySlug(slug)

  if (!event || !event.type || !(event.type in formRegistry)) notFound()

  return (
    <main className="container">
      <RegistrationClient event={event as Event} />
    </main>
  )
}
