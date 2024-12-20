import { supabase } from '@/lib/supabase'

export async function getEvents() {

  return await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })
}

export async function getEventById(id: string) {
  return await supabase.from('events').select('*').eq('id', id).single()
}
