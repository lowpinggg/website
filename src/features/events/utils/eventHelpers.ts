// features/events/utils/eventHelpers.ts
import { format, parse } from 'date-fns'
import { fr } from 'date-fns/locale'

export const isEventPassed = (eventDate: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDateObj = new Date(eventDate)
  return eventDateObj < today
}

export const formatters = {
  date: (date: string) => format(new Date(date), 'd MMMM yyyy', { locale: fr }),
  time: (time: string) => format(parse(time, 'HH:mm:ss', new Date()), 'HH:mm', { locale: fr }),
  price: (amount: number) => new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'CAD'
  }).format(amount / 100)
}