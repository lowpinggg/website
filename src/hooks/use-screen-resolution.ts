// hooks/use-screen-resolution.ts
import { useEffect, useState } from 'react'

interface ScreenResolution {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isLaptop: boolean
  isDesktop: boolean
  isLargeScreen: boolean
}

export const useScreenResolution = (): ScreenResolution => {
  const [screenResolution, setScreenResolution] = useState<ScreenResolution>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isLargeScreen: false,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const width = window.innerWidth

      setScreenResolution({
        width,
        height: window.innerHeight,
        isMobile: width >= 320 && width <= 600,
        isTablet: width >= 601 && width <= 1024,
        isLaptop: width >= 1025 && width <= 1280,
        isDesktop: width >= 1281 && width <= 1440,
        isLargeScreen: width > 1440,
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenResolution
}
