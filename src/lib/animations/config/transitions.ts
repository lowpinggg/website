// lib/animations/config/transitions.ts
export const TRANSITIONS = {
  ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
  easeOutExpo: [0.77, 0, 0.175, 1] as [number, number, number, number],
  duration: {
    short: 0.4,
    medium: 0.6,
    long: 1.0,
  },
  delay: {
    none: 0,
    short: 0.2,
    medium: 0.5,
    long: 1,
  },
  stagger: {
    short: 0.1,
    medium: 0.2,
  }
} as const

export type Ease = typeof TRANSITIONS.ease
export type Duration = typeof TRANSITIONS.duration[keyof typeof TRANSITIONS.duration]
export type Delay = typeof TRANSITIONS.delay[keyof typeof TRANSITIONS.delay]