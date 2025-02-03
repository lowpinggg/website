// app/layout.tsx
import 'lenis/dist/lenis.css'
import { Alexandria } from 'next/font/google'
import { Providers } from '@app/Providers'
import '@app/globals.css'
import { Cursor } from '@components/Cursor'
import { SmoothScroll } from '@components/SmoothScroll'
import { cn } from '@lib/utils'
import { Toaster } from '@ui/toaster'

export { generateMetadata } from '@app/metadata'

const alexandria = Alexandria({
  subsets: ['latin'],
  variable: '--font-alexandria',
  weight: ['300', '400', '500', '700', '800', '900'],
})

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
      <body className={cn(alexandria.variable, 'overflow-x-hidden')}>
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
