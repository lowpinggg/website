// app/[event]/register/page.tsx
import { RegisterClient } from '@/app/[event]/register/client'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Database } from '@/types/generated-types'

type Event = Database['public']['Tables']['events']['Row']
type Props = {
  params: Promise<{ event: string }>
}


export default async function RegisterPage({ params }: Props) {
  const e = await params
  console.log("RegisterPage - event:", e);

  if (!e) {
    return notFound()
  }
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', e.event)
    .single()

  if (error || !event) {
    return notFound()
  }

  return <RegisterClient event={event as Event} />
}

export async function generateStaticParams() {
  const { data: events } = await supabase
    .from('events')
    .select('id')

  return events?.map(event => ({
    event: event.id
  })) || []
}