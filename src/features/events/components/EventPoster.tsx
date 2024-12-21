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
type GlarePosition = 'all' | 'top' | 'right' | 'bottom' | 'left'
type PosterSize = 'sm' | 'md' | 'lg' | 'xl' | 'custom' | 'full' | 'responsive'

interface TiltProps {
  perspective?: number
  scale?: number
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  glareEnable?: boolean
  glareMaxOpacity?: number
  glareColor?: string
  glarePosition?: GlarePosition
  glareBorderRadius?: string
  transitionSpeed?: number
  tiltEnable?: boolean
}

interface EventPosterProps {
  event: Event
  size?: PosterSize
  customWidth?: string
  customHeight?: string
  className?: string
  tiltProps?: Partial<TiltProps>
  showCTA?: boolean
}

const HOVER_TRANSITION = { ease: TRANSITIONS.easeOutExpo, duration: 0.8 }

const TILT_DEFAULTS: TiltProps = {
  perspective: 1000,
  scale: 1.05,
  tiltMaxAngleX: 5,
  tiltMaxAngleY: 5,
  glareEnable: true,
  glareMaxOpacity: 0.2,
  glareColor: 'rgba(255, 243, 230, 1)',
  glarePosition: 'all',
  glareBorderRadius: '11px',
  transitionSpeed: 300,
  tiltEnable: true
}

const SIZE_DIMENSIONS = {
  sm: { width: 'w-full max-w-[200px]', height: 'aspect-[604/854]' },
  md: { width: 'w-full max-w-[340px]', height: 'aspect-[604/854]' },
  lg: { width: 'w-full sm:max-w-[460px]', height: 'aspect-[604/854]' },
  xl: { width: 'w-full max-w-[700px]', height: 'aspect-[604/854]' },
  full: { width: 'w-full', height: 'aspect-[604/854]' },
  custom: { width: 'w-auto', height: 'h-auto' },
  responsive: { width: 'w-full max-w-full', height: 'aspect-[604/854]' }
}

export function EventPoster({
  event,
  size = 'responsive',
  customWidth,
  customHeight,
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

  const getDimensions = () => {
    if (size === 'custom') {
      return { width: customWidth, height: customHeight }
    }
    return SIZE_DIMENSIONS[size]
  }

  const finalTiltProps = {
    ...TILT_DEFAULTS,
    ...tiltProps,
    tiltEnable: isDesktop,
    glareEnable: isDesktop
  }

  const hoverVariants = showCTA ? {
    initial: { y: 0 },
    hover: { y: -buttonHeight }
  } : undefined

  const renderButton = () => {
    if (!showCTA) return null
  
    return (
      <motion.div
        ref={buttonRef}
        className="absolute left-0 right-0 cursor-active"
        style={{ bottom: -buttonHeight }}
        variants={hoverVariants}
        transition={HOVER_TRANSITION}
      >
        <Button className="w-full h-12 flex items-center justify-center gap-1 rounded-none cursor-blend">
          <div className="flex items-center gap-1">
            <span className="relative z-10 transition-colors delay-200 text-black">
              Inscription
            </span>
            <ArrowRight
              size={16}
              className="relative z-10 transition-colors delay-200"
            />
          </div>
        </Button>
      </motion.div>
    )
  }
  

  const posterContent = (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      initial="initial"
      whileHover={showCTA ? 'hover' : undefined}
      style={{ overflow: 'hidden', width: '100%', height: '100%' }}
    >
      <div className="relative w-full h-full">
        <motion.div
          variants={hoverVariants}
          transition={HOVER_TRANSITION}
          className="h-full"
        >
          <Image
            src={event.poster_url || '/null-tournament.png'}
            alt={event.name}
            width={604}
            height={854}
            quality={80}
            className="object-cover rounded-none w-full h-full"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority
          />
        </motion.div>
      </div>
      {renderButton()}
    </motion.div>
  )

  const { width, height } = getDimensions()
  const containerClassName = cn(width, height, className)

  return (
    <motion.div className={cn('inline-block relative', containerClassName)}>

      <Tilt className="w-full h-full" {...finalTiltProps}>

        {showCTA ? (
          <Link
            href={`/${event.slug}/register`}
            target="_blank"
            className="block w-full h-full"
          >
            {posterContent}
          </Link>
        ) : (
          posterContent
        )}
      </Tilt>
    </motion.div>
  )
}