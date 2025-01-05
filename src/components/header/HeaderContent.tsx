// components/header/HeaderContent.tsx
import { ExternalLink } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Discord } from '@/components/icons/Discord'
import { Button } from '@/components/ui/button'
import { introVariants } from '@/lib/animations'

export function HeaderContent() {
  return (
    <div className="overflow-hidden">
      <motion.div {...introVariants.content}>
        <p className="text-sm xs:text-base text-center xs:text-left mb-8 max-w-xl md:max-w-2xl text-muted-foreground font-light">
          Tous nos tournois esport, centralisés et accessibles. Trouvez vos
          prochaines compétitions et inscrivez-vous en quelques clics.
        </p>

        <div className="flex items-center w-full xs:justify-between justify-center">
          <div className="flex flex-col 2xs:flex-row items-center gap-2">
            <Button
              size="lg"
              className="relative overflow-hidden  text-white w-full rounded-full  hover:text-[#5763ED] font-semibold group delay-75"
            >
              <div className="absolute inset-0 bg-[#3744DB] z-20 group-hover:-translate-y-full transition-all duration-300"></div>
              <div className="relative z-30 flex items-center justify-center gap-2">
                <span>Discord</span>
                <Discord className="group-hover:text-[#5763ED] delay-75" />
              </div>
            </Button>
            <Link
              href="https://lowping.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit pointer-events-none"
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
