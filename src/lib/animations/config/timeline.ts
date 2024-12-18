// lib/animations/config/timeline.ts
export const INTRO_TIMELINE = {
  title: { start: 1, duration: 1 },
  overlay: { start: 2, duration: 1 },
  container: { start: 2, duration: 1 },
  logo: { start: 2.1, duration: 1 },
  content: { start: 2, duration: 1 },
  version: {
    duration: .6,
    displayDuration: 1
  },
  colorTransition: {
    delay: 2.5,
    duration: 0
  }
} as const