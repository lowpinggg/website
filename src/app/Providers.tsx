// components/Providers.tsx
'use client'
import { AnimatePresence } from 'motion/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>
}