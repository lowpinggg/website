'use client'
import { useScramble } from "use-scramble";
import { motion, useScroll, useTransform } from "motion/react"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { del } from "motion/react-client";

export function Header() {
  const [canShowContent, setCanShowContent] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [startScramble, setStartScramble] = useState(false);
  useScrollLock(isLocked);
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const text = "TOURNOIS ESPORT SANS FRICTION"

  const { ref } = useScramble({
    text: startScramble ? text : text,
    speed: 0.4,
    tick: 1,
    step: 3,
    scramble: 4,
    seed: 1,
    chance: 0.8,
    overflow: false,
    range: [33, 47],
    ignore: [" "],
    onAnimationStart: () => {
      setCanShowContent(false);
    },
    onAnimationEnd: () => {
      setCanShowContent(true);
      setIsLocked(false);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartScramble(true);
    }, 1000); // Adjust this delay (in milliseconds) as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen relative z-10">
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <div className="absolute inset-0 hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
          <motion.div
            className="absolute inset-0"
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
            <div className="absolute inset-0 bg-background/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#BFF603]/50 to-[#14FF00]/50 mix-blend-overlay" />
          </motion.div>
        </div>

        <div className="relative flex flex-col items-start justify-center h-full z-10 container mx-auto">
          <div className="flex flex-col items-start gap-8 max-w-4xl">
            <section className="flex flex-col gap-2">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 2, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
                  className="text-8xl text-start font-black text-white tracking-[0.64px] leading-[85%] relative">
                  <span className="invisible" aria-hidden="true">{text}</span>
                  <span ref={ref} className="absolute left-0 top-0"></span>
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  className="text-base text-start font-light text-white/80 tracking-tight leading-6 max-w-2xl"
                  initial={{ y: 120 }}
                  animate={{ y: canShowContent ? 0 : 120 }}
                  transition={{ duration: 2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                >
                  La première plateforme dédiée à lorganisation pro de vos tournois.

                </motion.p>
                <motion.p
                  className="text-base text-start font-light text-white/80 tracking-tight leading-6 max-w-2xl"
                  initial={{ y: 120 }}
                  animate={{ y: canShowContent ? 0 : 120 }}
                  transition={{ duration: 2, delay: 0.45, ease: [0.19, 1, 0.22, 1] }}
                >
                  Matchmaking équitable, gestion simplifiée - concentrez-vous uniquement sur le jeu.
                </motion.p>
              </div>
            </section>
            <div className="overflow-hidden">
              <motion.div
                className="flex items-center gap-2"
                initial={{ y: 120 }}
                animate={{ y: canShowContent ? 0 : 120 }}
                transition={{ duration: 2, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
                
              >
                <Button variant="default">
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
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}