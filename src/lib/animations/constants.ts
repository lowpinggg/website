// lib/animations/constants.ts
export const INTRO_SEQUENCE = {
  timeline: {
    1: {
      name: 'title',
      start: 1,
      duration: 1
    },
    2: {
      name: 'overlay',
      start: 2,
      duration: 1
    },
    3: {
      name: 'container',
      start: 2,
      duration: 1
    },
    4: {
      name: 'logo',
      start: 2.1,
      duration: 1
    },
    5: {
      name: 'content',
      start: 2,
      duration: 1,
      delay: 1
    }
  },
  getStartTime: (elementName: string) => {
    const step = Object.values(INTRO_SEQUENCE.timeline).find(
      step => step.name === elementName
    )
    return step?.start || 0
  },
  special: {
    version: {
      duration: 1,
      displayDuration: 1
    },
    colorTransition: {
      delay: 2.5,
      duration: 0
    }
  }
} as const