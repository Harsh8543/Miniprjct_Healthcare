
import { ImageWithFallback } from '@/components/inputs/imagefallback';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Palette, Users, PenTool } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "@/pages/auth/login"; 
import SignUp from "@/pages/auth/signup"; 
import Modal from "@/components/Modal";
import { motion } from "framer-motion";

const activities = [
  {
    title: 'Mindful Coloring',
    description: 'Focus your mind with soothing patterns and calm colors.',
    icon: Palette,
    color: 'from-pink-400 to-rose-400',
    action: 'Start Coloring'
  },
  {
    title: 'Community',
    description: 'Connect with people who understand and uplift you.',
    icon: Users,
    color: 'from-teal-400 to-blue-400',
    action: 'Join Community'
  },
  {
    title: 'Guided Journaling',
    description: 'Reflect, write, and release your thoughts gently.',
    icon: PenTool,
    color: 'from-purple-400 to-indigo-400',
    action: 'Start Writing'
  }
];

export function CalmingActivities() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleActivityClick = (activity) => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    if (activity === "Mindful Coloring" || activity === "Guided Journaling") {
      navigate("/gamehub");
    } else if (activity === "Community") {
      navigate("/community");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#f0f8ff] via-[#fbeaff] to-[#ffeef4]" id='activities'>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="mb-6 text-5xl font-semibold bg-gradient-to-r from-teal-600 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
            Calming Activities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose an activity that speaks to you. Every small moment of peace you create helps your healing journey.
          </p>
        </motion.div>
        
        {/* ACTIVITY CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <Card className="group p-6 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl">
                  <div className="text-center">
                    <motion.div 
                      className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                      <Icon className="w-9 h-9 text-white" />
                    </motion.div>
                    <h3 className="mb-3 text-2xl font-semibold text-teal-800 group-hover:text-pink-600 transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {activity.description}
                    </p>
                    <Button
                      onClick={() => handleActivityClick(activity.title)}
                      className="w-full bg-gradient-to-r from-teal-500 to-pink-500 hover:from-pink-500 hover:to-teal-500 transition-all cursor-pointer text-white font-medium"
                    >
                      {activity.action}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* MOTIVATIONAL CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <Card className="p-8 bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 opacity-15">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1656613031370-7d2af1275810?crop=entropy&fit=crop&w=1500&q=80"
                alt="Zen garden stones"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h3 className="mb-4 text-2xl bg-gradient-to-r from-teal-600 to-pink-500 bg-clip-text text-transparent font-semibold">
                Remember: Progress, Not Perfection 🌸
              </h3>
              <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Healing takes time — and that’s okay. Be gentle with yourself. Each mindful action, no matter how small, brings you closer to peace.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* LOGIN MODAL */}
        {showLogin && (
          <Modal
            isOpen={showLogin}
            onClose={() => {
              setShowLogin(false);
              setCurrentPage("login");
            }}
            hideHeader
          >
            <div>
              {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
              {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
