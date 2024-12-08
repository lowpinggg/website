// app/page.tsx
import { Header } from "@/components/Header"

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className=" mx-auto h-screen">
        <Header />
      </section>
      <section className="h-screen"></section>
    </div>
  )
}