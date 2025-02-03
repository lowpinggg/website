// features/home/components/Card/CardItem.tsx
import { MagicCard } from '@ui/magic-card'
import { LucideIcon } from 'lucide-react'
import { motion, useTransform, type MotionValue } from 'motion/react'

interface CardItemProps {
  title: string
  description: string
  Icon: LucideIcon
  scrollProgress: MotionValue<number>
  index: number
}

const CardItem: React.FC<CardItemProps> = ({
  title,
  description,
  Icon,
  scrollProgress,
  index,
}) => {
  const opacity = useTransform(
    scrollProgress,
    [0, 0.2 + index * 0.1, 0.3 + index * 0.1],
    [0, 0, 1],
  )

  const y = useTransform(
    scrollProgress,
    [0, 0.2 + index * 0.1, 0.3 + index * 0.1],
    [100, 100, 0],
  )

  const rotate = useTransform(
    scrollProgress,
    [0, 0.2 + index * 0.1, 0.3 + index * 0.1],
    [0, 10, 0],
  )

  return (
    <motion.div style={{ opacity, y, rotate }}>
      <MagicCard
        gradientFrom="white"
        gradientTo="transparent"
        className="flex min-h-[230px] flex-col items-start justify-center gap-4 rounded-xl p-6"
      >
        <Icon size={24} className="mb-4 text-white" />
        <h3 className="py-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm font-light leading-normal tracking-wide text-zinc-400">
          {description}
        </p>
      </MagicCard>
    </motion.div>
  )
}

export default CardItem
