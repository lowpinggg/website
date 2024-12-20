// lib/animations/utils/createTransition.ts
import { TRANSITIONS } from '../config/transitions'

export const createTransition = (
  duration: number = 1,
  delay: number = 0,
  ease = TRANSITIONS.ease
) => ({
  duration,
  delay,
  ease
})
