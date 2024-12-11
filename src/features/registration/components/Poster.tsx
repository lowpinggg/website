'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import Tilt from 'react-parallax-tilt';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import { animations, EASE } from '@/lib/animation';

type PosterProps = {
  imageUrl: string;
  altText?: string;
  hoverCTA?: {
    link?: string;
    text: string;
  }; // Hover CTA options
};

const HOVER_TRANSITION = { ease: EASE, duration: 0.8 };

export function Poster({ imageUrl, altText, hoverCTA }: PosterProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [buttonHeight, setButtonHeight] = useState(0);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight);
    }
  }, []);

  return (
    <Tilt
      className="w-full rounded-md"
      perspective={1000}
      scale={1.02}
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="11px"
      transitionSpeed={300}
    >
      <motion.div
        className="rounded-md relative"
        initial="initial"
        whileHover="hover"
        style={{ overflow: 'hidden' }}
      >
        <div className="aspect-[3/4] relative">
          <motion.div
            variants={{
              initial: { y: 0 },
              hover: { y: -buttonHeight },
            }}
            transition={HOVER_TRANSITION}
            className="h-full"
          >
            <Image
              src={imageUrl}
              alt={altText || 'Event Poster'}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 420px) 100vw, 420px"
              priority
            />
          </motion.div>
        </div>
        {hoverCTA && (
          <motion.div
            ref={buttonRef}
            className="absolute left-0 right-0"
            style={{ bottom: -buttonHeight }}
            variants={{
              initial: { y: 0 },
              hover: { y: -buttonHeight },
            }}
            transition={HOVER_TRANSITION}
          >
            {hoverCTA.link ? (
              <Link href={hoverCTA.link}>
                <Button className="w-full rounded-none h-12 flex items-center justify-center">
                  <span>{hoverCTA.text}</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            ) : (
              <Button className="w-full rounded-none h-12 flex items-center justify-center">
                <span>{hoverCTA.text}</span>
                <ArrowRight size={16} />
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>
    </Tilt>
  );
}
