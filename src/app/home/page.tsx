// page.tsx
'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@components/NavBar'
import { introVariants } from '@lib/animations'
import { Button } from '@ui/button'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center h-screen pt-16">
        {' '}
        {/* Added pt-16 for navbar spacing */}
        <div className="relative container h-full overflow-hidden flex items-center justify-center">
          <div className="absolute top-0 inset-0 [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]">
            <motion.div
              variants={introVariants.image}
              initial="initial"
              animate={{
                ...introVariants.image.animate,
                transition: { duration: 2, delay: 0 },
              }}
              className="absolute inset-0 rounded-[24px] overflow-hidden"
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
          <div className="container relative px-12 -mt-24">
            <div className="flex flex-col gap-8 max-w-4xl justify-center">
              <div className="flex flex-col gap-2">
                <div className="overflow-hidden">
                  <h1 className="text-8xl font-black tracking-[0.64px] leading-[85%]">
                    TOURNOIS ESPORT SANS FRICTION
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <p className="text-base font-light text-foreground/80 tracking-tight leading-6 max-w-2xl">
                    La première plateforme dédiée à lorganisation pro de vos
                    tournois.
                  </p>
                  <p className="text-base font-light text-foreground/80 tracking-tight leading-6 max-w-2xl">
                    Matchmaking équitable, gestion simplifiée - concentrez-vous
                    uniquement sur le jeu.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="flex gap-2">
                  <Button variant="default">
                    <Link href="/events" className="flex items-center gap-2">
                      <Image
                        width={14}
                        height={16}
                        alt="Vector"
                        src="https://c.animaapp.com/0rdaoruW/img/vector.svg"
                      />
                      Évenements
                    </Link>
                  </Button>
                  <Button variant="secondary">
                    <Link href="/contact">Contacter</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen bg-background"></div>
    </>
  )
}
