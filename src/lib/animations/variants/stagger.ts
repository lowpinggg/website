// lib/animations/variants/stagger.ts
import { TRANSITIONS } from '../config/transitions'
import { baseVariants } from './base'
import { createTransition } from '../utils/createTransition'

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
    child: baseVariants.slide
  },
  form: {
    parent: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: TRANSITIONS.stagger.short,
          delayChildren: TRANSITIONS.delay.short,
          ease: TRANSITIONS.easeOutExpo
        }
      }
    },
    child: {
      initial: { y: 10, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: createTransition(
          TRANSITIONS.duration.short,
          0,
          TRANSITIONS.easeOutExpo
        )
      }
    }
  }
}