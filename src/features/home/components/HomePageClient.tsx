'use client'

import { Footer } from '@components/Footer'
import { NavBar } from '@components/NavBar'
import { Banner } from './Banner'
import { CallToActions } from './CallToActions'
import { CardSection } from './CardSection'
import { Hero } from './Hero'
import { TextSection } from './TextSection'
import { EventShowcase } from './EventShowcase'

export function HomeClient() {
  return (
    <>
      <NavBar />
      <Hero />
      <TextSection />
      <Banner />
      <CardSection />
      <EventShowcase />
      <CallToActions />
      <Footer />
    </>
  )
}
