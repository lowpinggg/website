// features/home/components/Hero/Hero.tsx
'use client'

import { HeroBackground } from '@home/components/Hero/HeroBackground'
import { HeroContent } from '@home/components/Hero/HeroContent'

export function Hero() {
  return (
    <div className="flex items-center justify-center">
      {' '}
      {/* Reduced from h-screen */}
      <div className="relative mx-4 mt-4 py-40 w-full h-full overflow-hidden flex items-center justify-center">
        <HeroBackground />
        <HeroContent />
      </div>
    </div>
  )
}
