// variants/intro.ts
import { timeline } from '../config/timeline'
import { createTransition } from '../utils/createTransition'

const transforms = {
  overlay: {
    initial: { clipPath: 'inset(0 0 0 0)' },
    final: { clipPath: 'inset(0 0 100% 0)' },
  },

  navigation: {
    logo: {
      initial: { y: 100 },
      final: { y: 0 },
    },
    mobileButton: {
      initial: { y: 100, opacity: 0 },
      final: { y: 0, opacity: 1 },
    },
    navLinks: {
      container: {
        initial: {},
        final: {},
      },
      item: {
        initial: { y: 100 },
        final: { y: 0 },
      },
    },
  },

  background: {
    initial: {
      opacity: 0,
      y: -1,
      scale: 1.3,
      filter: 'blur(24px)',
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
      initial: { height: 0 },
      final: { height: 'auto' },
    },
    text: {
      initial: { clipPath: 'inset(0 0 0 0)' },
      final: { clipPath: 'inset(100% 0 0 0)' },
    },
  },
  content: {
    container: {
      initial: { height: 0 },
      final: { height: 'auto' },
    },
    text: {
      initial: { y: 100 },
      final: { y: 0 },
    },
    button: {
      initial: { y: 100 },
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

  navigation: {
    logo: {
      initial: transforms.navigation.logo.initial,
      animate: {
        ...transforms.navigation.logo.final,
        transition: createTransition(
          timeline.intro.navigation.logo.duration,
          timeline.intro.navigation.logo.delay,
          timeline.intro.navigation.logo.ease,
        ),
      },
    },
    mobileButton: {
      initial: transforms.navigation.mobileButton.initial,
      animate: {
        ...transforms.navigation.mobileButton.final,
        transition: createTransition(
          timeline.intro.navigation.mobileButton.duration,
          timeline.intro.navigation.mobileButton.delay,
          timeline.intro.navigation.mobileButton.ease,
        ),
      },
    },
    navLinks: {
      container: {
        initial: transforms.navigation.navLinks.container.initial,
        animate: {
          ...transforms.navigation.navLinks.container.final,
          transition: {
            duration: timeline.intro.navigation.navLinks.container.duration,
            delay: timeline.intro.navigation.navLinks.container.delay,
            ease: timeline.intro.navigation.navLinks.container.ease,
            staggerChildren:
              timeline.intro.navigation.navLinks.container.staggerDelay,
            delayChildren: timeline.intro.navigation.navLinks.container.delay,
          },
        },
      },
      item: {
        initial: transforms.navigation.navLinks.item.initial,
        animate: {
          ...transforms.navigation.navLinks.item.final,
          transition: {
            duration: timeline.intro.navigation.navLinks.item.duration,
            ease: timeline.intro.navigation.navLinks.item.ease,
          },
        },
      },
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
        },
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
        },
      },
    },
    text: {
      initial: transforms.content.text.initial,
      animate: {
        ...transforms.content.text.final,
        transition: createTransition(
          timeline.intro.content.text.duration,
          timeline.intro.content.text.delay,
          timeline.intro.content.text.ease,
        ),
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
