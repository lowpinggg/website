import { supabase } from '@/lib/supabase'

export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })
  return { data, error }
}

export async function getEventById(id: string) {
  return await supabase.from('events').select('*').eq('id', id).single()
}
