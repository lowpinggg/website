'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Tilt from 'react-parallax-tilt'
import { useMedia } from '@/hooks/useMedia'
import type { Database } from '@/types/generated-types'
import { TRANSITIONS } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Event = Database['public']['Tables']['events']['Row']
type PosterSize = 'sm' | 'md' | 'lg' | 'xl' | 'responsive' | 'full'

interface TiltConfig {
  perspective?: number
  scale?: number
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  glareEnable?: boolean
  glareMaxOpacity?: number
  glareColor?: string
  glareBorderRadius?: string
  transitionSpeed?: number
  tiltEnable?: boolean
  glarePosition?: 'top' | 'right' | 'bottom' | 'left' | 'all'
}

interface EventPosterProps {
  event: Event
  size?: PosterSize
  className?: string
  tiltProps?: Partial<TiltConfig>
  showCTA?: boolean
}

const HOVER_TRANSITION = { ease: TRANSITIONS.easeOutExpo, duration: 0.8 }

const DEFAULT_TILT_CONFIG: TiltConfig = {
  perspective: 1000,
  scale: 1.05,
  tiltMaxAngleX: 12,
  tiltMaxAngleY: 12,
  glareEnable: true,
  glareMaxOpacity: 0.5,
  glareColor: 'rgba(255, 243, 230, 1)',
  glareBorderRadius: '12px',
  glarePosition: 'all',
  transitionSpeed: 800,
  tiltEnable: true
}

const SIZE_DIMENSIONS = {
  sm: 'w-full max-w-[200px]',
  md: 'w-full max-w-[340px]',
  lg: 'w-full sm:max-w-[420px]',
  xl: 'w-full max-w-[680px]',
  full: 'w-full',
  responsive: 'w-full max-w-full'
} as const

export function EventPoster({
  event,
  size = 'responsive',
  className,
  tiltProps = {},
  showCTA = true
}: EventPosterProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [buttonHeight, setButtonHeight] = useState(0)
  const isDesktop = useMedia('(min-width: 640px)')

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight)
    }
  }, [])

  const tiltConfig = {
    ...DEFAULT_TILT_CONFIG,
    ...tiltProps,
    tiltEnable: isDesktop,
    glareEnable: isDesktop
  }

  const hoverVariants = showCTA ? {
    initial: { y: 0 },
    hover: { y: -buttonHeight }
  } : undefined

  const CTAButton = showCTA && (
    <motion.div
      ref={buttonRef}
      className="absolute left-0 right-0"
      style={{ bottom: -buttonHeight }}
      variants={hoverVariants}
      transition={HOVER_TRANSITION}
    >
      <Button className="w-full h-12 flex items-center justify-center gap-1 rounded-none">
        <span className="relative z-10 text-black">Inscription</span>
        <ArrowRight size={16} className="relative z-10" />
      </Button>
    </motion.div>
  )

  const PosterContent = (
    <motion.div
      className="relative h-full overflow-hidden rounded-md"
      initial="initial"
      whileHover={showCTA ? 'hover' : undefined}
    >
      <motion.div
        variants={hoverVariants}
        transition={HOVER_TRANSITION}
      >
        <Image
          src={event.poster_url || '/null-tournament.png'}
          alt={event.name}
          width={604}
          height={854}
          quality={80}
          className="object-cover w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />
      </motion.div>
      {CTAButton}
    </motion.div>
  )

  const TiltWrapper = ({ children }: { children: React.ReactNode }) => (
    <Tilt {...tiltConfig}>
      {children}
    </Tilt>
  )

  return (
    <div className={cn(SIZE_DIMENSIONS[size], 'aspect-[604/854] relative', className)}>
      {showCTA ? (
        <Link
          href={`/${event.slug}/register`}
          target="_blank"
          className="block w-full h-full"
        >
          <TiltWrapper>
            {PosterContent}
          </TiltWrapper>
        </Link>
      ) : (
        <TiltWrapper>
          {PosterContent}
        </TiltWrapper>
      )}
    </div>
  )
}