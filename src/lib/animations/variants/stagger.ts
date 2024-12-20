// lib/animations/variants/stagger.ts
import { TRANSITIONS } from '../config/transitions'

export const staggerVariants = {
  list: {
    parent: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: TRANSITIONS.stagger.short,
          delayChildren: TRANSITIONS.delay.none,
          ease: TRANSITIONS.ease
        }
      }
    },
    child: {
      initial: { y: 20, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: {
          duration: TRANSITIONS.duration.medium,
          ease: TRANSITIONS.ease
        }
      }
    }
  }
}
