'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Thunder } from '@components/icons'
import { Button } from '@components/ui/button'
import { useUpcomingEvent } from '@features/events/hooks/useEvents'
import { introVariants } from '@lib/animations'
import { Full } from '@lowping/brand-kit'

const navLinks = [
  { href: '/tournaments', label: 'Règlement' },
  { href: '/contact', label: 'Contacter' },
]

export function NavBar() {
  const { upcomingEvent } = useUpcomingEvent()
  return (
    <nav className="absolute left-0 right-0 top-0 z-30 w-full pt-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-between overflow-hidden">
          {/* Logo */}
          <motion.div
            variants={introVariants.navigation.logo}
            initial="initial"
            animate="animate"
          >
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <Full width={160} />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex">
            <motion.div
              variants={introVariants.navigation.navLinks.container}
              initial="initial"
              animate="animate"
              className="flex items-center gap-0"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={introVariants.navigation.navLinks.item}
                >
                  <NavLink href={link.href}>{link.label}</NavLink>
                </motion.div>
              ))}

              <motion.div
                variants={introVariants.navigation.navLinks.item}
                className="ml-2"
              >
                <Button
                  variant="default"
                  size="sm"
                  className="flex h-10 items-center gap-1.5 pl-2.5 pr-3 mix-blend-screen"
                >
                  <Thunder size={16} />
                  <Link
                    href={`/events/${upcomingEvent?.slug}/register`}
                    target="_blank"
                    className="flex items-center gap-2 text-sm"
                  >
                    Évènement
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button className="p-2 md:hidden">
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

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
