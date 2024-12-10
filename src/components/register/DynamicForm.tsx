'use client'

import { AnimatePresence, motion } from 'motion/react'

import { Database } from '@/types/generated-types'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { FormData, formRegistry, FormType } from './forms'

type Props = {
  type: FormType
  event: Database['public']['Tables']['events']['Row']
  onComplete: (data: FormData) => void
  defaultValues: FormData
}

export function DynamicForm({ type, event, onComplete, defaultValues }: Props) {
  const FormComponent = formRegistry[type].component

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delay: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.19, 1, 0.22, 1], duration: 2.2 }
    }
  }

  return (
      <motion.div
        className="flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col gap-1 w-full overflow-hidden"
          variants={itemVariants}
        >
          <motion.div
            className="text-sm text-muted-foreground mb-4"
            variants={itemVariants}
          >
            <div className="flex gap-2">
              <Badge className="font-medium" variant={'outline'}>
                Registration
              </Badge>
              <Badge className="font-medium">{event.game}</Badge>
            </div>
          </motion.div>
          <motion.div
            className="text-xl font-bold flex flex-col py-2"
            variants={itemVariants}
          >
            <div className="flex flex-col gap-2">
              <h1 className='text-2xl'>{event.name}</h1>

              <div className="flex items-end justify-between text-sm font-normal">
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Ticket: {(event.price / 100).toFixed(2)} $CAD</p>
              </div>
            </div>
     
          </motion.div>
          <Separator />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormComponent
            onComplete={onComplete}
            defaultValues={defaultValues}
          />
        </motion.div>
      </motion.div>
  )
}
