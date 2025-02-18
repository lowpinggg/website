import { supabase } from '@lib/services/supabase'

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

export async function getEventBySlug(slug: string) {
  return await supabase.from('events').select('*').eq('slug', slug).single()
}

export async function getUpcomingEvents() {
  return await supabase
    .from('events')
    .select('*')
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
    .limit(1)
    .single()
}
