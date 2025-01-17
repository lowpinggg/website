// features/home/components/Hero/HeroContent.tsx
import { ContentBlock } from './ui/ContentBlock'
import { Title } from './ui/Title'

export function HeroContent() {
  return (
    <div className="container">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6">
        <Title />
        <ContentBlock />
      </div>
    </div>
  )
}
