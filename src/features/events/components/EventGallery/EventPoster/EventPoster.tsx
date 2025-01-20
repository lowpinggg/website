'use client'

import { motion } from 'motion/react'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import Tilt, { type GlarePosition } from 'react-parallax-tilt'
import Image from 'next/image'
import Link from 'next/link'
import type { EventPosterProps, TiltConfig } from '@events/types'
import { getFullImageUrl } from '@events/utils/eventHelpers'
import { useScreenResolution } from '@hooks/use-screen-resolution'
import { transitions } from '@lib/animations'
import { cn } from '@lib/utils'
import { Button } from '@ui/button'

const ANIMATION_CONFIG = {
  transition: {
    duration: transitions.duration.slow,
    ease: transitions.easing.smooth,
  },
}

const SIZE_DIMENSIONS = {
  sm: 'w-full max-w-[200px]',
  md: 'w-full max-w-[340px]',
  lg: 'w-full sm:max-w-[420px]',
  xl: 'w-full max-w-[680px]',
  full: 'w-full',
  responsive: 'w-full max-w-full',
} as const

export function EventPoster({
  event,
  size = 'responsive',
  className,
  tiltProps = {},
  isHovered = false,
  cta = undefined,
  buttonBounce = false,
}: EventPosterProps) {
  const [buttonHeight, setButtonHeight] = useState(0)
  const buttonRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useScreenResolution()
  const [localHover, setLocalHover] = useState(false)

  const isActive = isHovered || localHover

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight)
    }
  }, [])

  const tiltConfig: TiltConfig = {
    perspective: 1000,
    scale: 1.05,
    tiltMaxAngleX: 8,
    tiltMaxAngleY: 8,
    glareEnable: !isMobile,
    glareMaxOpacity: 0.5,
    glareColor: 'rgba(255, 243, 230, 1)',
    glareBorderRadius: '8px',
    glarePosition: 'all' as GlarePosition,
    transitionSpeed: 800,
    tiltEnable: !isMobile,
    ...tiltProps,
  }

  const PosterContent = (
    <motion.div
      className="relative h-full overflow-hidden rounded-[8px]"
      onHoverStart={() => setLocalHover(true)}
      onHoverEnd={() => setLocalHover(false)}
    >
      <motion.div
        className="relative"
        animate={{ y: isActive ? -buttonHeight : 0 }}
        transition={ANIMATION_CONFIG.transition}
      >
        <Image
          src={getFullImageUrl(event.poster_url || '')}
          alt={event.name}
          width={604}
          height={854}
          quality={80}
          className="h-full w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />

        {cta && (
          <div
            ref={buttonRef}
            className="absolute left-0 right-0"
            style={{ bottom: -buttonHeight }}
          >
            <Button className="h-12 w-full rounded-none bg-white text-black hover:bg-white/90">
              <motion.div
                className="flex items-center justify-center gap-1"
                animate={
                  buttonBounce
                    ? {
                        x: [10, 0, 10],
                      }
                    : {}
                }
                transition={
                  buttonBounce
                    ? {
                        duration: 2,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatType: 'loop',
                        times: [0, 0.5, 1],
                      }
                    : {}
                }
              >
                <span className="relative z-10 text-black">{cta.label}</span>
                {cta.icon &&
                  React.createElement(cta.icon, {
                    className: 'relative z-10 text-black',
                  })}
              </motion.div>
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )

  return (
    <div
      className={cn(
        SIZE_DIMENSIONS[size],
        'relative aspect-[604/854]',
        className,
      )}
    >
      {cta ? (
        <Link
          href={`/events/${event.slug}/register`}
          target="_blank"
          className="block h-full w-full"
        >
          <Tilt {...tiltConfig}>{PosterContent}</Tilt>
        </Link>
      ) : (
        <Tilt {...tiltConfig}>{PosterContent}</Tilt>
      )}
    </div>
  )
}
