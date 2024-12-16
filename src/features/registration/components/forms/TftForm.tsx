// features/registration/components/forms/TftForm.tsx
'use client'

import { BaseForm } from '@/features/registration/components/forms/BaseForm'
import { TftFormData, formRegistry } from '@/features/registration/types/forms'

type Props = {
  onComplete: (data: TftFormData) => void
  defaultValues?: Partial<TftFormData>
}

export function TftForm({ onComplete, defaultValues }: Props) {
  const config = formRegistry.tft
  
  return (
    <BaseForm<TftFormData>
      baseFields={config.baseFields}
      specificFields={config.specificFields}
      schema={config.schema}
      onComplete={onComplete}
      defaultValues={defaultValues}
    />
  )
}