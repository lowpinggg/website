'use client'

import { Footer } from '@components/Footer'
import { NavBar } from '@components/NavBar'
import { EventsSection } from '@events/components/EventsSection'
import { Banner, CardSection, Hero, TextSection } from '@home/components'

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <TextSection />
      <Banner />
      <CardSection />
      <EventsSection className="pb-20 pt-10" />
      <Footer />
    </>
  )
}
