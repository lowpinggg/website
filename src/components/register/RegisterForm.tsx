'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const ranks = [
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER"
] as const

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  discord: z.string().min(2, "Le Discord doit contenir au moins 2 caractères"),
  riotId: z.string().min(2, "Le Riot ID doit contenir au moins 2 caractères"),
  rank: z.enum(ranks, {
    required_error: "Veuillez sélectionner votre rang",
  })
})

type RegisterFormProps = {
  event: {
    id: string
    name: string
    date: string
  }
  onComplete: (data: z.infer<typeof formSchema>) => void
}

export default function RegisterForm({ event, onComplete }: RegisterFormProps) {
  console.log("RegisterForm - event:", event);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'fef',
      email: 'fe@jd.com',
      discord: 'wd',
      riotId: 'wd',
      rank: "IRON"
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onComplete(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        <div className='flex gap-4'>
      
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
            </div>
        <FormField
          control={form.control}
          name="discord"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Votre#0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="riotId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Riot ID</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Pseudo#TAG" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rang actuel</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre rang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ranks.map((rank) => (
                    <SelectItem key={rank} value={rank}>
                      {rank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{`S'inscrire`}</Button>
      </form>
    </Form>
  )
}