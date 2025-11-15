
import React, { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/inputs/imagefallback";
import { Button } from "@/components/ui/button";

const affirmations = [
  "You are stronger than you know.",
  "This difficult moment will pass.",
  "You deserve love and kindness.",
  "Your feelings are valid and important.",
  "You have overcome challenges before, and you will again.",
  "You are worthy of peace and happiness.",
  "It's okay to not be okay right now.",
  "You are enough, just as you are.",
  "Every small step forward matters.",
  "You have the courage to heal.",
  "Your mental health matters.",
  "You are not alone in this journey.",
  "Progress, not perfection, is what matters.",
  "You are capable of amazing things.",
  "Your story isn't over yet.",
];

// ✨ Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const floatAnim = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
};

export function PositiveAffirmations() {
  const [currentAffirmation, setCurrentAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );

  const getNewAffirmation = () => {
    let newAffirmation;
    do {
      newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    } while (newAffirmation === currentAffirmation);
    setCurrentAffirmation(newAffirmation);
  };

  return (
    <section
      id="affirmations"
      className="relative py-24 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* 🌈 Animated Soft Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#f0e6ff] via-[#fef6ff] to-[#e0f7ff] animate-gradient-slow"
        style={{
          backgroundSize: "300% 300%",
          animation: "gradientShift 15s ease infinite",
        }}
      />
      <style>
        {`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="mb-8 text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500"
        >
          Daily Affirmations 💖
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="mb-12 text-lg text-gray-700 max-w-2xl mx-auto"
        >
          Take a moment to read and internalize these gentle reminders. You deserve peace and kindness.
        </motion.p>

        {/* 🪩 Glassmorphic Floating Card */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <motion.div
            variants={floatAnim}
            initial="initial"
            animate="animate"
          >
            <Card className="p-12 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-15">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1616398397849-942d434d0a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwb2NlYW4lMjB3YXZlcyUyMHN1bnJpc2V8ZW58MXx8fHwxNzU3MzQyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Soft ocean waves"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10">
                <Heart className="w-12 h-12 mx-auto mb-6 text-pink-500 animate-pulse" />
                <blockquote className="text-2xl md:text-3xl text-gray-800 mb-6 italic">
                  “{currentAffirmation}”
                </blockquote>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* 💫 Button with Subtle Motion */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <Button
            onClick={getNewAffirmation}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg hover:shadow-2xl rounded-full px-8 py-3"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            New Affirmation
          </Button>
        </motion.div>

        <p className="mt-10 text-gray-600 italic">
          Take a deep breath 🌿 and let these words settle in your heart.
        </p>
      </div>
    </section>
  );
}

export default PositiveAffirmations;
