'use client'

import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import Image from 'next/image'
import Link from 'next/link'
import type { EventPosterProps, TiltConfig } from '@events/types'
import { getFullImageUrl } from '@events/utils/eventHelpers'
import { useScreenResolution } from '@hooks/use-screen-resolution'
import { transitions } from '@lib/animations'
import { cn } from '@lib/utils'
import { Button } from '@ui/button'

const HOVER_TRANSITION = { ease: transitions.easing.expo, duration: 0.8 }

const DEFAULT_TILT_CONFIG: TiltConfig = {
  perspective: 1000,
  scale: 1.05,
  tiltMaxAngleX: 8,
  tiltMaxAngleY: 8,
  glareEnable: true,
  glareMaxOpacity: 0.5,
  glareColor: 'rgba(255, 243, 230, 1)',
  glareBorderRadius: '8px',
  glarePosition: 'all',
  transitionSpeed: 800,
  tiltEnable: true,
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
  showCTA = true,
}: EventPosterProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [buttonHeight, setButtonHeight] = useState(0)
  const { isMobile } = useScreenResolution()

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight)
    }
  }, [])

  const tiltConfig = {
    ...DEFAULT_TILT_CONFIG,
    ...tiltProps,
    tiltEnable: !isMobile,
    glareEnable: !isMobile,
  }

  const hoverVariants = showCTA
    ? {
        initial: { y: 0 },
        hover: { y: -buttonHeight },
      }
    : undefined

  const CTAButton = showCTA && (
    <motion.div
      ref={buttonRef}
      className="absolute left-0 right-0"
      style={{ bottom: -buttonHeight }}
      variants={hoverVariants}
      transition={HOVER_TRANSITION}
    >
      <Button className="flex h-12 w-full items-center justify-center gap-2 rounded-none bg-white text-black hover:bg-white/90">
        <span className="relative z-10 text-black">Inscription</span>
        <ExternalLink size={14} className="relative z-10 text-black" />
      </Button>
    </motion.div>
  )

  const PosterContent = (
    <motion.div
      className="relative h-full overflow-hidden rounded-[8px]"
      initial="initial"
      whileHover={showCTA ? 'hover' : undefined}
    >
      <motion.div variants={hoverVariants} transition={HOVER_TRANSITION}>
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
      </motion.div>
      {CTAButton}
    </motion.div>
  )

  const TiltWrapper = ({ children }: { children: React.ReactNode }) => (
    <Tilt {...tiltConfig}>{children}</Tilt>
  )

  return (
    <div
      className={cn(
        SIZE_DIMENSIONS[size],
        'relative aspect-[604/854]',
        className,
      )}
    >
      {showCTA ? (
        <Link
          href={`/events/${event.slug}/register`}
          target="_blank"
          className="block h-full w-full"
        >
          <TiltWrapper>{PosterContent}</TiltWrapper>
        </Link>
      ) : (
        <TiltWrapper>{PosterContent}</TiltWrapper>
      )}
    </div>
  )
}
