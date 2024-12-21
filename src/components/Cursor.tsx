'use client'
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import MouseFollower from 'mouse-follower'
import 'mouse-follower/dist/mouse-follower.min.css'

export function Cursor() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const initCursor = () => {
      MouseFollower.registerGSAP(gsap)
      const cursor = new MouseFollower({
        container: document.body,
        speed: 0.1,
        ease: 'expo.Out',
        hideOnLeave: true,
        overwrite: true,
        stateDetection: {
          '-active': '.cursor-active, button, a, img',
          '-blend': '.cursor-blend, button',
          '-border': '.cursor-border'
        }
      })

      return cursor
    }

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const cursor = initCursor()
      return () => cursor.destroy()
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [isMounted])

  return null
}