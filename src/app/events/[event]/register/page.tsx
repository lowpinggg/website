// app/[event]/register/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { generateMetadata as baseGenerateMetadata } from '@app/metadata'
import { getEventBySlug } from '@events/api/getEvents'
import { RegistrationPageClient } from '@features/registration/components/RegistrationPageClient'
import type { Database } from '@generated/index'
import { formRegistry } from '@registration/types/forms'

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
  })
}

export default async function RegistrationPage({ params }: Props) {
  const { event: slug } = await params
  const { data: event } = await getEventBySlug(slug)

  if (!event || !event.type || !(event.type in formRegistry)) notFound()

  return (
    <main className="container">
      <RegistrationPageClient event={event as Event} />
    </main>
  )
}
