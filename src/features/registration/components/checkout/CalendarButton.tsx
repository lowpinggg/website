// features/registration/components/checkout/ActionButtons.tsx
'use client'

import { Calendar } from 'lucide-react'

import { Button } from '@/components/ui/button'

type Props = {
  event: {
    name: string
    date: string
  }
}

export function CalendarButton({ event }: Props) {
  const handleAddToCalendar = () => {
    const eventDate = new Date(event.date)
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}/${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}`
    window.open(url, '_blank')
  }

  return (
    <Button
      variant="link"
      onClick={() => handleAddToCalendar()}
      className="p-0 m-0"
    >
      <Calendar size={16} />
      Ajouter au calendrier
    </Button>
  )
}
