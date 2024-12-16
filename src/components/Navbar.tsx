// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { Full } from '@lowping/brand-kit'

export function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Full width={100} />
          </Link>

          {/* When you add pages, you can uncomment this */}
          {/* <div className="flex items-center gap-8">
            <Link 
              href="/events" 
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              Events
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  )
}
