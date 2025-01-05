// app/layout.tsx
import 'lenis/dist/lenis.css'
import { Alexandria } from 'next/font/google'
import { Providers } from '@/app/Providers'
import { Cursor } from '@/components/Cursor'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { generateMetadata } from './metadata'
import './globals.css'

const alexandria = Alexandria({
  subsets: ['latin'],
  variable: '--font-alexandria',
  weight: ['300', '400', '500', '700', '800', '900'],
})

export const metadata = generateMetadata() // This will use default values

// app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://js.stripe.com/v3" async />
      </head>
      <body
        className={cn(
          'relative bg-background font-alexandria text-white antialiased dark',
          alexandria.variable,
        )}
      >
        <Cursor />
        <SmoothScroll>
          <div className="pattern-overlay z-50" />
          <Providers>{children}</Providers>
          <Toaster />
        </SmoothScroll>
      </body>
    </html>
  )
}
