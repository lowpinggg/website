// app/HomeClient.tsx
'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Database } from '@/types/generated-types'
import { animations } from '@/lib/animation'

type Event = Database['public']['Tables']['events']['Row']

interface HomeClientProps {
  events: Event[]
}

export default function HomeClient({ events }: HomeClientProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={animations.fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1 * index}
            >
              <Link
                href={`/${event.id}/register`}
                target='_blank'
                className="block"
              >
                <div className="bg-card rounded-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                  <div className="poster relative aspect-[3/4] w-full">
                    <Image
                      src={event.poster_url || '/default-poster.png'}
                      alt={event.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-card-foreground mb-4">{event.name}</h2>
                    <p className="text-muted-foreground mb-2">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-primary mb-6 font-semibold">
                      ${event.price}
                    </p>
                    <Button className="w-full">Register</Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}