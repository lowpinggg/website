// lib/animations/config/timeline.ts
export const INTRO_TIMELINE = {
  overlay: { start: 2, duration: 1 },
  version: {
    duration: 0.6,
    delay: 1.1
  },
  container: { start: 2, duration: 1 },
  title: { start: 1, duration: 1 },
  logo: { start: 2.1, duration: 1 },
  content: { start: 2, duration: 1 },
  colorTransition: {
    delay: 2.5,
    duration: 0
  },
  events: {
    start: 3,
    duration: 1
  },
  footer: {
    start: 2.5,
    duration: 1
  },
  image: {
    start: 2.2,
    duration: 1
  }
} as const