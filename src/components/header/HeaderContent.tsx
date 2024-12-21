// components/header/HeaderContent.tsx
import Link from 'next/link'
import { Globe } from 'lucide-react'
import { motion } from 'motion/react'

import { introVariants } from '@/lib/animations'
import { Button } from '@/components/ui/button'
import { Discord } from '@/components/icons/Discord'

export function HeaderContent() {
  return (
    <div className="overflow-hidden">
      <motion.div {...introVariants.content}>
        <p className="text-sm xs:text-base text-center xs:text-left max-w-md mb-8 sm:max-w-xl md:max-w-2xl text-muted-foreground font-light">
          Tous nos événements esport au même endroit. Inscrivez-vous aux
          prochains tournois, suivez vos résultats et participez à des
          compétitions bien structurées.
        </p>

        <div className="flex items-center w-full xs:justify-between justify-center">
  <div className="flex flex-col 2xs:flex-row items-center gap-2">
    <Button
      size="lg"
      className="bg-[#5763ED] text-white hover:bg-[#3744DB] w-full"
    >
      Discord
      <Discord />
    </Button>
    <Link
      href="https://lowping.gg"
      target="_blank"
      rel="noopener noreferrer"
      className="w-fit pointer-events-none"
    >
      <Button size="lg" disabled>
        <Globe size={24} />
        Website (soon)
      </Button>
    </Link>
  </div>
</div>
      </motion.div>
    </div>
  )
}
