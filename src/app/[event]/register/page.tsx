// app/[event]/register/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { metadata as defaultMetadata } from '@/app/layout'
import { RegistrationClient } from '@/features/registration/components/RegistrationClient'
import { formRegistry } from '@/features/registration/types/forms'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/generated-types'

type Event = Database['public']['Tables']['events']['Row'] & {
  type: keyof typeof formRegistry
}

type Props = {
  params: Promise<{ event: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const e = await params
    const { data: event } = await supabase
      .from('events')
      .select('*')
      .eq('slug', e.event)
      .single()

    if (event) {
      return {
        title: `${event.name} - Lowping`,
        description: 'Inscrivez-vous à cet événement dès maintenant!',
      }
    }
  } catch (error) {
    console.error('Error fetching event metadata:', error)
  }

  return defaultMetadata
}

export default async function RegistrationPage({ params }: Props) {
  const e = await params
  if (!e) {
    return notFound()
  }

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', e.event)
    .single()

  if (error || !event) {
    return notFound()
  }

  if (!event.type || !(event.type in formRegistry)) {
    console.error(`Invalid or missing form type for event: ${event.id}`)
    return notFound()
  }

  return (
    <main className="container">
      <RegistrationClient event={event as Event} />
    </main>
  )
}

export async function generateStaticParams() {
  const { data: events } = await supabase.from('events').select('id')
  return (
    events?.map((event) => ({
      event: event.id,
    })) || []
  )
}
