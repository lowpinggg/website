// components/header/Header.tsx
import { Full } from '@lowping/brand-kit'
import { motion } from 'motion/react'

import { introVariants } from '@/lib/animations/variants'
import { HeaderContent } from '@/components/header/HeaderContent'
import { HeaderTitle } from '@/components/header/HeaderTitle'

export function Header() {
  return (
    <motion.div
      {...introVariants.container}
      className="origin-center sm:origin-left"
    >
      <div className="flex-col flex justify-center items-center sm:items-start gap-2 relative z-40 py-24">
        <div className="overflow-hidden">
          <motion.div
            variants={introVariants.logo}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <Full width={180} />
          </motion.div>
        </div>

        <HeaderTitle />
        <HeaderContent />
      </div>
    </motion.div>
  )
}
