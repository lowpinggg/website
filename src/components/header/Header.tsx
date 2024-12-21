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
    ['0%', '30%'],
    { clamp: false }
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLocked(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      animate="animate"
      initial="initial"
      variants={introVariants.container}
      className="relative w-full origin-left">
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
              quality={100}
              priority
            />
          </motion.div>
        </div>
      </div>
      <section className="container">
        <div className="origin-center sm:origin-left z-40 pt-24 pb-28 sm:pt-32 sm:pb-40 relative">
          <div className="overflow-hidden">
            <motion.div
              variants={introVariants.logo}
              initial="initial"
              animate="animate"
              className="mb-8 flex justify-center xs:justify-start"
            >
              <Full width={180} />
            </motion.div>
          </div>
          <HeaderTitle />
          <HeaderContent />
        </div>
      </section>
    </motion.div>
  )
}