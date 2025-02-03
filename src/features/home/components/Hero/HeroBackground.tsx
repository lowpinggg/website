// features/home/components/Hero/HeroBackground.tsx
'use client'

import { useRef } from 'react'
import { useScreenResolution } from '@hooks/use-screen-resolution'
import { introVariants } from '@lib/animations'
import { cn } from '@lib/utils'
import { motion, useScroll, useTransform } from 'motion/react'

export function HeroBackground() {
  const { isMobile, isTablet } = useScreenResolution()

  const smallResolution = isMobile || isTablet
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const paddingX = useTransform(
    scrollYProgress,
    [0, 0.5],
    smallResolution ? ['12px', '0px'] : ['16px', '0px'],
  )

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 mx-auto pt-3 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] lg:pt-4"
      style={{ paddingLeft: paddingX, paddingRight: paddingX }}
    >
      <motion.div
        variants={introVariants.background}
        initial="initial"
        animate="animate"
        className={cn(
          'overflow-hidden rounded-[2rem]',
          isMobile && 'rounded-3xl',
        )}
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
