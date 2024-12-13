// Header.tsx
'use client'

import Link from 'next/link'
import { Full } from '@lowping/brand-kit'
import { Globe } from 'lucide-react'
import { motion } from 'motion/react'
import { useScramble } from 'use-scramble'

import { EASE } from '@/lib/animation'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onIntroComplete?: () => void
  showOverlay: boolean
}

export function Header({ onIntroComplete, showOverlay }: HeaderProps) {
  const { ref: titleRef } = useScramble({
    text: 'Portail Événementiel',
    speed: 0.4,
    tick: 1,
    step: 1,
    scramble: 20,
    seed: 2,
    chance: 0.8,
    ignore: [' '],
    onAnimationEnd: () => {
      onIntroComplete?.()
    }
  })

  const fadeUpWithColor = {
    hidden: { y: 100, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      color: showOverlay ? '#000' : '#fff',
      transition: {
        y: { delay: custom * 0.2 + 1, duration: 0.8, ease: EASE },
        opacity: { delay: custom * 0.2 + 1, duration: 0.8, ease: EASE },
        color: { duration: 1, ease: EASE }
      }
    })
  }

  const fadeUp = {
    hidden: { y: 200 },
    visible: (custom: number) => ({
      y: 0,
      transition: {
        y: { delay: custom * 0.2 + 1, duration: 0.8, ease: EASE }
      }
    })
  }

  const DELAY = 1.3
  return (
    <motion.div
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ delay: DELAY, duration: 1, ease: EASE }}
      className="origin-center sm:origin-left"
    >
      <motion.div
        initial={{ y: '20vh' }}
        animate={{ y: '0' }} // You can adjust this value to control final position
        transition={{ duration: 1, ease: EASE, delay: DELAY }}
        className="flex-col flex justify-center items-center sm:items-start gap-2 relative z-40 py-24"
      >
        <motion.div
          variants={fadeUpWithColor}
          initial="hidden"
          animate="visible"
          custom={DELAY}
          className="mb-8"
        >
          <Full width={180} />
        </motion.div>
        <div className="overflow-hidden relative">
          <motion.h1
            className="font-bold leading-auto md:leading-[62px] text-center text-4xl sm:text-left sm:text-5xl  md:text-6xl"
            ref={titleRef}
            style={{ color: showOverlay ? '#000' : '#fff' }}
          ></motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={DELAY + 2}
            className="w-full"
          >
            <p className="text-xs sm:text-base text-center sm:text-left mb-8 sm:max-w-2xl text-muted-foreground font-light">
              Tous nos événements esport au même endroit. Inscrivez-vous aux
              prochains tournois, suivez vos résultats et participez à des
              compétitions bien structurées.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Button
                size="lg"
                className="bg-[#5763ED] text-white hover:bg-[#3744DB] w-full sm:w-fit"
              >
                Discord
                <div>
                  <svg
                    width="30"
                    height="24"
                    viewBox="0 0 30 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.3969 2.46331C23.4518 1.57004 21.3991 0.932857 19.2901 0.567709C19.271 0.564491 19.2514 0.56727 19.2339 0.575664C19.2164 0.584058 19.202 0.597654 19.1926 0.614583C18.9282 1.08333 18.6357 1.69645 18.4314 2.17644C16.1581 1.83175 13.8459 1.83175 11.5727 2.17644C11.3457 1.64129 11.0877 1.11979 10.8002 0.614583C10.7908 0.597654 10.7763 0.584058 10.7589 0.575664C10.7414 0.56727 10.7218 0.564491 10.7027 0.567709C8.59334 0.931455 6.54024 1.56895 4.59589 2.46331C4.57917 2.46952 4.56521 2.48149 4.55652 2.49706C0.667809 8.30762 -0.399054 13.9757 0.124065 19.5725C0.127815 19.6 0.14094 19.6231 0.16344 19.6419C2.42836 21.3185 4.96107 22.5991 7.65398 23.4293C7.673 23.4353 7.69343 23.4351 7.71231 23.4287C7.73119 23.4223 7.74754 23.41 7.75898 23.3937C8.33772 22.6062 8.84897 21.7756 9.29271 20.9019C9.30194 20.8839 9.30509 20.8634 9.30171 20.8434C9.29834 20.8235 9.2886 20.8052 9.27396 20.7912L9.24021 20.7706C8.43277 20.4593 7.65047 20.0863 6.90024 19.655C6.8793 19.6431 6.86372 19.6237 6.85674 19.6006C6.84976 19.5776 6.85191 19.5527 6.86274 19.5312L6.89086 19.4956C7.04961 19.3769 7.20461 19.255 7.35586 19.13C7.36911 19.1193 7.38501 19.1125 7.40185 19.1102C7.4187 19.1079 7.43585 19.1102 7.45148 19.1169C12.3621 21.3593 17.6776 21.3593 22.5282 19.1169C22.5443 19.1094 22.5622 19.1067 22.5798 19.109C22.5974 19.1114 22.6139 19.1186 22.6276 19.13C22.7788 19.255 22.9338 19.3769 23.0926 19.4956C23.1058 19.5046 23.1164 19.5169 23.1235 19.5312C23.1307 19.5455 23.134 19.5614 23.1333 19.5774C23.1325 19.5934 23.1277 19.6089 23.1193 19.6225C23.1108 19.636 23.099 19.6472 23.0851 19.655C22.3381 20.0931 21.5545 20.4658 20.7432 20.7687C20.7303 20.7734 20.7185 20.7809 20.7088 20.7906C20.6991 20.8003 20.6916 20.8121 20.687 20.825C20.6824 20.8375 20.6805 20.8508 20.6815 20.864C20.6825 20.8773 20.6863 20.8902 20.6926 20.9019C21.1426 21.7737 21.6582 22.6062 22.2244 23.3937C22.2359 23.41 22.2522 23.4223 22.2711 23.4287C22.29 23.4351 22.3104 23.4353 22.3294 23.4293C25.0277 22.6037 27.5648 21.3228 29.8312 19.6419C29.8425 19.6339 29.8519 19.6236 29.8587 19.6116C29.8655 19.5996 29.8695 19.5862 29.8706 19.5725C30.4968 13.1019 28.8225 7.48076 25.4344 2.49894C25.4315 2.49043 25.4265 2.48276 25.42 2.47656C25.4135 2.47036 25.4056 2.46582 25.3969 2.46331ZM10.0258 16.1638C8.54647 16.1638 7.32961 14.8063 7.32961 13.1413C7.32961 11.4763 8.52397 10.117 10.0258 10.117C11.5389 10.117 12.7445 11.4857 12.722 13.1413C12.722 14.8063 11.5277 16.1638 10.0258 16.1638ZM19.9932 16.1638C18.5157 16.1638 17.297 14.8063 17.297 13.1413C17.297 11.4763 18.4914 10.117 19.9932 10.117C21.5063 10.117 22.7138 11.4857 22.6894 13.1413C22.6894 14.8063 21.5063 16.1638 19.9932 16.1638Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Button>
              <Link
                href="https://lowping.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-fit pointer-events-none"
              >
                <Button size="lg" className="flex gap-1 w-full" disabled>
                  <Globe size={24} />
                  Website (soon)
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
