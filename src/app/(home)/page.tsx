// app/(home)/page.tsx
'use client'

import { Footer } from '@components/Footer'
import { NavBar } from '@components/NavBar'
import { EventsSection } from '@events/components/EventsSection'
import { CardSection, Hero, TextSection } from '@home/components'

export default function Home() {
  return (
    <>
      <NavBar /> {/* NavBar handles its own container */}
      <Hero /> {/* Full width component */}
      <TextSection /> {/* Component handles its own container */}
      <CardSection /> {/* Component handles its own container */}
      <EventsSection className="border-y pt-10 pb-20" />{' '}
      {/* Component handles its own border and container */}
      <Footer /> {/* Component handles its own container */}
    </>
  )
}
