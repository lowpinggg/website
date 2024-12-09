// types/registration.ts
export type BaseField = {
  name: string
  label: string
  type: 'text' | 'email' | 'select'
  placeholder: string
  options?: string[]
  required?: boolean
}

export type FormData = Record<string, string>

export type FormConfig = {
  fields: BaseField[]
}

export const formConfigs: Record<string, FormConfig> = {
  tft: {
    fields: [
      { name: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
      { name: 'riotId', label: 'Riot ID', type: 'text', placeholder: 'Pseudo#TAG' },
      { 
        name: 'rank', 
        label: 'Rang actuel', 
        type: 'select', 
        placeholder: 'Sélectionnez votre rang',
        options: ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER']
      }
    ]
  },
  summoner: {
    fields: [
      { name: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
      { name: 'discord', label: 'Discord', type: 'text', placeholder: 'Votre#0000' },
      { name: 'riotId', label: 'Riot ID', type: 'text', placeholder: 'Pseudo#TAG' },
      { 
        name: 'rank', 
        label: 'Rang actuel', 
        type: 'select', 
        placeholder: 'Sélectionnez votre rang',
        options: ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER']
      }
    ]
  }
}