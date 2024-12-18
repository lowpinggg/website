// lib/animations/variants/base.ts
import { TRANSITIONS } from '../config/transitions'
import { createTransition } from '../utils/createTransition'

export const baseVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: createTransition(TRANSITIONS.duration.medium)
    }
  },
  slide: {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: createTransition(TRANSITIONS.duration.medium)
    }
  }
}