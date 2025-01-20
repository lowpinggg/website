import { Calendar, Clock, Info, Ticket, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import { GameBadge } from '@components/GameBadge'
import { Separator } from '@components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip'
import { formatters } from '@events/utils/eventHelpers'
import type { Database } from '@generated/index'
import { staggerVariants } from '@lib/animations'

//TODO: Make prize pool dynamic from the database
//TODO: Add dropdown with more info about the event

type Props = {
  event: Database['public']['Tables']['events']['Row']
}

export function EventSummaryCard({ event }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <motion.div
        variants={staggerVariants.child}
        className="rounded-md border border-[#BFF603]/20 bg-gradient-to-r from-[#BFF603]/10 to-[#BFF603]/5 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <Trophy size={16} className="text-[#BFF603]" />
              <span className="text-sm font-semibold text-[#BFF603]">
                Prize Pool Dynamique
              </span>
            </div>
            <p className="text-xs text-[#BFF603]/90">
              {"100% des frais d'inscription alimentent le prize pool"}
            </p>
          </div>
          <div>
            <TooltipProvider delayDuration={0} skipDelayDuration={500}>
              <Tooltip>
                <TooltipTrigger className="cursor-null duration-1200 rounded-full p-2 text-[#BFF603] transition-all hover:-translate-y-0.5  hover:bg-black/50 hover:text-white">
                  <Info size={16} />
                </TooltipTrigger>
                <TooltipContent className="TooltipContent w-full">
                  <p className="text-xs">
                    {
                      "Plus il y a de participants, plus le prize pool augmente! L'intégralité des frais d'inscription est reversée dans le prize pool final."
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={staggerVariants.child}
        className="w-full rounded-lg border border-white/10 bg-black/30 p-5"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col-reverse items-start justify-between gap-2 lg:flex-row lg:gap-0">
            <h3 className="pr-6 text-base font-bold text-white">
              {event.name}
            </h3>
            <GameBadge game={event.game} />
          </div>

          <Separator className="bg-white/5" />

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-white/50" />
                <p className="text-xs text-white/50">Date</p>
              </div>
              <p className="text-sm font-medium text-white">
                {formatters.date(event.date)}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-white/50" />
                <p className="text-xs text-white/50">Heure</p>
              </div>
              <p className="text-sm font-medium text-white">
                {formatters.time(event.time)} EST
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <Ticket size={14} className="text-white/50" />
                <p className="text-xs text-white/50">Inscription</p>
              </div>
              <p className="text-sm font-medium text-white">
                ${formatters.price(event.price)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
