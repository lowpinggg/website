// features/registration/components/forms/DynamicForm.tsx
'use client'

import { FormData, formRegistry, FormType } from '@registration/types/forms'

type Props = {
  type: FormType
  onComplete: (data: FormData) => void
  defaultValues?: Partial<FormData>
}

export function DynamicForm({ type, onComplete, defaultValues }: Props) {
  const FormComponent = formRegistry[type].component

  return <FormComponent onComplete={onComplete} defaultValues={defaultValues} />
}
