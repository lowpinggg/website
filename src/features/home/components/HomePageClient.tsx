'use client'

import { Footer } from '@components/Footer'
import { NavBar } from '@components/NavBar'
import { Banner } from './Banner'
import { CardSection } from './CardSection'
import { ContactSection } from './ContactSection'
import { EventShowcase } from './EventShowcase'
import { Hero } from './Hero'
import { TextSection } from './TextSection'

export function HomeClient() {
  return (
    <>
      <NavBar />
      <Hero />
      <TextSection />
      <Banner />
      <CardSection />
      <EventShowcase />
      <ContactSection />
      <Footer />
    </>
  )
}
