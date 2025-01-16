// NavBar.tsx
'use client'

// TODO: Better animation
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { Full } from '@lowping/brand-kit'

// NavBar.tsx

export function NavBar() {
  return (
    <nav className="absolute left-0 right-0 top-12 z-30">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Full width={160} />
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-1">
              <NavLink href="/tournaments">Règlement</NavLink>
              <NavLink href="/contact">Contacter</NavLink>
            </div>
            <Button variant="default">
              <Link href="/events" className="flex items-center gap-2">
                <Calendar />
                Évenements
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="p-2 md:hidden">
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <Link href={href}>
    <Button
      variant="ghost"
      className="group relative text-sm font-normal text-white/90 transition-colors hover:bg-white/20 hover:text-white hover:backdrop-blur-sm"
    >
      {children}
    </Button>
  </Link>
)

export default NavBar
