// lib/animations/variants/stagger.ts
import { transitions } from '../config/transitions'

const { stagger, delay, easing, duration } = transitions

export const staggerVariants = {
  parent: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.short,
        delayChildren: delay.short,
        ease: easing.default,
      },
    },
  },
  child: {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration.slower,
        ease: easing.default,
      },
    },
  },
}
