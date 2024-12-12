'use client';

import { useState } from 'react';
import { EventPoster } from '@/features/events/components/EventPoster';
import { DynamicForm } from '@/features/registration/components/DynamicForm';
import { Summary } from '@/features/registration/components/Summary';
import { FormData, formRegistry } from '@/features/registration/types/forms';
//import { ArrowLeft } from 'lucide-react';
//import Link from 'next/link';
import { motion } from 'motion/react'; // Changed from motion/react
import { Database } from '@/types/generated-types';
import { animations } from '@/lib/animation';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';

// TODO: Pass default value so it saves between steps

type Props = {
  event: Database['public']['Tables']['events']['Row'];
};

export function RegisterClient({ event }: Props) {
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<FormData>({
    name: '',
    email: '',
    riotId: '',
    rank: 'IRON',
  });

  const handleRegistrationComplete = (data: FormData) => {
    setRegistrationData(data);
    setStep(2);
  };

  return (
    <div className="min-h-screen flex flex-col w-full container mx-auto p-4">
      <main className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[calc(100vh-64px)] items-start  gap-6 md:gap-12 lg:gap-0  py-4 md:py-12">
          {/* Left Column - Event Poster */}
          <div className="flex items-center justify-center sm:sticky top-0">
            <EventPosterSection event={event} />
          </div>

          {/* Right Column - Content */}
          <div className="flex items-center">
            <ContentSection
              step={step}
              event={event}
              registrationData={registrationData}
              onRegistrationComplete={handleRegistrationComplete}
              onBack={() => setStep(1)}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function EventPosterSection({ event }: { event: Props['event'] }) {
  return (
    <motion.div
      variants={animations.stagger.child}
      initial="hidden"
      animate="visible"
      className=""
    >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <EventPoster 
          event={event} 
          size="xl" 
          showCTA={false}
        />
      </motion.div>
    </motion.div>
  );
}

function ContentSection({
  step,
  event,
  registrationData,
  onRegistrationComplete,
  onBack,
}: {
  step: number;
  event: Props['event'];
  registrationData: FormData;
  onRegistrationComplete: (data: FormData) => void;
  onBack: () => void;
}) {
  return (
    <div className="w-full sm:max-w-xl md:max-w-xl">
      <motion.div
        className="flex flex-col w-full space-y-6"
        variants={animations.stagger.parent}
        initial="hidden"
        animate="visible"
      >
        {/* Header Area */}
        <div>
          <motion.div variants={animations.stagger.child}>
            <Badge className="font-medium">{event.game}</Badge>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mt-4 mb-1">
              {event.name}
            </h1>
            <p className="text-muted-foreground text-xs md:text-base">Complete your registration details below</p>
          </motion.div>
        </div>

        {/* Event Info Card */}
        <motion.div variants={animations.stagger.child}>
          <div className="grid grid-cols-2 gap-4 p-4 bg-black/30 rounded-lg border border-white/10">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="text-white font-medium">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-400">Price</p>
              <p className="text-white font-medium">
                ${(event.price / 100).toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form Area */}
        <div className="bg-black/20 rounded-lg border border-white/10 p-6">
          {step === 1 ? (
            <motion.div variants={animations.stagger.child}>
              <DynamicForm
                type={event.type}
                event={event}
                onComplete={onRegistrationComplete}
                defaultValues={registrationData}
              />
            </motion.div>
          ) : (
            <Summary
              formData={registrationData}
              event={event}
              fields={formRegistry[event.type].fields}
              onBack={onBack}
            />
          )}
        </div>

        <motion.div 
          variants={animations.stagger.child}
          className="text-xs text-muted-foreground text-center"
        >
          <p>By registering, you agree to our terms and conditions.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}


// function BackButton() {
//   return (
//     <motion.div variants={animations.stagger.child}>
//       <Link
//         href="/"
//         className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 
//                    hover:text-white transition-colors rounded-lg 
//                    hover:bg-white/5 group"
//       >
//         <ArrowLeft
//           size={16}
//           className="group-hover:-translate-x-1 transition-transform"
//         />
//         <span>Back to Events</span>
//       </Link>
//     </motion.div>
//   );
// }
