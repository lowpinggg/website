// Footer.tsx
'use client'

import Link from 'next/link'
import { Full } from '@lowping/brand-kit'
import packageJson from '@package'
import { Badge } from '@ui/badge'
import { Button } from '@ui/button'

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
          &copy; {new Date().getFullYear()} Lowping. Tous droits réservés.
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
              Lowping
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
