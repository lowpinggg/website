'use client'

// TODO: Animation on the events section is WIP and should be extracted to a separate component
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Footer } from '@components/Footer'
import { NavBar } from '@components/NavBar'
import { EventsContent } from '@features/events/components/EventGallery/EventsContent'
import { Banner } from './Banner'
import { CallToActions } from './CallToActions'
import { CardSection } from './CardSection'
import { Hero } from './Hero'
import { TextSection } from './TextSection'

function AnimatedEventsSection() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])

  return (
    <motion.div ref={sectionRef} style={{ opacity, y }} className="relative">
      <EventsContent
        title="Nos prochains événements"
        showCTA={true}
        limitEvents={4}
        className="container mx-auto py-24"
      />
    </motion.div>
  )
}

export function HomeClient() {
  return (
    <>
      <NavBar />
      <Hero />
      <TextSection />
      <Banner />
      <CardSection />
      <AnimatedEventsSection />
      <CallToActions />
      <Footer />
    </>
  )
}
