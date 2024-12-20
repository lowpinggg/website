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
      <motion.div {...introVariants.content} className="w-full">
        <p className="text-xs sm:text-sm md:text-base text-center sm:text-left max-w-sm mb-8 sm:max-w-xl md:max-w-2xl text-muted-foreground font-light">
          Tous nos événements esport au même endroit. Inscrivez-vous aux
          prochains tournois, suivez vos résultats et participez à des
          compétitions bien structurées.
        </p>

        <div className="flex items-center justify-between w-full">
          <div className='sm:mx-0 mx-auto flex flex-col xs:flex-row justify-center gap-2'>
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
            className="w-full sm:w-fit pointer-events-none"
          >
            <Button size="lg" className="flex-1" disabled>
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
