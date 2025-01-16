// lib/animations/utils/createTransition.ts

export function createTransition(
  duration: number,
  delay: number,
  ease: readonly number[],
) {
  return {
    duration,
    delay,
    ease,
  }
}
