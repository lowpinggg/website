import { TargetAndTransition, Transition } from 'motion/react'

// For transform values
interface TransformConfig {
  initial: TargetAndTransition
  final: TargetAndTransition
  exit?: TargetAndTransition
}

// For timeline/animation config
interface TimelineConfig {
  duration: number
  delay: number
  ease: [number, number, number, number]
}

// Variants can be nested
interface VariantMap {
  [key: string]: TransformConfig | VariantMap
}

// Timeline config can also be nested
interface TimelineVariantMap {
  [key: string]: TimelineConfig | TimelineVariantMap
}

// The actual variant type from Framer Motion
interface Variant {
  initial?: TargetAndTransition
  animate?: TargetAndTransition
  exit?: TargetAndTransition
  transition?: Transition
}

// Output variants map
interface OutputVariantMap {
  [key: string]: Variant | OutputVariantMap
}

export function createVariants(
  transforms: VariantMap,
  timelineConfig: TimelineVariantMap,
): OutputVariantMap {
  return Object.keys(transforms).reduce<OutputVariantMap>((variants, key) => {
    const transform = transforms[key]
    const timeline = timelineConfig[key]

    // Handle nested variants
    if ((transform as TransformConfig).initial === undefined) {
      variants[key] = createVariants(
        transform as VariantMap,
        timeline as TimelineVariantMap,
      )
      return variants
    }

    // Create variant
    variants[key] = {
      initial: (transform as TransformConfig).initial,
      animate: {
        ...(transform as TransformConfig).final,
        transition: timeline,
      },
    }

    return variants
  }, {})
}
