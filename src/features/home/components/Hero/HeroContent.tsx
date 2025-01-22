// features/home/components/Hero/HeroContent.tsx
import { ContentBlock } from './ui/ContentBlock'
import { Title } from './ui/Title'

export function HeroContent() {
  return (
    <div className="container mx-auto flex max-w-full flex-1 flex-col items-center justify-center gap-6 xs:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-5xl">
      <Title />
      <ContentBlock />
    </div>
  )
}
