// lib/animations/variants/base.ts
import { transitions } from '../config'
import { createTransition } from '../utils/createTransition'

export const baseVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: createTransition(
        transitions.duration.medium,
        transitions.delay.minimal,
        transitions.easing.default,
      ),
    },
  },
  slideUp: {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: createTransition(
        transitions.duration.superSlow,
        transitions.delay.medium,
        transitions.easing.expo,
      ),
    },
  },
}
