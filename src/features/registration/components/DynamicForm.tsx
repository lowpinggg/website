// features/registration/components/DynamicForm.tsx
'use client'

import {
  FormData,
  formRegistry,
  FormType
} from '@/features/registration/types/forms'
import { motion } from 'motion/react'
import { Database } from '@/types/generated-types'

type Props = {
  type: FormType
  event: Database['public']['Tables']['events']['Row']
  onComplete: (data: FormData) => void
  defaultValues?: Partial<FormData>
}

export function DynamicForm({ type, onComplete, defaultValues = {} }: Props) {
  const FormComponent = formRegistry[type].component

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col gap-2"
      >
        <motion.h2 className="text-lg font-semibold">
          Registration Details
        </motion.h2>
        <motion.div>
          <FormComponent
            onComplete={onComplete}
            defaultValues={defaultValues}
          />
        </motion.div>
      </motion.div>
  )
}
