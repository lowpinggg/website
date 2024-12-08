'use client'
import { Header } from "@/components/Header"
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'

function IntroOverlay() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showIntro && (
        <motion.div 
          className='fixed top-0 left-0 bg-primary z-[9999] w-full'
          initial={{ height: '100vh' }}
          animate={{ height: '100vh' }}
          exit={{ 
            height: 0,
            transition: {
              duration: 1,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        />
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <>
      <IntroOverlay />
        <Header />
        <section className="h-screen">test</section>
    </>
  )
}