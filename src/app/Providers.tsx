// components/Providers.tsx
'use client'

import { AnimatePresence } from 'motion/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// components/Providers.tsx

// components/Providers.tsx

// components/Providers.tsx

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
