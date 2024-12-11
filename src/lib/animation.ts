// lib/animation.ts
export const EASE = [0.19, 1, 0.22, 1] as const

export const animations = {
  stagger: {
    parent: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delay: 0.2
        }
      }
    },
    child: {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { ease: EASE, duration: 0.8 }
      }
    }
  },
  fadeUp: {
    hidden: { y: 20, opacity: 0 },
    visible: (delay = 0) => ({
      y: 0,
      opacity: 1,
      transition: { 
        ease: EASE,
        duration: 0.8,
        delay
      }
    })
  }
}