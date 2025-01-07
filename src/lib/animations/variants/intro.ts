// lib/animations/variants/intro.ts
import { INTRO_TIMELINE } from '../config/timeline'
import { TRANSITIONS } from '../config/transitions'
import { createTransition } from '../utils/createTransition'
import { baseVariants } from './base'

export const introVariants = {
  overlay: {
    initial: { height: '100vh' },
    animate: {
      height: 0,
      transition: createTransition(
        INTRO_TIMELINE.overlay.duration,
        INTRO_TIMELINE.overlay.start,
        TRANSITIONS.easeOutExpo,
      ),
    },
  },
  container: {
    initial: { y: '25vh' },
    animate: {
      y: 0,
      transition: {
        y: createTransition(
          INTRO_TIMELINE.container.duration,
          INTRO_TIMELINE.container.start,
          TRANSITIONS.easeOutExpo,
        ),
      },
    },
  },
  image: {
    initial: {
      y: -1,
      opacity: 0,
      filter: 'blur(10px)',
      zIndex: -1,
    },
    animate: {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 0,
      transition: createTransition(
        INTRO_TIMELINE.image.duration,
        INTRO_TIMELINE.image.start,
        TRANSITIONS.easeOutExpo,
      ),
    },
  },
  logo: {
    initial: {
      y: 100,
      color: 'white',
    },
    animate: {
      y: 0,
      color: 'white',
      transition: {
        y: createTransition(
          INTRO_TIMELINE.logo.duration,
          INTRO_TIMELINE.logo.start,
          TRANSITIONS.easeOutExpo,
        ),
        color: createTransition(
          INTRO_TIMELINE.colorTransition.duration,
          INTRO_TIMELINE.colorTransition.delay,
          TRANSITIONS.easeOutExpo,
        ),
      },
    },
  },
  title: {
    initial: { y: 150, color: 'black' },
    animate: {
      y: 0,
      color: 'white',
      transition: {
        y: createTransition(
          INTRO_TIMELINE.title.duration,
          INTRO_TIMELINE.title.start,
          TRANSITIONS.easeOutExpo,
        ),
        color: createTransition(
          INTRO_TIMELINE.colorTransition.duration,
          INTRO_TIMELINE.colorTransition.delay,
          TRANSITIONS.easeOutExpo,
        ),
      },
    },
  },
  version: {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: createTransition(
        INTRO_TIMELINE.version.duration,
        0,
        TRANSITIONS.easeOutExpo,
      ),
    },
    exit: {
      y: 100,
      height: 0,
      opacity: 0,
      transition: createTransition(
        INTRO_TIMELINE.version.duration,
        INTRO_TIMELINE.version.delay,
        TRANSITIONS.easeOutExpo,
      ),
    },
  },
  content: {
    initial: { y: 200 },
    animate: {
      y: 0,
      transition: createTransition(
        INTRO_TIMELINE.content.duration,
        INTRO_TIMELINE.content.start,
        TRANSITIONS.easeOutExpo,
      ),
    },
  },
  events: {
    ...baseVariants.slideUp,
    animate: {
      ...baseVariants.slideUp.animate,
      transition: createTransition(
        undefined,
        INTRO_TIMELINE.events.start,
        undefined,
      ),
    },
  },
  footer: {
    ...baseVariants.slideUp,
    animate: {
      ...baseVariants.slideUp.animate,
      transition: createTransition(
        undefined,
        INTRO_TIMELINE.footer.start,
        undefined,
      ),
    },
  },
}
