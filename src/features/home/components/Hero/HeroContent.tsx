// features/home/components/Hero/HeroContent.tsx
import { ContentBlock } from './ui/ContentBlock'
import { Title } from './ui/Title'

export function HeroContent() {
  return (
    <div className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-6">
      <Title />
      <ContentBlock />
    </div>
  )
}
