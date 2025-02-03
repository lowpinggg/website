// components/header/HeaderContent.tsx
import Link from 'next/link'
import { Discord } from '@components/icons/Discord'
import { introVariants } from '@lib/animations'
import { Button } from '@ui/button'
import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'

export function HeaderContent() {
  return (
    <div className="overflow-hidden">
      <motion.div {...introVariants.content}>
        <p className="mb-8 max-w-xl text-center text-sm font-light text-muted-foreground xs:text-left xs:text-base md:max-w-2xl">
          Tous nos tournois esport, centralisés et accessibles. Trouvez vos
          prochaines compétitions et inscrivez-vous en quelques clics.
        </p>

        <div className="flex w-full items-center justify-center xs:justify-between">
          <div className="flex flex-col items-center gap-2 2xs:flex-row">
            <Button
              size="lg"
              className="group relative  w-full overflow-hidden rounded-full  font-semibold text-white delay-75 hover:text-[#5763ED]"
            >
              <div className="absolute inset-0 z-20 bg-[#3744DB] transition-all duration-300 group-hover:-translate-y-full"></div>
              <div className="relative z-30 flex items-center justify-center gap-2">
                <span>Discord</span>
                <Discord className="delay-75 group-hover:text-[#5763ED]" />
              </div>
            </Button>
            <Link
              href="https://lowping.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-none w-fit"
            >
              <Button size="lg" disabled className="flex gap-2 rounded-full">
                Lowping.gg
                <ExternalLink size={24} />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
