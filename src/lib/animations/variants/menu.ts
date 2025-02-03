// lib/animations/variants/menu.ts
import { transitions } from '../config'
import { createTransition } from '../utils/createTransition'

const { delay, easing, duration } = transitions

export const menuVariants = {
  overlay: {
    initial: { clipPath: 'inset(0 0 100% 0)' },
    animate: {
      clipPath: 'inset(0)',
      transition: createTransition(duration.superSlow, delay.none, easing.expo),
    },
    exit: {
      clipPath: 'inset(0 0 100% 0)',
      transition: createTransition(duration.slow, delay.none, easing.expo),
    },
  },
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        staggerDirection: 1,
      },
    },
  },
  item: {
    initial: {
      y: 100,
    },
    animate: {
      y: 0,
      transition: {
        duration: 1.5,
        ease: easing.expo,
      },
    },
  },
  social: {
    initial: {},
    animate: {
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  },
}
