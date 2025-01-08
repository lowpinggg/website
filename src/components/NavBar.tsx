/* eslint-disable @typescript-eslint/no-unused-vars */
// NavBar.tsx
'use client'

import { Calendar } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { cn } from '@lib/utils'
import { Full } from '@lowping/brand-kit'

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
    <nav className={cn('absolute top-16 left-0 right-0 z-50', className)}>
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
          <div className="hidden md:flex items-center gap-4">
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
          <button className="md:hidden p-2">
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
      className="text-sm font-normal hover:bg-white/20 hover:backdrop-blur-sm text-white/90 hover:text-white transition-colors relative group"
    >
      {children}
    </Button>
  </Link>
)

// Lightning Icon component
const LightningIcon = () => (
  <svg
    width="12"
    height="15"
    viewBox="0 0 12 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.3368 0.505218C7.3368 0.286632 7.19563 0.0923341 6.98767 0.0247767C6.77971 -0.042773 6.55201 0.0308486 6.423 0.208449L0.205459 8.75757C0.0938893 8.91088 0.0779511 9.11428 0.163716 9.28353C0.250239 9.45278 0.424037 9.5598 0.613788 9.5598H4.77216V14.4946C4.77216 14.7132 4.91257 14.9075 5.12129 14.975C5.32925 15.0426 5.55695 14.969 5.68596 14.7914L11.9035 6.24224C12.0151 6.08893 12.031 5.88553 11.9452 5.71627C11.8587 5.54702 11.6849 5.44 11.4944 5.44H7.33682L7.3368 0.505218Z"
      fill="currentColor"
    />
  </svg>
)

export default NavBar
