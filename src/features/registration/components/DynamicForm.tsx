// features/registration/components/DynamicForm.tsx
'use client'

import {
  FormData,
  formRegistry,
  FormType
} from '@/features/registration/types/forms'
import { motion } from 'motion/react'

import { Database } from '@/types/generated-types'
import { animations } from '@/lib/animation'

type Props = {
  type: FormType
  event: Database['public']['Tables']['events']['Row']
  onComplete: (data: FormData) => void
  defaultValues?: Partial<FormData>
}

export function DynamicForm({ type, onComplete, defaultValues = {} }: Props) {
  const FormComponent = formRegistry[type].component

  return (
    <div>
      <motion.div
        className="w-full flex flex-col gap-4"
        variants={animations.stagger.parent}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={animations.stagger.child}>
          <h2 className="text-xl font-semibold">Registration Details</h2>
        </motion.div>
        <motion.div variants={animations.stagger.child}>
          <FormComponent
            onComplete={onComplete}
            defaultValues={defaultValues}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
