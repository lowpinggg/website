// features/home/components/Hero/HeroBackground.tsx
'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { introVariants } from '@lib/animations'

export function HeroBackground() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="absolute top-0 inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]">
      <motion.div
        variants={introVariants.image}
        initial={{
          ...introVariants.image.initial,
          y: 0,
        }}
        animate={{
          ...introVariants.image.animate,
          y: 0,
          transition: { duration: 1, delay: 0 },
        }}
        className="absolute inset-0 rounded-[50px] overflow-hidden"
        style={{ y }}
      >
        <Image
          src="/banner-hero.png"
          alt="Lowping"
          fill
          className="object-cover hidden"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
          }}
          quality={100}
          priority
        />
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/arclight-brand.1920x1080.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-[#14FF00]/50 mix-blend-overlay" />
      </motion.div>
    </div>
  )
}
