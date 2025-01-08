// features/home/components/Hero/HeroContent.tsx
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@ui/button'

export function HeroContent() {
  return (
    <div className="container relative">
      <div className="flex flex-col gap-8 max-w-4xl justify-center">
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden">
            <h1 className="text-8xl font-black tracking-[0.64px] leading-[85%]">
              TOURNOIS ESPORT SANS FRICTION
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="text-base font-light text-foreground/80 tracking-tight leading-6 max-w-2xl">
              La première plateforme dédiée à lorganisation pro de vos tournois.
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
                <Calendar />
                Évenements
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="/contact">Contacter</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
