// HomeClient.tsx
'use client'

import { useEffect, useState } from 'react'
import { EventSection } from '@/features/events/components/EventSection'
import { AnimatePresence, motion } from 'motion/react'

import { animations, EASE } from '@/lib/animation'
import { useScrollLock } from '@/hooks/useScrollLock'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

function IntroOverlay() {
  return (
    <motion.div
      className="fixed inset-0 mix-blend-screen z-60"
      style={{ backgroundColor: '#BFF603' }}
      initial={{ height: '100vh' }}
      animate={{ height: '100vh' }}
      exit={{
        height: 0,
        transition: {
          duration: 1,
          ease: EASE
        }
      }}
    />
  )
}

export default function HomeClient() {
  const [introComplete, setIntroComplete] = useState(false)
  const [isLocked, setIsLocked] = useState(true)
  const [showOverlay, setShowOverlay] = useState(true)

  useScrollLock(isLocked)

  useEffect(() => {
    if (introComplete) {
      const timer = setTimeout(() => {
        setIsLocked(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [introComplete])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>{showOverlay && <IntroOverlay />}</AnimatePresence>
      <main className="min-h-screen  mx-auto container px-4">
        <motion.div
          variants={animations.stagger.parent}
          initial="hidden"
          animate="visible"
          style={{
            height: introComplete ? 'auto' : '100vh'
          }}
          transition={{
            height: {
              duration: 1,
              delay: 2,
              ease: [0.19, 1, 0.22, 1]
            }
          }}
        >
          <Header
            onIntroComplete={() => setIntroComplete(true)}
            showOverlay={showOverlay}
          />
        </motion.div>
        {introComplete && (
          <>
            <motion.div
              variants={animations.fadeUp}
              custom={0.2}
              initial="hidden"
              animate="visible"
            >
              <EventSection />
              <motion.div
                variants={animations.fadeUp}
                custom={1}
                initial="hidden"
                animate="visible"
              >
                <Footer />
              </motion.div>
            </motion.div>
          </>
        )}
      </main>
    </>
  )
}
