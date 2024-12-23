// features/registration/components/forms/BaseForm.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { DefaultValues, Path, useForm } from 'react-hook-form'
import { z } from 'zod'

import { staggerVariants } from '@/lib/animations'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { BaseField, FormData } from '../../types/forms'

interface BaseFormProps<T extends FormData> {
  baseFields: readonly BaseField[]
  specificFields: readonly BaseField[]
  schema: z.ZodType<T>
  onComplete: (data: T) => void
  defaultValues?: DefaultValues<T>
}

export function BaseForm<T extends FormData>({
  baseFields,
  specificFields,
  schema,
  onComplete,
  defaultValues
}: BaseFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues
  })

  // Combine all fields
  const allFields = [...baseFields, ...specificFields]

  const renderField = (field: BaseField) => (
    <motion.div variants={staggerVariants.child} key={field.name} className='cursor-border'>
      <FormField
        control={form.control}
        name={field.name as Path<T>}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              {field.type === 'select' ? (
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...formField}
                />
              )}
            </FormControl>
            <FormMessage className='text-xs' />
          </FormItem>
        )}
      />
    </motion.div>
  )

  return (
    <Form {...form}>
      <motion.form
        variants={staggerVariants.parent}
        initial="initial"
        animate="animate"
        onSubmit={form.handleSubmit(onComplete)}
        className="space-y-4"
      >
        <motion.div 
          variants={staggerVariants.child} 
          className="flex flex-col gap-4"
        >
          {allFields.map(renderField)}
        </motion.div>
        <motion.div variants={staggerVariants.child} className='pt-4'>
          <Button type="submit" className="w-full">
            {"S'inscrire"}
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  )
}