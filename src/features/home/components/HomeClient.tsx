// features/home/components/HomeClient.tsx
'use client'

import { Footer } from '@components/Footer'
import { NavBar } from '@components/NavBar'
import { useEvents } from '@events/hooks/useEvents'
import { EventsGrid } from '@features/events/components/display'
import { Banner, CardSection, Hero, TextSection } from '@home/components'

export function HomeClient() {
  const { filterEvents } = useEvents()
  const events = filterEvents('all').slice(0, 4)

  return (
    <>
      <NavBar />
      <Hero />
      <TextSection />
      <Banner />
      <CardSection />
      <section className="py-10">
        <div className="container mx-auto mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
            Nos prochains événements
          </h2>
        </div>
        <EventsGrid events={events} />
      </section>
      <Footer />
    </>
  )
}
