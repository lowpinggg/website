// app/metadata.ts
import { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const defaultMetadata = {
  title: 'Lowping - Portail Événementiel',
  description:
    'Tous nos événements esport au même endroit. Inscrivez-vous aux prochains tournois, suivez vos résultats et participez à des compétitions bien structurées.',
} as const

interface MetadataParams {
  title?: string
  description?: string
}

export async function generateMetadata({
  title = defaultMetadata.title,
  description = defaultMetadata.description,
}: MetadataParams = {}): Promise<Metadata> {
  return {
    title: title,
    description: description,
    metadataBase: new URL('https://events.lowping.gg'),
    twitter: {
      card: 'summary_large_image',
    },
  }
}
