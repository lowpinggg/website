import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-[64px] font-bold tracking-[0.01em] text-white">
            Tournois Esport Sans Friction
          </h1>
          <p className="mb-8 text-xl text-white/80">
            {
              "Lowping est une plateforme de tournois professionnels pour les joueurs et les organisateurs d'événements."
            }
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/events">Événements</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/contact">Contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
