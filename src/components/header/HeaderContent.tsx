// components/header/HeaderContent.tsx
import Link from 'next/link'
import { Globe } from 'lucide-react'
import { motion } from 'motion/react'

import { introVariants } from '@/lib/animations'
import { Button } from '@/components/ui/button'
import { DiscordLogo } from '@/components/icons/DiscordLogo'

export function HeaderContent() {
  return (
    <div className="overflow-hidden">
      <motion.div {...introVariants.content} className="w-full">
        <p className="text-xs sm:text-base text-center sm:text-left mb-8 sm:max-w-2xl text-muted-foreground font-light">
          Tous nos événements esport au même endroit. Inscrivez-vous aux
          prochains tournois, suivez vos résultats et participez à des
          compétitions bien structurées.
        </p>

        <div className="flex flex-col xs:flex-row items-center gap-2">
          <Button
            size="lg"
            className="bg-[#5763ED] text-white hover:bg-[#3744DB] w-full sm:w-fit"
          >
            Discord
            <DiscordLogo />
          </Button>

          <Link
            href="https://lowping.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-fit pointer-events-none"
          >
            <Button size="lg" className="flex gap-1 w-full" disabled>
              <Globe size={24} />
              Website (soon)
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
