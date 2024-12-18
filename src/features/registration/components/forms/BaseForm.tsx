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

  const renderField = (field: BaseField) => (
    <motion.div variants={staggerVariants.list.child} key={field.name}>
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
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  )

  return (
    <Form {...form}>
      <motion.form
        variants={staggerVariants.list.parent}
        initial="initial"
        animate="animate"
        onSubmit={form.handleSubmit(onComplete)}
        className="space-y-6"
      >
        <motion.div variants={staggerVariants.list.child} className="space-y-4">
          {baseFields.map(renderField)}
        </motion.div>

        <motion.div variants={staggerVariants.list.child} className="space-y-4">
          {specificFields.map(renderField)}
        </motion.div>

        <motion.div variants={staggerVariants.list.child}>
          <Button type="submit" className="w-full">
            {"S'inscrire"}
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  )
}
