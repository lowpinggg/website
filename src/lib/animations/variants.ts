// lib/animations/variants.ts
import { INTRO_SEQUENCE } from './constants'
import { EASE, EASE_OUT_EXPO } from './properties'

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

export const introVariants = {
  overlay: {
    initial: { height: '100vh' },
    animate: {
      height: 0,
      transition: {
        duration: INTRO_SEQUENCE.timeline[2].duration,
        delay: INTRO_SEQUENCE.getStartTime('overlay'),
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
          delay: INTRO_SEQUENCE.getStartTime('container'),
          duration: INTRO_SEQUENCE.timeline[3].duration,
          ease: EASE_OUT_EXPO
        },
        y: {
          delay: INTRO_SEQUENCE.getStartTime('container'),
          duration: INTRO_SEQUENCE.timeline[3].duration,
          ease: EASE_OUT_EXPO
        }
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
        delay: INTRO_SEQUENCE.getStartTime('logo') + 0.2,
        duration: INTRO_SEQUENCE.timeline[4].duration,
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
          delay: INTRO_SEQUENCE.getStartTime('logo'),
          duration: INTRO_SEQUENCE.timeline[4].duration,
          ease: EASE_OUT_EXPO
        },
        color: {
          delay: INTRO_SEQUENCE.special.colorTransition.delay,
          duration: INTRO_SEQUENCE.special.colorTransition.duration,
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
          delay: INTRO_SEQUENCE.getStartTime('title'),
          duration: INTRO_SEQUENCE.timeline[1].duration,
          ease: EASE_OUT_EXPO
        },
        color: {
          delay: INTRO_SEQUENCE.special.colorTransition.delay,
          duration: INTRO_SEQUENCE.special.colorTransition.duration,
          ease: EASE_OUT_EXPO
        }
      }
    }
  },
  version: {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: INTRO_SEQUENCE.special.version.duration,
        ease: EASE_OUT_EXPO
      }
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        delay: INTRO_SEQUENCE.special.version.displayDuration,
        duration: INTRO_SEQUENCE.special.version.duration,
        ease: EASE_OUT_EXPO
      }
    }
  },
  content: {
    initial: { y: 200 },
    animate: {
      y: 0,
      transition: {
        delay: INTRO_SEQUENCE.getStartTime('content'),
        duration: INTRO_SEQUENCE.timeline[5].duration,
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
        delay: INTRO_SEQUENCE.getStartTime('content') + 0.5,
        duration: INTRO_SEQUENCE.timeline[5].duration,
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
        delay: INTRO_SEQUENCE.getStartTime('content') + 0.5,
        duration: INTRO_SEQUENCE.timeline[5].duration,
        ease: EASE
      }
    }
  }
}