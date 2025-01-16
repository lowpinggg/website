// features/home/components/Hero/components/ActionButtons.tsx
import { Calendar } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Discord } from '@components/icons'
import { introVariants } from '@lib/animations'
import { Button } from '@ui/button'

export function ActionButtons() {
  return (
    <motion.div
      variants={introVariants.content.button}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-2 sm:flex-row"
    >
      <Button variant="default" size="lg" className="px-6 mix-blend-screen">
        <Link href="/events" className="flex items-center gap-2">
          <Calendar />
          Évenements
        </Link>
      </Button>
      <Button
        size="lg"
        className="bg-white px-6 text-background mix-blend-screen hover:bg-white/80"
      >
        Discord
        <Discord className="text-[#000000]" />
      </Button>
    </motion.div>
  )
}
