// hooks/useScrollLock.ts
import { useEffect } from 'react'

export const useScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (lock) {
      const scrollPosition = window.scrollY

      const styles = {
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        width: '100%',
        top: `-${scrollPosition}px`,
        left: '0'
      }

      Object.assign(document.documentElement.style, styles)
      Object.assign(document.body.style, styles)

      const preventDefault = (e: TouchEvent) => e.preventDefault()
      document.addEventListener('touchmove', preventDefault, { passive: false })

      const preventWheel = (e: WheelEvent) => e.preventDefault()
      document.addEventListener('wheel', preventWheel, { passive: false })

      return () => {
        const resetStyles = {
          overflow: '',
          height: '',
          position: '',
          width: '',
          top: '',
          left: ''
        }

        Object.assign(document.documentElement.style, resetStyles)
        Object.assign(document.body.style, resetStyles)

        window.scrollTo(0, scrollPosition)

        document.removeEventListener('touchmove', preventDefault)
        document.removeEventListener('wheel', preventWheel)
      }
    }
  }, [lock])
}