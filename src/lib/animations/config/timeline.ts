// lib/animations/config/timeline.ts
import { transitions } from './transitions'

const { easing, duration } = transitions

const introDuration = 3.5

// lib/animations/config/timeline.ts
export const timeline = {
  intro: {
    overlay: {
      duration: duration.superSlow,
      delay: introDuration,
      ease: easing.expo,
    },
    background: {
      duration: duration.superSlow,
      delay: introDuration + 0.5,
      ease: easing.expo,
    },
    logo: {
      duration: duration.superSlow,
      showDelay: 0,
      hideDelay: 0.9,
      ease: easing.expo,
    },
    title: {
      height: {
        duration: duration.superSlow,
        delay: 1.8,
        ease: easing.expo,
      },
      y: {
        duration: duration.superSlow,
        delay: 1.2,
        ease: easing.expo,
      },
      clipPath: {
        duration: 0.7,
        delay: 3.5,
        ease: easing.smooth,
      },
    },
    content: {
      container: {
        height: {
          duration: duration.superSlow,
          delay: introDuration,
          ease: easing.expo,
        },
        y: {
          duration: duration.superSlow,
          delay: introDuration + 0.5,
          ease: easing.expo,
        },
      },
      button: {
        duration: duration.superSlow,
        delay: introDuration + 0.5,
        ease: easing.expo,
      },
    },
  },
} as const

type TimelineConfig = typeof timeline

export type { TimelineConfig }
