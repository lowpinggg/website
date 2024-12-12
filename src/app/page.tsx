// app/page.tsx
import { EventSection } from '@/features/events/components/EventSection'

export default async function Home() {

    
    return (
      <main className="min-h-screen">
        <EventSection />
        {/* Add other sections here */}
      </main>
    )
 
}