














import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { BreathingExercise } from '../smallgame/gamifycard';
import { AssessmentSection } from './assestmenthub';
import { GHQAssessment } from '@/components/assestments/GhQ';
import { GAD7Assessment } from '@/components/assestments/GAD7';
import { PHQ9Assessment } from '@/components/assestments/ph9-Q';
import { EmergencyResources } from './Emergency';
import { CalmingActivities } from './calmingactivities';
import { PositiveAffirmations } from './possitiveaffertion';
import { DailyWellnessQuest } from '../smallgame/dailywellnessquest';
import { Hero } from './hero';
import { Header } from '@/layouts/header';

const Landingpage = () => {
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [assessmentScore, setAssessmentScore] = useState(null);

  const handleStartAssessment = (assessmentId) => {
    setCurrentAssessment(assessmentId);
    setAssessmentScore(null);
  };

  const handleAssessmentComplete = (score) => {
    setAssessmentScore(score);
  };

  const handleBackToHub = () => {
    setCurrentAssessment(null);
    setAssessmentScore(null);
  };

  const renderAssessmentContent = () => {
    switch (currentAssessment) {
      case 'phq9':
        return <PHQ9Assessment onComplete={handleAssessmentComplete} onBack={handleBackToHub} />;
      case 'gad7':
        return <GAD7Assessment onComplete={handleAssessmentComplete} onBack={handleBackToHub} />;
      case 'ghq':
        return <GHQAssessment onComplete={handleAssessmentComplete} onBack={handleBackToHub} />;
      default:
        return (
          <AssessmentSection
            onStartAssessment={handleStartAssessment}
            assessmentType={currentAssessment}
            score={assessmentScore}
            onReturnToHub={handleBackToHub}
          />
        );
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A8D0E6] via-[#E4D9FF] to-[#FFF0F5] animate-gradient-slow"></div>
      
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.div>

        {/* Assessments Section */}
        <motion.section
          id="assessments"
          className="pt-16 pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {renderAssessmentContent()}
        </motion.section>

        {/* Daily Wellness Quest */}
        <motion.section
          id="wellness-quest"
          className="pt-16 pb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <DailyWellnessQuest />
        </motion.section>

        {/* Breathing Exercise */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <BreathingExercise />
        </motion.div>

        {/* Affirmations + Activities + Emergency */}
        <PositiveAffirmations />
        <CalmingActivities />
        <EmergencyResources />
      </main>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-xl border-t border-white/40 mt-16 bg-white/40 shadow-inner">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center text-gray-700">
          <h3 className="text-lg font-medium mb-2 text-gray-800">
            Remember: You are not alone 💛
          </h3>
          <p className="mb-4">
            Your mental health matters. Take time to breathe, reflect, and reach out when needed.
          </p>
          <p className="text-sm text-gray-600">
            This platform is for supportive purposes only and not a substitute for professional care.  
            In an emergency, please call <span className="font-semibold text-red-500">112</span> or contact local services.
          </p>
        </div>
      </footer>

      {/* Background Animation Style */}
      <style>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Landingpage;
