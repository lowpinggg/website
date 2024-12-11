// app/page.tsx
import { supabase } from '@/lib/supabase'
import HomeClient from './HomeClient'
import { Database } from '@/types/generated-types'

type Event = Database['public']['Tables']['events']['Row']

async function getEvents(): Promise<Event[]> {
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
  return <HomeClient events={events} />
}