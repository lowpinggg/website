// lib/animations/variants/stagger.ts
import { transitions } from '../config/transitions'
import { createTransition } from '../utils/createTransition'

const { delay, easing, duration } = transitions

export const staggerVariants = {
  parent: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: createTransition(duration.slowest, delay.medium, easing.expo),
    },
  },
  child: {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: createTransition(duration.slowest, delay.medium, easing.expo),
    },
  },
}
