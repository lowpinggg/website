// features/registration/components/layout/PaymentStatus/CancelledView.tsx
import Link from 'next/link'
import { baseVariants, staggerVariants } from '@lib/animations'
import { Button } from '@ui/button'
import { X } from 'lucide-react'
import { motion } from 'motion/react'

interface CancelledViewProps {
  title: string
  description: string
}

export function CancelledView({ title, description }: CancelledViewProps) {
  return (
    <motion.div
      variants={baseVariants.slideUp}
      initial="initial"
      animate="animate"
      className="flex items-center justify-center"
    >
      <motion.div
        variants={staggerVariants.parent}
        className="flex max-w-md flex-col items-center gap-4 text-center"
      >
        <motion.div variants={staggerVariants.child}>
          <X size={50} className="text-red-500" />
        </motion.div>
        <motion.h1
          variants={staggerVariants.child}
          className="text-2xl font-bold"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={staggerVariants.child}
          className="text-sm text-muted-foreground"
        >
          {description}
        </motion.p>
        <motion.div variants={staggerVariants.child}>
          <Link href="/">
            <Button variant="outline">Retour</Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
