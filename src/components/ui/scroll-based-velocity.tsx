'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { cn } from 'src/lib/utils'

interface VelocityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultVelocity?: number
  className?: string
  numRows?: number
}

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  baseVelocity: number
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

function ParallaxText({ children, baseVelocity = 1, ...props }: ParallaxProps) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const [repetitions, setRepetitions] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const textWidth = textRef.current.offsetWidth
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 2
        setRepetitions(newRepetitions)
      }
    }

    calculateRepetitions()
    window.addEventListener('resize', calculateRepetitions)
    return () => window.removeEventListener('resize', calculateRepetitions)
  }, [children])

  const x = useTransform(
    baseX,
    (v: number) => `${wrap(-100 / repetitions, 0, v)}%`,
  )
  const directionFactor = React.useRef<number>(1)

  useAnimationFrame((_t: number, delta: number) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden whitespace-nowrap"
      {...props}
    >
      <motion.div className="inline-block" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? textRef : null}>
            {children}{' '}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function VelocityScroll({
  defaultVelocity = 0.5,
  numRows = 4,
  children,
  className,
  ...props
}: VelocityScrollProps) {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getAdaptiveVelocity = (): number => {
    if (screenWidth < 640) return defaultVelocity * 0.3
    if (screenWidth < 1024) return defaultVelocity * 0.6
    return defaultVelocity
  }

  return (
    <div
      key={screenWidth}
      className={cn(
        'relative w-full text-5xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]',
        className,
      )}
      {...props}
    >
      {Array.from({ length: numRows }).map((_, i) => (
        <ParallaxText
          key={i}
          baseVelocity={getAdaptiveVelocity() * (i % 2 === 0 ? 1 : -1)}
        >
          {children}
        </ParallaxText>
      ))}
    </div>
  )
}
