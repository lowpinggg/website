// HomeClient.tsx
'use client'

import { motion, AnimatePresence } from 'motion/react';
import { Header } from '@/components/Header';
import { EventSection } from '@/features/events/components/EventSection';
import { Footer } from '@/components/Footer'; // Import Footer
import { useState, useEffect } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import { animations, EASE } from '@/lib/animation';

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
          ease: EASE,
        },
      }}
    />
  );
}

export default function HomeClient() {
  const [introComplete, setIntroComplete] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  useScrollLock(isLocked);

  useEffect(() => {
    if (introComplete) {
      const timer = setTimeout(() => {
        setIsLocked(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [introComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{showOverlay && <IntroOverlay />}</AnimatePresence>
      <main className="min-h-screen  mx-auto container">
        <motion.div
          variants={animations.stagger.parent}
          initial="hidden"
          animate="visible"
          style={{
            height: introComplete ? 'auto' : '100vh',
          }}
          transition={{
            height: {
              duration: 1,
              delay: 2,
              ease: [0.19, 1, 0.22, 1],
            },
          }}
        >
          <Header
            onIntroComplete={() => setIntroComplete(true)}
            showOverlay={showOverlay}
            introComplete={introComplete}
          />
        </motion.div>
        {introComplete && (
          <>
            <motion.div
              variants={animations.fadeUp}
              custom={0.4}
              initial="hidden"
              animate="visible"
            >
              <EventSection />
            <Footer /> 

            </motion.div>
          </>
        )}
      </main>
    </>
  );
}
