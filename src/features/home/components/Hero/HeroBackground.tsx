// features/home/components/Hero/HeroBackground.tsx
'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { introVariants } from '@lib/animations'

// features/home/components/Hero/HeroBackground.tsx

export function HeroBackground() {
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="absolute inset-0 top-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]">
      <motion.div
        variants={introVariants.background}
        initial="initial"
        animate="animate"
        className="absolute inset-0 overflow-hidden rounded-[50px]"
        style={{ y }}
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          style={{
            objectPosition: 'top',
          }}
        >
          <source src="/arclight-brand.1920x1080.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-[#14FF00]/50 mix-blend-overlay" />
      </motion.div>
    </div>
  )
}
