// components/header/Header.tsx
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Full } from '@lowping/brand-kit'
import { motion, useScroll, useTransform } from 'motion/react'

import { introVariants } from '@/lib/animations'
import { useScrollLock } from '@/hooks/useScrollLock'
import { HeaderContent } from '@/components/header/HeaderContent'
import { HeaderTitle } from '@/components/header/HeaderTitle'

export function Header() {
  const [isLocked, setIsLocked] = useState(true)
  useScrollLock(isLocked)

  const { scrollYProgress } = useScroll()
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '50%'],
    { clamp: false } // This ensures smooth interpolation
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLocked(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Video Background with Circular Mask */}

      <div className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]">
        <div className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_left,black_0%,transparent_100%)]">
          <motion.div
            variants={introVariants.image}
            initial="initial"
            animate="animate"
            className="absolute inset-0"
            style={{ y }}
          >
            <Image
              src="/banner-hero.png"
              alt="Lowping"
              fill
              className="object-cover"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%'
              }}
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        {...introVariants.container}
        className="origin-center sm:origin-left z-40 container px-4 xs:px-0 mx-auto pt-32 pb-40 relative"
      >
        <div className="flex-col flex justify-center items-center sm:items-start">
          <div className="overflow-hidden">
            <motion.div
              variants={introVariants.logo}
              initial="initial"
              animate="animate"
              className="mb-8"
            >
              <Full width={180} />
            </motion.div>
          </div>
          <HeaderTitle />
          <HeaderContent />
        </div>
      </motion.div>
    </div>
  )
}
