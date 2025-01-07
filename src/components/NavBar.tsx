// NavBar.tsx
'use client'

import { motion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@components/ui/button'
import { Full } from '@lowping/brand-kit'

//import { TRANSITIONS } from '@lib/animations'

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      console.log(latest)
      if (latest > 0) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    })

    return () => unsubscribe()
  }, [scrollY])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        className="container mx-auto "
        animate={{
          width: scrolled ? 'calc(100% - 24rem)' : 'calc(100% - 1rem)',
          paddingLeft: scrolled ? '1rem' : '0',
          paddingRight: scrolled ? '1rem' : '0',
          borderRadius: scrolled ? '9999px' : '0',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1.03] }}
      >
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Full width={125} />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/events"
              className="text-sm hover:text-primary transition-colors"
            >
              Événements
            </Link>
            <Link
              href="/tournaments"
              className="text-sm hover:text-primary transition-colors"
            >
              Reglements
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-primary transition-colors"
            >
              À propos
            </Link>
            <Link href="/events" className="text-base">
              <Button
                variant="default"
                className="flex gap-2 bg-[#BFF603] text-black rounded-full"
              >
                <svg
                  width="12"
                  height="15"
                  viewBox="0 0 12 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.3368 0.505218C7.3368 0.286632 7.19563 0.0923341 6.98767 0.0247767C6.77971 -0.042773 6.55201 0.0308486 6.423 0.208449L0.205459 8.75757C0.0938893 8.91088 0.0779511 9.11428 0.163716 9.28353C0.250239 9.45278 0.424037 9.5598 0.613788 9.5598H4.77216V14.4946C4.77216 14.7132 4.91257 14.9075 5.12129 14.975C5.32925 15.0426 5.55695 14.969 5.68596 14.7914L11.9035 6.24224C12.0151 6.08893 12.031 5.88553 11.9452 5.71627C11.8587 5.54702 11.6849 5.44 11.4944 5.44H7.33682L7.3368 0.505218Z"
                    fill="black"
                  />
                </svg>
                Événements
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}
