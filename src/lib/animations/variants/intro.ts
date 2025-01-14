// variants/intro.ts
import { timeline } from '../config/timeline'
import { createTransition } from '../utils/createTransition'

// TODO: Use helper to create variants

const transforms = {
  overlay: {
    initial: { clipPath: 'inset(0 0 0 0)' }, // starts fully visible
    final: { clipPath: 'inset(0 0 100% 0)' }, // clips from bottom to up
    transition: {
      duration: timeline.intro.overlay.duration,
      delay: timeline.intro.overlay.delay,
      ease: timeline.intro.overlay.ease,
    },
  },
  slideMask: {
    initial: { height: '100%' },
    final: { height: '0%' },
  },
  background: {
    initial: {
      opacity: 0,
      y: -1,
      scale: 1.2,
      filter: 'blur(30px)',
    },
    final: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
    },
  },
  logo: {
    initial: {
      height: 0,
      y: 100,
    },
    final: {
      height: 'auto',
      y: 0,
    },
    exit: {
      height: 0,
      y: 10,
    },
  },
  title: {
    container: {
      initial: { y: 350, height: 0 },
      final: { y: 0, height: 'auto' },
    },
    text: {
      initial: { clipPath: 'inset(0 0 0 0)' },
      final: { clipPath: 'inset(0 0 100% 0)' },
    },
  },
  content: {
    container: {
      initial: { height: 0, y: 100 },
      final: { height: 'auto', y: 0 },
    },
    button: {
      initial: { y: 50 },
      final: { y: 0 },
    },
  },
}

export const introVariants = {
  overlay: {
    initial: transforms.overlay.initial,
    animate: {
      ...transforms.overlay.final,
      transition: createTransition(
        timeline.intro.overlay.duration,
        timeline.intro.overlay.delay,
        timeline.intro.overlay.ease,
      ),
    },
  },

  background: {
    initial: transforms.background.initial,
    animate: {
      ...transforms.background.final,
      transition: createTransition(
        timeline.intro.background.duration,
        timeline.intro.background.delay,
        timeline.intro.background.ease,
      ),
    },
  },

  logo: {
    initial: transforms.logo.initial,
    animate: {
      ...transforms.logo.final,
      transition: createTransition(
        timeline.intro.logo.duration,
        timeline.intro.logo.showDelay,
        timeline.intro.logo.ease,
      ),
    },
    exit: {
      ...transforms.logo.exit,
      transition: createTransition(
        timeline.intro.logo.duration,
        timeline.intro.logo.hideDelay,
        timeline.intro.logo.ease,
      ),
    },
  },

  title: {
    container: {
      initial: transforms.title.container.initial,
      animate: {
        ...transforms.title.container.final,
        transition: {
          height: createTransition(
            timeline.intro.title.height.duration,
            timeline.intro.title.height.delay,
            timeline.intro.title.height.ease,
          ),
          y: createTransition(
            timeline.intro.title.y.duration,
            timeline.intro.title.y.delay,
            timeline.intro.title.y.ease,
          ),
        },
      },
    },
    text: {
      initial: transforms.title.text.initial,
      animate: {
        ...transforms.title.text.final,
        transition: createTransition(
          timeline.intro.title.clipPath.duration,
          timeline.intro.title.clipPath.delay,
          timeline.intro.title.clipPath.ease,
        ),
      },
    },
  },

  content: {
    container: {
      initial: transforms.content.container.initial,
      animate: {
        ...transforms.content.container.final,
        transition: {
          height: createTransition(
            timeline.intro.content.container.height.duration,
            timeline.intro.content.container.height.delay,
            timeline.intro.content.container.height.ease,
          ),
          y: createTransition(
            timeline.intro.content.container.y.duration,
            timeline.intro.content.container.y.delay,
            timeline.intro.content.container.y.ease,
          ),
        },
      },
    },
    button: {
      initial: transforms.content.button.initial,
      animate: {
        ...transforms.content.button.final,
        transition: createTransition(
          timeline.intro.content.button.duration,
          timeline.intro.content.button.delay,
          timeline.intro.content.button.ease,
        ),
      },
    },
  },
} as const
