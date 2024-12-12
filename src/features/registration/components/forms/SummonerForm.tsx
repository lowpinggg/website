// features/registration/components/forms/SummonerForm.tsx
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
  SummonerFormData, 
  summonerFields 
} from '@/features/registration/types/forms'

const formSchema = z.object({
  name: z.string().min(2, 'Nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  discord: z.string().min(2, 'Discord doit contenir au moins 2 caractères'),
  riotId: z.string().min(2, 'Riot ID doit contenir au moins 2 caractères'),
  rank: z.enum(['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'])
})

export function SummonerForm({
  onComplete
}: {
  onComplete: (data: SummonerFormData) => void
}) {
  const form = useForm<SummonerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      discord: '',
      riotId: '',
      rank: 'IRON'
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onComplete)} className="space-y-4">
        <div className="flex gap-2">
          {summonerFields
            .filter((field) => ['name', 'email'].includes(field.name))
            .map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof SummonerFormData}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
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
        </div>

        {summonerFields
          .filter((field) => !['name', 'email'].includes(field.name))
          .map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof SummonerFormData}
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