/* eslint-disable @typescript-eslint/no-unused-vars */
// NavBar.tsx
'use client'

import { Calendar } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { cn } from '@lib/utils'
import { Full } from '@lowping/brand-kit'

/* eslint-disable @typescript-eslint/no-unused-vars */
// NavBar.tsx

interface NavBarProps {
  className?: string
}

export function NavBar({ className }: NavBarProps) {
  const { scrollY } = useScroll()

  // Define scroll ranges
  const scrollRange = [0, 100]

  const width = useTransform(scrollY, scrollRange, [
    'calc(100% - 1rem)',
    'calc(100% - 24rem)',
  ])

  const paddingLeft = useTransform(scrollY, scrollRange, [0, 32])
  const paddingRight = useTransform(scrollY, scrollRange, [0, 16])
  const backgroundColor = useTransform(scrollY, scrollRange, [
    'rgba(0, 0, 0, 0)',
    'rgba(0, 0, 0, 0.8)',
  ])

  const backdropBlur = useTransform(scrollY, scrollRange, [
    'blur(0px)',
    'blur(16px)',
  ])

  const borderOpacity = useTransform(scrollY, scrollRange, [0, 0.1])

  return (
    <nav className={cn('absolute left-0 right-0 top-16 z-30', className)}>
      <motion.div
        className="container mx-auto"
        // style={{
        //   width,
        //   paddingLeft: paddingLeft,
        //   paddingRight: paddingRight,
        //   borderRadius: 100,
        //   backgroundColor,
        //   backdropFilter: backdropBlur,
        //   borderWidth: borderOpacity,
        //   borderStyle: 'solid',
        //   borderColor: `rgba(0, 0, 0, ${borderOpacity})`,
        // }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Full width={160} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-1">
              <NavLink href="/tournaments">Règlement</NavLink>
              <NavLink href="/contact">Contacter</NavLink>
            </div>
            <Button variant="default">
              <Link href="/events" className="flex items-center gap-2">
                <Calendar />
                Évenements
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="p-2 md:hidden">
            <span className="sr-only">Open menu</span>
            {/* Add your menu icon here */}
          </button>
        </div>
      </motion.div>
    </nav>
  )
}

// NavLink component
const NavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <Link href={href}>
    <Button
      variant="ghost"
      className="group relative text-sm font-normal text-white/90 transition-colors hover:bg-white/20 hover:text-white hover:backdrop-blur-sm"
    >
      {children}
    </Button>
  </Link>
)

export default NavBar
