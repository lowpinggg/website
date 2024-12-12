// app/HomeClient.tsx
'use client'
import { Database } from '@/types/generated-types'
import { EventSection } from '@/features/events/components/EventSection'

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