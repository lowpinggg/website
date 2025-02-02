// features/home/components/Hero/components/ActionButtons.tsx
import { motion } from 'motion/react'
import Link from 'next/link'
import { Discord } from '@components/icons'
import { Thunder } from '@components/icons'
import { useUpcomingEvent } from '@features/events/hooks/useEvents'
import { introVariants } from '@lib/animations'
import { Button } from '@ui/button'

export function ActionButtons() {
  const { upcomingEvent } = useUpcomingEvent()
  return (
    <motion.div
      variants={introVariants.content.button}
      initial="initial"
      animate="animate"
      className="flex flex-row justify-center gap-2"
    >
      <Button
        variant="default"
        size="lg"
        className="flex items-center gap-1.5 pl-3 pr-4 mix-blend-screen"
      >
        <Thunder size={18} />
        <Link
          href={`/events/${upcomingEvent?.slug}/register`}
          target="_blank"
          className="flex items-center gap-2"
        >
          Évènement
        </Link>
      </Button>
      <Button
        size="lg"
        className="bg-white px-8 text-background mix-blend-screen hover:bg-white/80"
      >
        Discord
        <Discord className="text-[#000000]" />
      </Button>
    </motion.div>
  )
}
