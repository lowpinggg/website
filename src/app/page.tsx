// app/page.tsx
'use client'
import { EventSection } from '@/features/events/components/EventSection'
import { AnimatePresence, motion } from 'motion/react'
import { useScrollLock } from '@/hooks/useScrollLock'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/header/Header'
import { introVariants } from '@/lib/animations/variants'
import { useState } from 'react'

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 mix-blend-screen z-60"
      style={{ backgroundColor: '#BFF603' }}
      variants={introVariants.overlay}
      initial="initial"
      animate="animate"
      exit="exit" 
      onAnimationComplete={() => {
        onComplete()
      }}
    />
  )
}

export default function Page() {
  const [isLocked, setIsLocked] = useState(true)
  useScrollLock(isLocked)

  return (
    <>
      <AnimatePresence mode="wait">
        <IntroOverlay key="overlay" onComplete={()=> {setIsLocked(false)}} />
      </AnimatePresence>
      <main className="min-h-screen mx-auto container px-4">
        <motion.div
          className="relative z-10"
          initial="hidden"
          animate="visible"
          variants={introVariants.container}
        >
          <Header />
          <motion.div variants={introVariants.events}>
            <EventSection />
          </motion.div>
          <motion.div variants={introVariants.footer}>
            <Footer />
          </motion.div>
        </motion.div>
      </main>
    </>
  )
}