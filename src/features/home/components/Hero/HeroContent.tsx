// features/home/components/Hero/HeroContent.tsx
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { Discord } from '@components/icons'
import { Button } from '@ui/button'

export function HeroContent() {
  return (
    <div className="container relative">
      <div className="flex max-w-4xl flex-col justify-center gap-8">
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden">
            <h1 className="text-8xl font-black leading-[85%] tracking-[0.64px]">
              TOURNOIS ESPORT SANS FRICTION
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="max-w-2xl text-base font-light leading-6 tracking-tight text-foreground/80">
              La première plateforme dédiée à lorganisation pro de vos tournois.
            </p>
            <p className="max-w-2xl text-base font-light leading-6 tracking-tight text-foreground/80">
              Matchmaking équitable, gestion simplifiée - concentrez-vous
              uniquement sur le jeu.
            </p>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-2">
            <Button
              variant="default"
              size="lg"
              className="px-6  mix-blend-screen"
            >
              <Link href="/events" className="flex items-center gap-2">
                <Calendar />
                Évenements
              </Link>
            </Button>
            <Button
              size="lg"
              className="bg-white px-6 text-background mix-blend-screen hover:bg-white/80"
            >
              Discord
              <Discord className="text-[#000000]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
