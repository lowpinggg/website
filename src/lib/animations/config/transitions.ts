// lib/animations/config/transitions.ts
export const transitions = {
  // Easing curves
  easing: {
    default: [0.77, 0, 0.175, 1],
    expo: [0.19, 1, 0.22, 1],
    elastic: [0.64, 0.57, 0.67, 1.53],
    bounce: [0.87, 0, 0.13, 1],
    smooth: [0.4, 0, 0.2, 1],
    snappy: [0.16, 1, 0.3, 1],
    decelerate: [0, 0.55, 0.45, 1],
    accelerate: [0.4, 0, 1, 1],
    linear: [0.4, 0, 0.2, 1],
  },

  // Duration presets
  duration: {
    instant: 0.1,
    fastest: 0.2,
    fast: 0.3,
    normal: 0.4,
    medium: 0.6,
    slow: 0.8,
    slower: 1.0,
    slowest: 1.5,
    superSlow: 2.0,
  },

  // Delay presets
  delay: {
    none: 0,
    minimal: 0.1,
    short: 0.2,
    medium: 0.5,
    long: 0.8,
    longer: 1.0,
    longest: 1.5,
    massive: 2.0,
  },

  // Stagger presets
  stagger: {
    minimal: 0.03,
    tight: 0.05,
    short: 0.1,
    normal: 0.15,
    medium: 0.2,
    relaxed: 0.3,
    loose: 0.4,
  },

  // Spring physics presets
  spring: {
    gentle: {
      stiffness: 100,
      damping: 20,
    },
    bouncy: {
      stiffness: 400,
      damping: 8,
    },
    slow: {
      stiffness: 50,
      damping: 15,
    },
    quick: {
      stiffness: 800,
      damping: 35,
    },
  },

  // Common animation presets
  presets: {
    fadeIn: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
    slideUp: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
    scaleUp: {
      duration: 0.5,
      ease: [0.77, 0, 0.175, 1],
    },
    popIn: {
      duration: 0.4,
      ease: [0.64, 0.57, 0.67, 1.53],
    },
    mouseHover: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
} as const

// Type definitions for better TypeScript support
type EaseType = typeof transitions.easing
type DurationType = typeof transitions.duration
type DelayType = typeof transitions.delay
type StaggerType = typeof transitions.stagger
type SpringType = typeof transitions.spring
type PresetType = typeof transitions.presets

export type {
  EaseType,
  DurationType,
  DelayType,
  StaggerType,
  SpringType,
  PresetType,
}
