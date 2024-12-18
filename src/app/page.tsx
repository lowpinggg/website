// app/page.tsx
'use client'

import { useState } from 'react'
import { EventSection } from '@/features/events/components/EventSection'
import { AnimatePresence, motion } from 'motion/react'

import { introVariants } from '@/lib/animations'
import { useScrollLock } from '@/hooks/useScrollLock'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  window.scrollTo(0, 0)
  return (
    <motion.div
      className="fixed inset-0 z-30" // Middle layer
      style={{ backgroundColor: '#BFF603' }}
      variants={introVariants.overlay}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onComplete}
    />
  )
}

export default function Page() {
  const [isLocked, setIsLocked] = useState(true)
  useScrollLock(isLocked)
  return (
    <>
      <AnimatePresence mode="wait">
        <IntroOverlay key="overlay" onComplete={() => setIsLocked(false)} />
      </AnimatePresence>
      <main className="min-h-screen mx-auto">
        <motion.div
          className="relative z-30" // Top layer
          initial="hidden"
          animate="visible"
          variants={introVariants.container}
        >
          <Header />
          <motion.div
            variants={introVariants.events}
            initial="initial"
            animate="animate"
            className="overflow-hidden"
          >
            <EventSection />
          </motion.div>
          <motion.div
            initial="initial"
            animate="animate"
            variants={introVariants.footer}
          >
            <Footer />
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}
