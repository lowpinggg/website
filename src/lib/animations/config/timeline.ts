// lib/animations/config/timeline.ts
import { transitions } from './transitions'

const { easing, duration } = transitions

const introDuration = 3

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
    navigation: {
      logo: {
        duration: duration.superSlow,
        delay: introDuration + 1,
        ease: easing.expo,
      },
      navLinks: {
        container: {
          duration: duration.superSlow,
          staggerDelay: 0.2,
          delay: introDuration + 1,
          ease: easing.expo,
        },
        item: {
          duration: duration.superSlow,
          ease: easing.expo,
        },
      },
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
    },
    content: {
      container: {
        height: {
          duration: duration.superSlow,
          delay: introDuration,
          ease: easing.expo,
        },
      },
      text: {
        duration: duration.superSlow,
        delay: introDuration + 1,
        ease: easing.expo,
      },
      button: {
        duration: duration.superSlow,
        delay: introDuration + 1.5,
        ease: easing.expo,
      },
    },
  },
} as const

type TimelineConfig = typeof timeline

export type { TimelineConfig }
