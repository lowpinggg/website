// features/home/components/Card/CardItem.tsx
import { LucideIcon } from 'lucide-react'

interface CardItemProps {
  title: string
  description: string
  Icon: LucideIcon
}

const CardItem: React.FC<CardItemProps> = ({ title, description, Icon }) => {
  return (
    <div className="bg-[#080A09] rounded-xl p-6 border border-white/10 flex flex-col items-start gap-4 min-h-[230px] justify-center">
      <Icon size={24} className="text-white" />
      <h3 className="text-white text-xl font-semibold py-2">{title}</h3>
      <p className="text-zinc-400 leading-normal font-light text-sm tracking-wide">
        {description}
      </p>
    </div>
  )
}

export default CardItem
