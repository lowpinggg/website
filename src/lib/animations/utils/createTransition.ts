// lib/animations/utils/createTransition.ts
import { TRANSITIONS, Ease } from '../config/transitions'

export const createTransition = (
  duration: number,
  delay: number = 0,
  ease: Ease = TRANSITIONS.ease
) => ({
  duration,
  delay,
  ease
})