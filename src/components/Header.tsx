'use client'
import { useScramble } from "use-scramble";
import { motion, useScroll, useTransform } from "motion/react"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  
  const { ref } = useScramble({
    text: "TOURNOIS ESPORT SANS FRICTION",
    speed: 0.4,
    tick: 1,
    step: 3,
    scramble: 4,
    seed: 1,
    chance: 0.8,
    overflow: false,
    range: [33,47],
    ignore: [" "],
  });

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        {/* Background container with mask */}
        <div className="absolute inset-0 hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] ">
          {/* Video Container with Parallax */}
          <motion.div
            className="absolute inset-0 "
            style={{ y }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/assets/arclight-brand.1920x1080.mp4" type="video/mp4" />
            </video>
            {/* Base overlay */}
            <div className="absolute inset-0 bg-background/60" />
            {/* Green gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#BFF603]/50 to-[#14FF00]/50 mix-blend-overlay" />
          </motion.div>
        </div>
        {/* Content - outside of mask */}
        <div className="relative flex flex-col items-start justify-center h-full z-10 container mx-auto">
          <div className="flex flex-col items-start gap-8 max-w-4xl px-4">
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-8xl text-start font-black text-white tracking-[0.64px] leading-[85%]">
                <span ref={ref}></span>
              </h1>
              <p className="text-base text-start font-light text-white/80 tracking-tight leading-6 max-w-2xl">
                La première plateforme dédiée à lorganisation pro de vos tournois.
                Matchmaking équitable, gestion simplifiée - concentrez-vous uniquement sur le jeu.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
              >
                <Link href="/events" className="flex items-center gap-2">
                  <Image
                    className="w-3.5 h-4"
                    width={14}
                    height={16}
                    alt="Vector"
                    src="https://c.animaapp.com/0rdaoruW/img/vector.svg"
                  />
                  Évenements
                </Link>
              </Button>
              <Button variant="secondary">
                <Link href="/contact">Contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}