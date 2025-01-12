// features/events/pages/EventsPage.tsx
'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Footer } from '@components/Footer'
import { EventsContent } from '@features/events/components/EventGallery/EventsContent'
import { Header } from '@features/events/components/Header'
import { setScrollLock } from '@hooks/use-lockscroll'
import { introVariants } from '@lib/animations'
import { EventFilters } from './EventGallery/EventFilters'
import { FilterType } from '../types'
import { useEvents } from '../hooks/useEvents'
function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-30"
      style={{ backgroundColor: '#BFF603' }}
      variants={introVariants.overlay}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onComplete}
    />
  )
}

export function EventsPageClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const { filterEvents } = useEvents()

  useEffect(() => {
    setScrollLock(true)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        <IntroOverlay
          key="overlay"
          onComplete={() => setScrollLock(false, 600)}
        />
      </AnimatePresence>
      <main>
        <div className="relative z-30">
          <Header />
          <section className="container">
            <motion.div
              key="events"
              variants={introVariants.events}
              initial="initial"
              animate="animate"
              className="overflow-hidden pb-24"
            >
              <div className="flex w-full flex-col justify-between gap-4 xs:flex-row sm:items-center">
                <h1 className="text-2xl font-bold text-foreground sm:text-4xl">
                  Événements
                </h1>
                <EventFilters
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                />
              </div>
              <EventsContent
                events={filterEvents(activeFilter)}
                className="container mx-auto py-10"
              />
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              variants={introVariants.footer}
            >
              <Footer />
            </motion.div>
          </section>
        </div>
      </main>
    </>
  )
}
