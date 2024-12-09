// components/register/RegistrationForm.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
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
import { FormData, formConfigs } from '@/types/registration'

type Props = {
  type: keyof typeof formConfigs
  event: {
    id: string
    name: string
    date: string
  }
  onComplete: (data: FormData) => void
}

export default function RegistrationForm({ type, onComplete }: Props) {
  const config = formConfigs[type]

  // Create dynamic schema based on field configurations
  const schemaObject: Record<string, z.ZodType> = {}
  config.fields.forEach(field => {
    if (field.type === 'email') {
      schemaObject[field.name] = z.string().email('Email invalide')
    } else if (field.type === 'select' && field.options) {
      schemaObject[field.name] = z.enum(field.options as [string, ...string[]], {
        required_error: `${field.label} est requis`
      })
    } else {
      schemaObject[field.name] = z.string().min(2, `${field.label} doit contenir au moins 2 caractères`)
    }
  })

  const formSchema = z.object(schemaObject)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: config.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: ''
    }), {})
  })

  const renderField = (field: typeof config.fields[number]) => (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name}
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
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onComplete)} className="space-y-6 max-w-md">
        <div className="flex gap-4">
          {config.fields
            .filter(f => ['name', 'email'].includes(f.name))
            .map(renderField)}
        </div>
        {config.fields
          .filter(f => !['name', 'email'].includes(f.name))
          .map(renderField)}
        <Button type="submit">Sinscrire</Button>
      </form>
    </Form>
  )
}