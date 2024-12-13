// app/HomeClient.tsx
'use client'

import { EventSection } from '@/features/events/components/EventSection'

import { Database } from '@/types/generated-types'

type Event = Database['public']['Tables']['events']['Row']

interface HomeClientProps {
  events: Event[]
}

export default function HomeClient({ events }: HomeClientProps) {
  return (
    <main className="min-h-screen">
      <EventSection />
      {/* Add other sections here */}
    </main>
  )
}
