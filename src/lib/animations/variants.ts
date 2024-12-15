// lib/animations/variants.ts
import { EASE_OUT_EXPO } from './properties'
import { INTRO_SEQUENCE } from './constants'

export const introVariants = {
  overlay: {
    initial: { height: '100vh' },
    animate: {
      height: 0,
      transition: {
        duration: INTRO_SEQUENCE.overlay.duration,
        delay: INTRO_SEQUENCE.overlay.start,
        ease: EASE_OUT_EXPO
      }
    }
  },
  container: {
    initial: {
      scale: 1.2,
      y: '50vh',
      height: '100vh'
    },
    animate: {
      scale: 1,
      y: 0,
      height: 'auto',
      transition: {
        scale: {
          delay: INTRO_SEQUENCE.container.start,
          duration: INTRO_SEQUENCE.container.duration,
          ease: EASE_OUT_EXPO
        },
        y: {
          delay: INTRO_SEQUENCE.container.start,
          duration: INTRO_SEQUENCE.container.duration,
          ease: EASE_OUT_EXPO
        },
        height: {
          delay: INTRO_SEQUENCE.container.start,
          duration: INTRO_SEQUENCE.container.duration,
          ease: EASE_OUT_EXPO
        },
        delayChildren: INTRO_SEQUENCE.title.start,
        staggerChildren: 0.2
      }
    }
  },
  logo: {
    initial: {
      y: 100,
      color: 'white'
    },
    animate: {
      y: 0,
      color: 'white',
      transition: {
        y: {
          delay: INTRO_SEQUENCE.logo.start,
          duration: INTRO_SEQUENCE.logo.duration,
          ease: EASE_OUT_EXPO
        },
        color: {
          delay: INTRO_SEQUENCE.container.start + 0.6,
          duration: 0,
          ease: EASE_OUT_EXPO
        }
      }
    }
  },
  title: {
    initial: { y: 100, color: 'black' },
    animate: {
      y: 0,
      color: 'white',
      transition: {
        y: {
          delay: INTRO_SEQUENCE.title.start,
          duration: INTRO_SEQUENCE.title.duration,
          ease: EASE_OUT_EXPO
        },
        color: {
          delay: INTRO_SEQUENCE.container.start + 0.5,
          duration: 0,
          ease: EASE_OUT_EXPO
        }
      }
    }
  },
  content: {
    initial: { y: 200 },
    animate: {
      y: 0,
      transition: {
        delay: INTRO_SEQUENCE.content.start,
        duration: INTRO_SEQUENCE.content.duration,
        ease: EASE_OUT_EXPO
      }
    }
  },
  events: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: INTRO_SEQUENCE.content.delay + INTRO_SEQUENCE.content.start,
        duration: INTRO_SEQUENCE.content.duration,
        ease: EASE_OUT_EXPO
      }
    }
  },
  footer: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: INTRO_SEQUENCE.content.delay + INTRO_SEQUENCE.content.start,
        duration: INTRO_SEQUENCE.content.duration,
        ease: EASE_OUT_EXPO
      }
    }
  }
}