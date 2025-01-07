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
  path?: string
}

export async function generateMetadata({
  title = defaultMetadata.title,
  description = defaultMetadata.description,
  path = '',
}: MetadataParams = {}): Promise<Metadata> {
  return {
    title: title,
    description: description,
    metadataBase: new URL('https://events.lowping.gg'),
    openGraph: {
      title: title,
      description: description,
      siteName: 'Lowping - Portail Événementiel',
      url: `https://events.lowping.gg${path}`,
      type: 'website',
      locale: 'fr_FR',
      images: [
        {
          url: '/api/og',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}
