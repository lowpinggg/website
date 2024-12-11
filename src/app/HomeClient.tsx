// app/HomeClient.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import Tilt from 'react-parallax-tilt'

import { Database } from '@/types/generated-types'
import { animations, EASE } from '@/lib/animation'
import { Button } from '@/components/ui/button'

import { ArrowRight } from 'lucide-react'

const HOVER_TRANSITION = { ease: EASE }

type Event = Database['public']['Tables']['events']['Row']
interface HomeClientProps {
  events: Event[]
}

export default function HomeClient({ events }: HomeClientProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [buttonHeight, setButtonHeight] = useState(0)

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight)
    }
  }, [])

  return (
    <main className="min-h-screen relative">
      <div className="pattern-overlay" />
      <div className="container mx-auto px-4 py-20">
        <motion.h1
          variants={animations.fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold text-foreground mb-12"
        >
          Events
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={animations.fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1 * index}
            >
              <Tilt
                className="w-full"
                perspective={1000}
                scale={1.02}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ffffff"
                glarePosition="all"
                glareBorderRadius="11px"
                transitionSpeed={300}
                tiltAngleYInitial={0}
                tiltAngleXInitial={0}
              >
                <Link href={`/${event.id}/register`} className="block">
                  <motion.div
                    className="rounded-md relative"
                    initial="initial"
                    whileHover="hover"
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="aspect-[3/4] relative">
                      <motion.div
                        variants={{
                          initial: { y: 0 },
                          hover: { y: -buttonHeight }
                        }}
                        transition={HOVER_TRANSITION}
                        className="h-full"
                      >
                        <Image
                          src={event.poster_url || '/default-poster.png'}
                          alt={event.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 420px) 100vw, 420px"
                          priority
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      ref={buttonRef}
                      className="absolute left-0 right-0"
                      style={{ bottom: -buttonHeight }}
                      variants={{
                        initial: { y: 0 },
                        hover: { y: -buttonHeight }
                      }}
                      transition={HOVER_TRANSITION}
                    >
                      <Button className="w-full rounded-none h-12 flex gap-1">
                        <span>Inscription</span><ArrowRight size={16} />
                      </Button>
                    </motion.div>
                  </motion.div>
                </Link>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
