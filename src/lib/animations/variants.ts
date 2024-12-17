// lib/animations/variants.ts
import { INTRO_SEQUENCE } from './constants'
import { EASE, EASE_OUT_EXPO } from './properties'

// ============================================================================
// Base Animation Variants
// ============================================================================

export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE_OUT_EXPO
    }
  }
}

export const slideUpVariants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: EASE
    }
  }
}

// ============================================================================
// Stagger Animation Variants
// ============================================================================

export const staggerVariants = {
  parent: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        ease: EASE_OUT_EXPO
      }
    }
  },
  child: {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: EASE
      }
    }
  }
}

export const formStaggerVariants = {
  parent: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: EASE_OUT_EXPO
      }
    }
  },
  child: {
    initial: { y: 10, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: EASE_OUT_EXPO
      }
    }
  }
}

// ============================================================================
// Page-Specific Animation Variants
// ============================================================================

// lib/animations/variants.ts
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
      y: '50%'
    },
    animate: {
      scale: 1,
      y: 0,
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
  image: {
    initial: {
      y: -25,
      opacity: 0,
      filter: 'blur(10px)',
      zIndex: -1
    },
    animate: {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 0,
      transition: {
        delay: INTRO_SEQUENCE.logo.start + 0.2,
        duration: INTRO_SEQUENCE.logo.duration,
        ease: EASE_OUT_EXPO
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
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: INTRO_SEQUENCE.content.start + 0.5,
        duration: INTRO_SEQUENCE.content.duration,
        ease: EASE
      }
    }
  },
  footer: {
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: INTRO_SEQUENCE.content.start + 0.5,
        duration: INTRO_SEQUENCE.content.duration,
        ease: EASE
      }
    }
  }
}
