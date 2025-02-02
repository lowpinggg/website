// features/home/components/Hero/HeroContent.tsx
import { ContentBlock } from './ui/ContentBlock'
import { Title } from './ui/Title'

export function HeroContent() {
  return (
    <div className="container flex flex-1 flex-col items-start justify-center gap-6">
      <Title />
      <ContentBlock />
    </div>
  )
}
