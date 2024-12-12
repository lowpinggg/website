import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/generated-types'

export async function getEvents() {
  const supabase = createClientComponentClient<Database>()
  
  return await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
}