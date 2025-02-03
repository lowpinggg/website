// components/navigation/MobileMenu.tsx
import Link from 'next/link'
import { Discord, Facebook, Instagram, X } from '@components/icons'
import { menuVariants } from '@lib/animations/variants/menu'
import { Full } from '@lowping/brand-kit'
import { X as XIcon } from 'lucide-react'
import { motion } from 'motion/react'

interface MobileMenuProps {
  onClose: () => void
  navLinks: Array<{ href: string; label: string; target?: '_self' | '_blank' }>
}

export function MobileMenu({ onClose, navLinks }: MobileMenuProps) {
  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden bg-primary"
      variants={menuVariants.overlay}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="absolute left-0 right-0 top-0 z-30 w-full px-5 pt-10 lg:pt-14">
        <div className="container mx-auto">
          <div className="flex items-center justify-between overflow-hidden">
            <motion.div className="z-50">
              <Link
                href="/"
                className="flex items-center gap-2 p-1.5 transition-opacity hover:opacity-80"
              >
                <Full width={170} color="black" />
              </Link>
            </motion.div>
            <motion.button
              className="relative z-50 p-1.5 transition-transform duration-300 hover:scale-90"
              onClick={onClose}
            >
              <XIcon size={32} color="black" />
              <span className="sr-only">Close menu</span>
            </motion.button>
          </div>
        </div>
      </div>
      <div className="container absolute inset-0 mx-auto flex h-screen flex-col justify-end">
        <motion.div
          className="flex flex-col justify-end gap-2 overflow-hidden px-5 pb-12"
          variants={menuVariants.container}
          initial="initial"
          animate="animate"
        >
          {navLinks.map((link, i) => (
            <div className="overflow-hidden" key={link.href}>
              <motion.div
                custom={i}
                variants={menuVariants.item}
                className="w-full p-1.5 text-start"
              >
                <Link
                  href={link.href}
                  target={link.target || '_self'}
                  className="text-5xl  font-medium tracking-tight text-background hover:text-background/80"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </motion.div>
            </div>
          ))}
        </motion.div>
        <motion.div
          variants={menuVariants.social}
          initial="initial"
          animate="animate"
          className="flex w-full justify-start gap-4 overflow-hidden px-5 py-6"
        >
          <motion.div variants={menuVariants.item}>
            <Link
              href="https://www.facebook.com/lowping.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook
                size={24}
                className="h-5 w-5 text-background hover:text-background/80"
              />
            </Link>
          </motion.div>
          <motion.div variants={menuVariants.item}>
            <Link
              href="https://discord.gg/lowping"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Discord
                size={24}
                className="h-5 w-5 text-background hover:text-background/80"
              />
            </Link>
          </motion.div>
          <motion.div variants={menuVariants.item}>
            <Link
              href="https://x.com/lowping"
              target="_blank"
              rel="noopener noreferrer"
            >
              <X
                size={24}
                className="h-5 w-5 text-background hover:text-background/80"
              />
            </Link>
          </motion.div>
          <motion.div variants={menuVariants.item}>
            <Link
              href="https://www.instagram.com/lowping.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                size={24}
                className="h-5 w-5 text-background hover:text-background/80"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
