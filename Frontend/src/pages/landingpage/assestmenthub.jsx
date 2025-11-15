
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Brain,
  Heart,
  Shield,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";

// === Data remains unchanged ===
const assessments = [
  {
    id: "phq9",
    title: "PHQ-9",
    fullName: "Patient Health Questionnaire-9",
    description: "Evaluate depressive symptoms from the last 2 weeks.",
    icon: Heart,
    questions: 9,
    timeEstimate: "3-5 minutes",
    color: "from-[#ffecd2] to-[#fcb69f]",
  },
  {
    id: "gad7",
    title: "GAD-7",
    fullName: "General Anxiety Disorder-7",
    description: "Review anxiety symptoms experienced in the past 2 weeks.",
    icon: Brain,
    questions: 7,
    timeEstimate: "2-4 minutes",
    color: "from-[#a1c4fd] to-[#c2e9fb]",
  },
  {
    id: "ghq",
    title: "GHQ-12",
    fullName: "General Health Questionnaire-12",
    description: "Assess general emotional and psychological well-being.",
    icon: Shield,
    questions: 12,
    timeEstimate: "4-6 minutes",
    color: "from-[#fbc2eb] to-[#a6c1ee]",
  },
];

// === Result logic remains unchanged ===
const getResultInfo = (type, score) => {
  switch (type) {
    case "phq9":
      if (score <= 4)
        return {
          level: "Minimal",
          icon: CheckCircle,
          color: "#22c55e",
          bgColor: "#dcfce7",
          description:
            "Minimal depression symptoms. You appear to be doing well.",
          recommendations: [
            "Continue healthy lifestyle habits",
            "Stay connected with supportive relationships",
            "Consider regular check-ins with yourself",
          ],
        };
      if (score <= 9)
        return {
          level: "Mild",
          icon: Info,
          color: "#eab308",
          bgColor: "#fefce8",
          description: "Mild depression symptoms. Some areas for attention.",
          recommendations: [
            "Consider lifestyle changes like exercise and sleep hygiene",
            "Practice stress management techniques",
            "Monitor your symptoms",
          ],
        };
      if (score <= 14)
        return {
          level: "Moderate",
          icon: AlertTriangle,
          color: "#f97316",
          bgColor: "#fff7ed",
          description: "Moderate depression symptoms. Consider professional support.",
          recommendations: [
            "Speak with a healthcare provider",
            "Consider therapy or counseling",
            "Maintain social connections",
          ],
        };
      if (score <= 19)
        return {
          level: "Moderately Severe",
          icon: AlertCircle,
          color: "#ef4444",
          bgColor: "#fef2f2",
          description:
            "Moderately severe depression symptoms. Professional help recommended.",
          recommendations: [
            "Seek professional mental health care",
            "Consider therapy and/or medication evaluation",
            "Reach out to trusted friends or family",
          ],
        };
      return {
        level: "Severe",
        icon: AlertCircle,
        color: "#dc2626",
        bgColor: "#fef2f2",
        description:
          "Severe depression symptoms. Immediate professional care recommended.",
        recommendations: [
          "Seek immediate professional help",
          "Contact a mental health crisis line if needed",
          "Don't wait - reach out today",
        ],
      };

    case "gad7":
      if (score <= 4)
        return {
          level: "Minimal",
          icon: CheckCircle,
          color: "#22c55e",
          bgColor: "#dcfce7",
          description:
            "Minimal anxiety symptoms. You appear to be managing well.",
          recommendations: [
            "Continue healthy coping strategies",
            "Practice relaxation techniques",
            "Maintain work-life balance",
          ],
        };
      if (score <= 9)
        return {
          level: "Mild",
          icon: Info,
          color: "#eab308",
          bgColor: "#fefce8",
          description: "Mild anxiety symptoms. Some techniques may help.",
          recommendations: [
            "Try breathing exercises and mindfulness",
            "Regular exercise can help reduce anxiety",
            "Consider limiting caffeine",
          ],
        };
      if (score <= 14)
        return {
          level: "Moderate",
          icon: AlertTriangle,
          color: "#f97316",
          bgColor: "#fff7ed",
          description: "Moderate anxiety symptoms. Consider professional guidance.",
          recommendations: [
            "Speak with a healthcare provider",
            "Learn about anxiety management techniques",
            "Consider therapy or counseling",
          ],
        };
      return {
        level: "Severe",
        icon: AlertCircle,
        color: "#ef4444",
        bgColor: "#fef2f2",
        description: "Severe anxiety symptoms. Professional help recommended.",
        recommendations: [
          "Seek professional mental health care",
          "Consider therapy and anxiety management programs",
          "Don't hesitate to reach out for support",
        ],
      };

    case "ghq":
      if (score <= 2)
        return {
          level: "Good",
          icon: CheckCircle,
          color: "#22c55e",
          bgColor: "#dcfce7",
          description:
            "Good psychological well-being. No significant concerns detected.",
          recommendations: [
            "Maintain current healthy habits",
            "Continue positive lifestyle choices",
            "Regular self-care practices",
          ],
        };
      if (score <= 5)
        return {
          level: "Mild Concerns",
          icon: Info,
          color: "#eab308",
          bgColor: "#fefce8",
          description:
            "Some areas of psychological distress. Monitor your well-being.",
          recommendations: [
            "Focus on stress management",
            "Ensure adequate rest and recreation",
            "Consider talking to someone you trust",
          ],
        };
      return {
        level: "Significant Concerns",
        icon: AlertTriangle,
        color: "#f97316",
        bgColor: "#fff7ed",
        description:
          "Significant psychological distress detected. Professional support recommended.",
        recommendations: [
          "Consider speaking with a mental health professional",
          "Don't ignore persistent symptoms",
          "Reach out to supportive friends or family",
        ],
      };
    default:
      return {
        level: "Unknown",
        icon: Info,
        color: "#6b7280",
        bgColor: "#f9fafb",
        description: "Assessment completed.",
        recommendations: ["Thank you for completing the assessment"],
      };
  }
};

// ✨ Glassmorphic Card Wrapper with Animation
const MotionCard = motion(Card);

function AssessmentHub({ onStartAssessment }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="mb-6 text-5xl font-extrabold text-gray-800 drop-shadow-sm">
          Mental Health Assessments 💫
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-700">
          Take clinically validated assessments to better understand your mental health.  
          Gain self-awareness and find supportive steps for growth 🌿
        </p>
      </motion.div>

      {/* ✨ Animated Gradient Background */}
      <div className="relative py-10 rounded-3xl overflow-hidden mb-16">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#a1c4fd] via-[#c2e9fb] to-[#fbc2eb] animate-gradient-x blur-2xl opacity-80"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        />
        <div className="relative z-10 grid md:grid-cols-3 gap-8 px-6">
          {assessments.map((assessment, idx) => {
            const Icon = assessment.icon;
            return (
              <MotionCard
                key={assessment.id}
                whileHover={{ scale: 1.05, y: -6 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr ${assessment.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {assessment.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{assessment.fullName}</p>
                  <p className="text-sm text-gray-700 mb-4">
                    {assessment.description}
                  </p>
                  <div className="flex justify-between items-center mb-4 text-xs text-gray-700">
                    <span>{assessment.questions} questions</span>
                    <span>{assessment.timeEstimate}</span>
                  </div>
                  <Button
                    onClick={() => onStartAssessment(assessment.id)}
                    className="w-full bg-gradient-to-r from-[#89f7fe] to-[#66a6ff] text-white font-semibold rounded-full shadow-md hover:shadow-xl"
                  >
                    Start Assessment →
                  </Button>
                </div>
              </MotionCard>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl p-6 text-center max-w-3xl mx-auto shadow-lg"
      >
        <FileText className="w-10 h-10 mx-auto mb-4 text-[#66a6ff]" />
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Important Note
        </h3>
        <p className="text-sm text-gray-700">
          These assessments are **screening tools**, not diagnostic tests.  
          If you're experiencing distress, consider speaking with a professional. 🌸
        </p>
      </motion.div>
    </>
  );
}

// === Results Component === (same logic, glassmorphic visuals)
function AssessmentResults({ assessmentType, score, onReturnToHub }) {
  const result = getResultInfo(assessmentType, score);
  const Icon = result.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto bg-white/40 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-2xl text-center"
    >
      <div className="flex flex-col items-center mb-8">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner"
          style={{ backgroundColor: result.bgColor }}
        >
          <Icon className="w-12 h-12" style={{ color: result.color }} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {assessmentType.toUpperCase()} Results
        </h2>
        <p className="text-gray-600 mb-4">{result.description}</p>
        <div
          className="px-4 py-2 rounded-full text-white font-semibold"
          style={{ backgroundColor: result.color }}
        >
          {result.level}
        </div>
      </div>

      <ul className="text-left text-gray-700 space-y-2 mb-8">
        {result.recommendations.map((rec, i) => (
          <li key={i}>• {rec}</li>
        ))}
      </ul>

      <Button
        onClick={onReturnToHub}
        className="bg-gradient-to-r from-[#89f7fe] to-[#66a6ff] text-white rounded-full px-6 py-3 shadow-md hover:shadow-lg"
      >
        Take Another Assessment
      </Button>
    </motion.div>
  );
}

// === Main Component ===
export function AssessmentSection({
  onStartAssessment,
  assessmentType,
  score,
  onReturnToHub,
}) {
  const showResults = score !== null && assessmentType;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#c2e9fb] via-[#e0c3fc] to-[#fbc2eb] opacity-80"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {showResults ? (
          <AssessmentResults
            assessmentType={assessmentType}
            score={score}
            onReturnToHub={onReturnToHub}
          />
        ) : (
          <AssessmentHub onStartAssessment={onStartAssessment} />
        )}
      </div>
    </section>
  );
}






