// lib/animations/variants/intro.ts
import { TRANSITIONS } from '../config/transitions'
import { INTRO_TIMELINE } from '../config/timeline'
import { createTransition } from '../utils/createTransition'

export const introVariants = {
  overlay: {
    initial: { height: '100vh' },
    animate: {
      height: 0,
      transition: createTransition(
        INTRO_TIMELINE.overlay.duration,
        INTRO_TIMELINE.overlay.start,
        TRANSITIONS.easeOutExpo
      )
    }
  },
  container: {
    initial: { scale: 1.2, y: '50%' },
    animate: {
      scale: 1,
      y: 0,
      transition: {
        scale: createTransition(
          INTRO_TIMELINE.container.duration,
          INTRO_TIMELINE.container.start,
          TRANSITIONS.easeOutExpo
        ),
        y: createTransition(
          INTRO_TIMELINE.container.duration,
          INTRO_TIMELINE.container.start,
          TRANSITIONS.easeOutExpo
        )
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
      transition: createTransition(
        INTRO_TIMELINE.logo.duration,
        INTRO_TIMELINE.logo.start + 0.2,
        TRANSITIONS.easeOutExpo
      )
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
        y: createTransition(
          INTRO_TIMELINE.logo.duration,
          INTRO_TIMELINE.logo.start,
          TRANSITIONS.easeOutExpo
        ),
        color: createTransition(
          INTRO_TIMELINE.colorTransition.duration,
          INTRO_TIMELINE.colorTransition.delay,
          TRANSITIONS.easeOutExpo
        )
      }
    }
  },
  title: {
    initial: { y: 100, color: 'black' },
    animate: {
      y: 0,
      color: 'white',
      transition: {
        y: createTransition(
          INTRO_TIMELINE.title.duration,
          INTRO_TIMELINE.title.start,
          TRANSITIONS.easeOutExpo
        ),
        color: createTransition(
          INTRO_TIMELINE.colorTransition.duration,
          INTRO_TIMELINE.colorTransition.delay,
          TRANSITIONS.easeOutExpo
        )
      }
    }
  },
  version: {
    initial: {
      y: 100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: createTransition(
        INTRO_TIMELINE.version.duration,
        0,
        TRANSITIONS.easeOutExpo
      )
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: createTransition(
        INTRO_TIMELINE.version.duration,
        INTRO_TIMELINE.version.displayDuration,
        TRANSITIONS.easeOutExpo
      )
    },
  },
  content: {
    initial: { y: 200 },
    animate: {
      y: 0,
      transition: createTransition(
        INTRO_TIMELINE.content.duration,
        INTRO_TIMELINE.content.start,
        TRANSITIONS.easeOutExpo
      )
    }
  },
  events: {
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: createTransition(
        INTRO_TIMELINE.content.duration,
        INTRO_TIMELINE.content.start + 0.5,
        TRANSITIONS.ease
      )
    }
  },
  footer: {
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: createTransition(
        INTRO_TIMELINE.content.duration,
        INTRO_TIMELINE.content.start + 0.5,
        TRANSITIONS.ease
      )
    }
  }
}