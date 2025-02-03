// lib/animations/variants/stagger.ts
import { transitions } from '../config/transitions'

const { stagger, easing, duration } = transitions

export const staggerVariants = {
  parent: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.short,
        delayChildren: 0,
        ease: easing.smooth,
      },
    },
  },
  child: {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration.normal,
        ease: easing.smooth,
      },
    },
  },
}
