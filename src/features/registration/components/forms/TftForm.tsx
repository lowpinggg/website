// features/registration/components/forms/TftForm.tsx
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

import { 
  TftFormData, 
  tftFields 
} from '@/features/registration/types/forms'

const formSchema = z.object({
  name: z.string().min(2, 'Nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  riotId: z.string().min(2, 'Riot ID doit contenir au moins 2 caractères'),
  rank: z.enum(['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'])
})

export function TftForm({
  onComplete,
  defaultValues
}: {
    onComplete: (data: TftFormData) => void
    defaultValues?: Partial<TftFormData>
}) {
  const form = useForm<TftFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: '',
      email: '',
      riotId: '',
      rank: 'IRON'
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onComplete)} className="space-y-4 w-full">
          {tftFields
            .filter((field) => ['name', 'email'].includes(field.name))
            .map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof TftFormData}
                render={({ field: formField }) => (
                  <FormItem
                  className="w-full"
                  
                  >
                    <FormLabel
                    className="text-xs font-normal"
                    >{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...formField}
                        
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-normal" />
                  </FormItem>
                )}
              />
            ))}
        {tftFields
          .filter((field) => !['name', 'email'].includes(field.name))
          .map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof TftFormData}
              render={({ field: formField }) => (
                <FormItem
                className="w-full"
                
                >
                  <FormLabel
                  className="text-xs font-normal"
                  >{field.label}</FormLabel>
                  <FormControl >
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
                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
            />
          ))}
        <div className='flex w-full justify-end'>
          <Button type="submit">{"S'inscrire"}</Button>
       </div>
      </form>
    </Form>
  )
}