'use client'
import { motion } from 'motion/react'
import { Database } from '@/types/generated-types'
import { animations } from '@/lib/animation'
import { Poster } from '@/features/registration/components/Poster'

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={animations.fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1 * index}
            >
              <Poster
                imageUrl={event.poster_url || '/default-poster.png'}
                altText={event.name}
                size="md"
                hoverCTA={{
                  link: `/${event.id}/register`,
                  text: 'Inscription'
                }}
                tiltProps={{
                  tiltMaxAngleX: 4,
                  tiltMaxAngleY: 4,
                  glareMaxOpacity: 0.15,
                  transitionSpeed: 400,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}