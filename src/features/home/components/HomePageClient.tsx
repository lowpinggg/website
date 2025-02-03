'use client'

import { Footer } from '@components/Footer'
import { NavigationMenu } from '@components/navigation/NavigationMenu'
import { Banner } from './Banner'
import { CardSection } from './CardSection'
import { ContactSection } from './ContactSection'
import { EventShowcase } from './EventShowcase'
import { Hero } from './Hero'
import { TextSection } from './TextSection'

export function HomeClient() {
  return (
    <>
      <NavigationMenu />
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
