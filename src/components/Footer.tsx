// Footer.tsx
'use client'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import packageJson from '@/package'
import { Full } from '@lowping/brand-kit'

// Footer.tsx

// Footer.tsx

// Footer.tsx

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 justify-between items-end py-8 border-t">
      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col gap-4">
          <Full width={112} />
        </div>
        <div>
          <Badge variant={'secondary'} className="font-normal">
            {`Alpha v${packageJson.version}`}
          </Badge>
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Lowping. All rights reserved.
        </p>

        <div className="flex gap-2">
          <Link
            href="https://discord.gg/lowping"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="p-0 text-xs" size={'sm'} variant={'link'}>
              Discord
            </Button>
          </Link>
          <Link
            href="https://lowping.gg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="p-0 text-xs" size={'sm'} variant={'link'}>
              Website
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
