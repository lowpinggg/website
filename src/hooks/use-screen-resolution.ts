import { useEffect, useState } from 'react'

interface ScreenResolution {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeScreen: boolean
  orientation?: 'portrait' | 'landscape'
}

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const

const isBrowser = typeof window !== 'undefined'

export const useScreenResolution = (): ScreenResolution => {
  const [screenResolution, setScreenResolution] = useState<ScreenResolution>(
    () => ({
      width: isBrowser ? window.innerWidth : 0,
      height: isBrowser ? window.innerHeight : 0,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isLargeScreen: false,
      orientation: isBrowser
        ? window.innerWidth > window.innerHeight
          ? 'landscape'
          : 'portrait'
        : undefined,
    }),
  )

  useEffect(() => {
    if (!isBrowser) return

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setScreenResolution({
        width,
        height,
        isMobile: width < BREAKPOINTS.sm,
        isTablet: width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg,
        isDesktop: width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl,
        isLargeScreen: width >= BREAKPOINTS.xl,
        orientation: width > height ? 'landscape' : 'portrait',
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenResolution
}
