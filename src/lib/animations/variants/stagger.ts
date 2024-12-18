// lib/animations/variants/stagger.ts
import { TRANSITIONS } from '../config/transitions'
import { baseVariants } from './base'

export const staggerVariants = {
  list: {
    parent: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: TRANSITIONS.stagger.medium,
          delayChildren: TRANSITIONS.delay.medium,
          ease: TRANSITIONS.easeOutExpo
        }
      }
    },
    child: baseVariants.slideUp
  }
}
