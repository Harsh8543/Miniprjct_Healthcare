




import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageCircle, Globe, Heart } from "lucide-react";

const resources = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "24/7 crisis support in English and Spanish",
    icon: Phone,
    urgent: true,
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "24/7 crisis support via text message",
    icon: MessageCircle,
    urgent: true,
  },
  {
    name: "National Alliance on Mental Illness",
    phone: "1-800-950-NAMI (6264)",
    description: "Information, referrals, and support",
    icon: Globe,
    urgent: false,
  },
  {
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Treatment referral and information service",
    icon: Heart,
    urgent: false,
  },
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
    transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
  },
};

export function EmergencyResources() {
  return (
    <section id="resources" className="relative py-24 overflow-hidden">
      {/* 🌈 Animated Pastel Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#fff0f3] via-[#ffe8ec] to-[#fff6f8]"
        style={{
          backgroundSize: "300% 300%",
          animation: "gradientShift 12s ease infinite",
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

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* 🌟 Title Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
            Emergency Resources ❤️
          </h2>
          <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
            If you're in crisis or need immediate support, please reach out. You’re never alone — help is available 24/7.
          </p>
        </motion.div>

        {/* 🪩 Resource Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                animate="show"
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  variants={floatAnim}
                  initial="initial"
                  animate="animate"
                  className="h-full"
                >
                  <Card
                    className={`relative p-6 backdrop-blur-xl shadow-lg border transition-all duration-300 hover:shadow-2xl rounded-3xl 
                      ${
                        resource.urgent
                          ? "bg-red-100/40 border-red-200"
                          : "bg-pink-100/40 border-pink-200"
                      }`}
                  >
                    {/* Glow Overlay */}
                    <div
                      className={`absolute inset-0 rounded-3xl opacity-20 blur-3xl ${
                        resource.urgent
                          ? "bg-red-300"
                          : "bg-pink-300"
                      }`}
                    ></div>

                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl shadow-md ${
                          resource.urgent ? "bg-red-500" : "bg-pink-500"
                        }`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold mb-2 ${
                            resource.urgent ? "text-red-700" : "text-pink-700"
                          }`}
                        >
                          {resource.name}
                        </h3>
                        <p className="text-gray-700 mb-4 text-sm">
                          {resource.description}
                        </p>

                        <Button
                          className={`px-6 py-2 rounded-full shadow-md text-white ${
                            resource.urgent
                              ? "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
                              : "bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800"
                          }`}
                          onClick={() =>
                            window.location.href = `tel:${resource.phone.replace(/\D/g, "")}`
                          }
                        >
                          {resource.phone}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ⚠️ Important Notice */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.8 }}
          className="bg-yellow-50/80 border border-yellow-200 rounded-2xl p-8 text-center shadow-inner"
        >
          <h3 className="mb-3 text-xl font-semibold text-yellow-800">
            Important Reminder ⚠️
          </h3>
          <p className="text-yellow-700 max-w-3xl mx-auto">
            If you are experiencing a mental health emergency, please call{" "}
            <span className="font-bold">112</span> or go to your nearest
            emergency room immediately. Your life matters — reach out for help.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default EmergencyResources;
