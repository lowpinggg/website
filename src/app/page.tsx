// app/page.tsx
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
  
  if (error) {
    console.error('Error fetching events:', error)
    return []
  }

  return data
}

export default async function Home() {
  const events = await getEvents()

  return (
    <>
      <h1>Events</h1>
      <div>
        {events.map(event => (
          <div key={event.id}>
            <h2>{event.name}</h2>
            <p>Date: {event.date}</p>
            <p>Price: ${event.price}</p>
            <Link href={`/${event.id}/register`}>
              <Button>Register</Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}