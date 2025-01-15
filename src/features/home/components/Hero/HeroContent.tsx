import { motion } from 'motion/react'
import { ContentBlock } from './ui/ContentBlock'
import { Title } from './ui/Title'

export function HeroContent() {
  return (
    <motion.div className="container">
      <div className="flex max-w-4xl flex-col gap-6">
        <Title />
        <ContentBlock />
      </div>
    </motion.div>
  )
}
