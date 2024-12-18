// lib/animations/variants/base.ts
import { TRANSITIONS } from '../config/transitions'
import { createTransition } from '../utils/createTransition'

export const baseVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: createTransition(TRANSITIONS.duration.medium)
    }
  },
  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: createTransition(TRANSITIONS.duration.medium, undefined, TRANSITIONS.easeOutExpo)
    }
  }
}