// components/register/forms/TftForm.tsx
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
import { FormField as CustomFormField } from '.'

export const tftFields: CustomFormField[] = [
  { name: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
  { name: 'riotId', label: 'Riot ID', type: 'text', placeholder: 'Pseudo#TAG' },  
  { 
    name: 'rank', 
    label: 'Rang', 
    type: 'select', 
    placeholder: 'Sélectionnez votre rang',
    options: ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']
  }
] as const

const formSchema = z.object({
  name: z.string().min(2, "Nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  riotId: z.string().min(2, "Riot ID doit contenir au moins 2 caractères"),
  rank: z.enum(['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'])
})

export type TftFormData = z.infer<typeof formSchema>

export function TftForm({
  onComplete,
  defaultValues,
}: {
  onComplete: (data: TftFormData) => void;
  defaultValues: TftFormData;
}) {
  const form = useForm<TftFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onComplete)} className="space-y-4">
        <div className="flex gap-2">
          {tftFields
            .filter(field => ['name', 'email'].includes(field.name))
            .map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as keyof TftFormData}
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
                    <FormMessage className='text-xs font-normal' />
                  </FormItem>
                )}
              />
            ))}
        </div>

        {tftFields
          .filter(field => !['name', 'email'].includes(field.name))
          .map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as keyof TftFormData}
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
                  <FormMessage className='text-xs font-normal' />
                </FormItem>
              )}
            />
          ))}

        <Button type="submit">Sinscrire</Button>
      </form>
    </Form>
  )
}