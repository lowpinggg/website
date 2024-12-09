import { Full } from '@lowping/brand-kit'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">
          <Full width={120} color="white" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/events"
            className="text-white transition-colors hover:text-primary"
          >
            Events
          </Link>
          <Button size="lg">Contact</Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  )
}
