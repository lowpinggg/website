// features/home/components/Hero/HeroBackground.tsx
'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { introVariants } from '@lib/animations'

// features/home/components/Hero/HeroBackground.tsx

// features/home/components/Hero/HeroBackground.tsx

// features/home/components/Hero/HeroBackground.tsx

// features/home/components/Hero/HeroBackground.tsx

// features/home/components/Hero/HeroBackground.tsx

// features/home/components/Hero/HeroBackground.tsx

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', '50% start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 mx-auto [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]"
    >
      <motion.div
        variants={introVariants.background}
        initial="initial"
        animate="animate"
        style={{ y }}
      >
        <video
          className="h-screen w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/arclight-brand.1920x1080-web.webm"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-[#14FF00]/50 mix-blend-overlay" />
      </motion.div>
    </motion.div>
  )
}
