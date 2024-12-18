// Footer.tsx
'use client'

import Link from 'next/link'
import { Full } from '@lowping/brand-kit'
import { Badge } from '@/components/ui/badge'

export function Footer() {
  return (
    <footer className="w-full md:container mx-auto">
      <div className="mx-auto px-4 sm:px-0 flex flex-col gap-4 justify-between items-end py-8 border-t">
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-4">
            <Full width={100} />
          </div>
          <div>
            <Badge variant={'secondary'} className="font-normal">
              alpha 0.01
            </Badge>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Lowping. All rights reserved.
          </p>

          <div className="flex gap-2 text-xs">
            <Link
              href="https://discord.gg/lowping"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </Link>
            <Link
              href="https://lowping.gg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
