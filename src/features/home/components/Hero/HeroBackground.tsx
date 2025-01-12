// features/home/components/Hero/HeroBackground.tsx
'use client'

import { motion, useScroll, useTransform } from 'motion/react'

// features/home/components/Hero/HeroBackground.tsx

export function HeroBackground() {
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="absolute inset-0 top-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
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
