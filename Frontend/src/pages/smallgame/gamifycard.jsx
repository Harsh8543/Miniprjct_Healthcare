



import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("inhale");
  const [timer, setTimer] = useState(0);
  const [scale, setScale] = useState(1);

  // user-defined durations
  const [inhaleTime, setInhaleTime] = useState(4);
  const [holdTime, setHoldTime] = useState(4);
  const [exhaleTime, setExhaleTime] = useState(6);

  const phases = {
    inhale: { duration: inhaleTime, next: "hold", message: "Breathe in deeply 🌿" },
    hold: { duration: holdTime, next: "exhale", message: "Hold your calm 🤍" },
    exhale: { duration: exhaleTime, next: "inhale", message: "Let go slowly 💫" },
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const currentPhase = phases[phase];
          if (prev >= currentPhase.duration) {
            setPhase(currentPhase.next);
            return 0;
          }

          if (phase === "inhale") setScale(1 + (prev / currentPhase.duration) * 0.3);
          else if (phase === "exhale") setScale(1.3 - (prev / currentPhase.duration) * 0.5);
          else setScale(1.3);

          return prev + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, inhaleTime, holdTime, exhaleTime]);

  const toggleExercise = () => setIsActive(!isActive);
  const resetExercise = () => {
    setIsActive(false);
    setPhase("inhale");
    setTimer(0);
    setScale(1);
  };

  return (
    <section
      id="breathing"
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #d7f5f5, #f5e9ff, #fff6e5)",
      }}
    >
      {/* Floating background orbs */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 top-10 left-10"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-30 bottom-0 right-10"
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 9 }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="mb-6 text-5xl font-bold text-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Guided Breathing 🌬️
        </motion.h2>
        <p className="mb-12 text-lg text-gray-600 max-w-2xl mx-auto">
          Breathe mindfully. Find your calm. Let each breath bring peace and balance 💖
        </p>

        {/* Settings */}
        <motion.div
          className="flex justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: "Inhale (s)", value: inhaleTime, setter: setInhaleTime },
            { label: "Hold (s)", value: holdTime, setter: setHoldTime },
            { label: "Exhale (s)", value: exhaleTime, setter: setExhaleTime },
          ].map((input) => (
            <div key={input.label} className="flex flex-col items-center">
              <label className="text-sm text-gray-700 mb-1">{input.label}</label>
              <input
                type="number"
                min="1"
                value={input.value}
                onChange={(e) => input.setter(Number(e.target.value))}
                className="w-16 p-1 border border-gray-300 rounded text-center bg-white/60 backdrop-blur-sm"
              />
            </div>
          ))}
        </motion.div>

        {/* Breathing Circle */}
        <motion.div
          className="relative w-80 h-80 mx-auto flex items-center justify-center"
          animate={{ scale }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-0 rounded-full shadow-xl"
            style={{
              background: "linear-gradient(to bottom right, #90CAF9, #E3F2FD)",
              boxShadow: "0 0 25px rgba(173, 216, 230, 0.6)",
            }}
          ></div>

          <div className="text-center relative z-10">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-semibold text-white capitalize"
            >
              {phase}
            </motion.div>
            <div className="text-sm text-white mt-2">
              {Math.ceil(phases[phase].duration - timer)}s
            </div>
            <p className="text-sm text-white/90 mt-4 italic">
              {phases[phase].message}
            </p>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-10">
          <Button
            onClick={toggleExercise}
            size="lg"
            className="flex items-center gap-2 px-6 py-3 text-white bg-[#7B9ACC] hover:bg-[#92aee9] transition-all shadow-md hover:shadow-lg"
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isActive ? "Pause" : "Start"}
          </Button>

          <Button
            onClick={resetExercise}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 border cursor-pointer border-gray-400 text-gray-700 hover:bg-gray-100 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
}
