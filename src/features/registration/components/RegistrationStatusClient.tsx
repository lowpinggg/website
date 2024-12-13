'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventPoster } from '@/features/events/components/EventPoster';
import { CalendarButton } from '@/features/registration/components/checkout/CalendarButton';
import { Full } from '@lowping/brand-kit';
import confetti from 'canvas-confetti';
import { Database } from '@/types/generated-types';
import { animations } from '@/lib/animation';
import { motion } from 'motion/react';

type Event = Database['public']['Tables']['events']['Row'];
type Registration = Database['public']['Tables']['event_registrations']['Row'];

type RegistrationDetails = {
  event: Event;
  registration: Registration;
  receipt_url?: string;
} | null;

type Props = {
  status: 'success' | 'cancelled';
  details: RegistrationDetails;
  title: string;
  description: string;
};

export function RegistrationStatusClient({ status, details, title, description }: Props) {
  // Confetti effect on success
  useEffect(() => {
    if (status === 'success') {
      const duration = 100; // 3 seconds
      const end = Date.now() + duration;

      const interval = setInterval(() => {
        confetti({
          particleCount: 50,
          startVelocity: 32,
          spread: 180,
        });

        if (Date.now() > end) clearInterval(interval);
      }, 200);

      return () => clearInterval(interval); // Cleanup confetti
    }
  }, [status]);

  return (
    <main className="container px-4 mx-auto h-screen flex flex-col sm:justify-evenly items-center">
      {status === 'success' && details ? (
        <SuccessSection details={details} title={title} />
      ) : (
        <CancelledSection title={title} description={description} />
      )}
      <Footer />
    </main>
  );
}

function SuccessSection({ details, title }: { details: RegistrationDetails; title: string }) {
  return (
    <motion.div 
      className="flex flex-col md:grid grid-cols-1 gap-6 md:gap-12 sm:grid-cols-2 justify-center items-center flex-1"
      variants={animations.stagger.parent}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={animations.stagger.child}>
        <EventPoster event={details!.event} showCTA={false} size="lg" />
      </motion.div>
      
      <div className="flex flex-col items-center md:items-start gap-24">
        <motion.div 
          className="flex flex-col gap-6"
          variants={animations.stagger.parent}
        >
          <motion.div variants={animations.stagger.child}>
            <Check size={40} className="text-green-500" />
          </motion.div>
          
          <motion.div className="flex flex-col gap-2 text-center md:text-left">
            <motion.h1 variants={animations.stagger.child} className="text-2xl font-bold">
              {title}
            </motion.h1>
            {details?.registration && (
              <motion.p variants={animations.stagger.child} className="text-muted-foreground text-sm font-normal">
                Un email de confirmation a été envoyé à {details.registration.email}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={animations.stagger.child}>
            <div className="flex gap-2">
              <Link href="/">
                <Button>Retour</Button>
              </Link>
              <Link href={details?.receipt_url!} target="_blank">
                <Button variant="outline">Voir la commande</Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={animations.fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8} // Add delay after the stagger animations
        >
          <CalendarButton event={details!.event} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function CancelledSection({ title, description }: { title: string; description: string }) {
  return (
    <motion.div 
      className="flex flex-col justify-center items-center flex-1"
      variants={animations.stagger.parent}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex-1 justify-center items-center flex flex-col gap-4"
        variants={animations.stagger.parent}
      >
        <motion.div variants={animations.stagger.child}>
          <X size={50} className="text-red-500" />
        </motion.div>
        
        <motion.h1 
          variants={animations.stagger.child}
          className="text-2xl font-bold"
        >
          {title}
        </motion.h1>
        
        <motion.p 
          variants={animations.stagger.child}
          className="text-muted-foreground text-sm"
        >
          {description}
        </motion.p>
        
        <motion.div variants={animations.stagger.child}>
          <Button variant="outline">Retour</Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  return (
    <div 
      className="flex w-full justify-between border-t py-6"
    >
      <Full width={100} />
      <div className="text-center text-xs text-muted-foreground/50">
        <p>Contactez-nous à support@example.com</p>
      </div>
    </div>
  );
}