// Footer.tsx
'use client'

import Link from 'next/link';
import { Full } from '@lowping/brand-kit';

export function Footer() {
  return (
    <footer>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-end py-8 border-t">
        <div className='flex flex-col gap-4'>
          <Full width={100} />
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Lowping. All rights reserved.</p>
        </div>
        <div className="flex gap-2 text-xs">
          <Link href="https://discord.gg/lowping" target="_blank" rel="noopener noreferrer">
            Discord
          </Link>
          <Link href="https://lowping.gg" target="_blank" rel="noopener noreferrer">
            Website
          </Link>
        </div>
      </div>
    </footer>
  );
}
