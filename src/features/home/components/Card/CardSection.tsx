// features/home/components/Card/CardSection.tsx
import { HeadphonesIcon, Smartphone, Zap } from 'lucide-react'
import CardItem from './CardItem'

export const CardSection: React.FC = () => {
  const cards = [
    {
      Icon: Zap,
      title: 'Règles équitables',
      description:
        'Une équipe dédiée à chaque tournoi. Du planning à la finale, nous assurons une gestion impeccable de votre événement.',
    },
    {
      Icon: HeadphonesIcon,
      title: 'Support dédié',
      description:
        'Une équipe disponible durant vos tournois. Des réponses rapides pour résoudre vos questions ou problèmes.',
    },
    {
      Icon: Smartphone,
      title: 'Expérience fluide',
      description:
        "Interface intuitive, processus simplifiés. De l'inscription à la finale, tout est pensé pour faciliter votre expérience.",
    },
  ]

  return (
    <section className="w-full pt-40 pb-20 container mx-auto">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-white text-4xl font-black text-center">
          DES TOURNOIS SANS PRISE DE TÊTE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <CardItem
              key={index}
              Icon={card.Icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CardSection
