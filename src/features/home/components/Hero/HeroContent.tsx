// features/home/components/Hero/HeroContent.tsx
import { ContentBlock } from './ui/ContentBlock'
import { Title } from './ui/Title'

export function HeroContent() {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center gap-6 px-5 md:px-8">
      <Title />
      <ContentBlock />
    </div>
  )
}
