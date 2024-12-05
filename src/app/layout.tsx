import type { Metadata } from 'next'
import { Alexandria } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/navbar'

const alexandria = Alexandria({
  subsets: ['latin'],
  variable: '--font-alexandria',
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Lowping - Esports Tournaments',
  description: 'Professional esports tournament platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'max-w-page relative bg-background font-alexandria text-white antialiased',
          alexandria.variable
        )}
      >
        <div className="pattern-overlay z-50" />
        <div className="relative">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
