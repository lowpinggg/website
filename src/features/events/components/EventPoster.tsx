// features/events/components/EventPoster.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import Tilt from 'react-parallax-tilt'

import type { Database } from '@/types/generated-types'
import { EASE } from '@/lib/animations/properties'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type Event = Database['public']['Tables']['events']['Row']

type PosterSize = 'sm' | 'md' | 'lg' | 'xl' | 'custom' | 'full' | 'responsive'
type GlarePosition = 'all' | 'top' | 'right' | 'bottom' | 'left'

type TiltProps = {
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

const HOVER_TRANSITION = { ease: EASE, duration: 0.8 }

const defaultTiltProps: TiltProps = {
  perspective: 1000,
  scale: 1.02,
  tiltMaxAngleX: 5,
  tiltMaxAngleY: 5,
  glareEnable: true,
  glareMaxOpacity: 0.2,
  glareColor: '#ffffff',
  glarePosition: 'all',
  glareBorderRadius: '11px',
  transitionSpeed: 300,
  tiltEnable: true
}

const sizeDimensions = {
  sm: { width: 'w-full max-w-[200px]', height: 'aspect-[604/854]' },
  md: { width: 'w-full max-w-[360px]', height: 'aspect-[604/854]' },
  lg: { width: 'w-full sm:max-w-[460px]', height: 'aspect-[604/854]' },
  xl: { width: 'w-full max-w-[700px]', height: 'aspect-[604/854]' },
  full: { width: 'w-full', height: 'aspect-[604/854]' },
  custom: { width: 'w-auto', height: 'h-auto' }
}

const responsiveDimensions = {
  width: 'w-full max-w-full',
  height: 'aspect-[604/854]'
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

  const finalTiltProps = { ...defaultTiltProps, ...tiltProps }

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight)
    }
  }, [])

  const getDimensions = () => {
    if (size === 'responsive') {
      return responsiveDimensions
    }
    if (size === 'custom') {
      return { width: customWidth, height: customHeight }
    }
    return sizeDimensions[size]
  }

  const dimensions = getDimensions()

  const containerClassName = cn(dimensions.width, dimensions.height, className)

  const cardContent = (
    <motion.div
      className="relative rounded-lg overflow-hidden"
      initial="initial"
      whileHover={showCTA ? 'hover' : undefined}
      style={{ overflow: 'hidden', width: '100%', height: '100%' }}
    >
      <div className="relative w-full h-full">
        <motion.div
          variants={
            showCTA
              ? {
                  initial: { y: 0 },
                  hover: { y: -buttonHeight }
                }
              : undefined
          }
          transition={HOVER_TRANSITION}
          className="h-full"
        >
          <Image
            src={event.poster_url || '/default-poster.png'}
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

      {showCTA && (
        <motion.div
          ref={buttonRef}
          className="absolute left-0 right-0"
          style={{ bottom: -buttonHeight }}
          variants={{
            initial: { y: 0 },
            hover: { y: -buttonHeight }
          }}
          transition={HOVER_TRANSITION}
        >
          <Button className="w-full h-12 flex items-center justify-center gap-1 rounded-none">
            <span>Inscription</span>
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      )}
    </motion.div>
  )

  const content = showCTA ? (
    <Link
      href={`/${event.id}/register`}
      target="_blank"
      className="block w-full h-full"
    >
      {cardContent}
    </Link>
  ) : (
    cardContent
  )

  return (
    <motion.div className={cn('inline-block', containerClassName)}>
      <Tilt className="w-full h-full" {...finalTiltProps}>
        {content}
      </Tilt>
    </motion.div>
  )
}
