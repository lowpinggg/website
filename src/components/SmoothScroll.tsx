// components/SmoothScroll.tsx
'use client'

import Lenis from 'lenis'

import { ReactNode, useEffect } from 'react'

// components/SmoothScroll.tsx

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return children
}
