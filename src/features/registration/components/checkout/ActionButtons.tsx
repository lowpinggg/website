// features/registration/components/checkout/ActionButtons.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Download } from 'lucide-react'

type Props = {
  receiptUrl: string | null
  event: {
    name: string
    date: string
  }
}

export function ActionButtons({ receiptUrl, event }: Props) {
  const handleAddToCalendar = () => {
    const eventDate = new Date(event.date)
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}/${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}`
    window.open(url, '_blank')
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Link href="/" className="flex-1">
          <Button className="w-full">Retour à laccueil</Button>
        </Link>
        {receiptUrl && (
          <Link href={receiptUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Reçu
            </Button>
          </Link>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleAddToCalendar} className="flex-1">
          <Calendar className="mr-2 h-4 w-4" />
          Ajouter au calendrier
        </Button>
      </div>
    </div>
  )
}