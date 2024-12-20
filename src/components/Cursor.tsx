'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import MouseFollower from 'mouse-follower'

import 'mouse-follower/dist/mouse-follower.min.css'

export function Cursor() {
  useEffect(() => {
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
    return () => cursor.destroy()
  }, [])
  return null
}
