// features/home/components/HomeClient.tsx
'use client'

import { Footer } from '@components/Footer'
import { NavBar } from '@components/NavBar'
import { EventsContent } from '@features/events/components/layout/EventsContent'
import { Banner, CardSection, Hero, TextSection } from '@home/components'

export function HomeClient() {
  return (
    <>
      <NavBar />
      <Hero />
      <TextSection />
      <Banner />
      <CardSection />
      <EventsContent
        title="Nos prochains événements"
        showCTA={true}
        limitEvents={4}
        className="py-10 container mx-auto"
      />
      <Footer />
    </>
  )
}
