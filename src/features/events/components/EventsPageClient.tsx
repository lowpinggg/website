// features/events/pages/EventsPage.tsx
'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { Footer } from '@components/Footer'
import { EventsContent } from '@features/events/components/EventGallery/EventsContent'
import { Header } from '@features/events/components/Header'
import { setScrollLock } from '@hooks/use-lockscroll'
import { introVariants } from '@lib/animations'

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
              <EventsContent
                showFilters={true}
                className="py-10 container mx-auto"
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
