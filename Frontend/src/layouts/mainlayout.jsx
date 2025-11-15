
import { Outlet } from "react-router-dom";
import Sidebar from "./slider";
import { ImageWithFallback } from "@/components/inputs/imagefallback";
import { DashboardHeader } from "./navbar";
import { motion } from "framer-motion";

const MainLayout = () => {
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#e0f7fa] via-[#fce4ec] to-[#ede7f6]">
      {/* 🌄 Soft Background Image */}
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
          alt="Calm background"
          className="w-full h-full object-cover opacity-25 mix-blend-soft-light"
        />
        {/* 🫧 Floating pastel glow orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-20 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* 🧱 Layout Wrapper */}
      <div className="flex flex-col flex-1 backdrop-blur-sm bg-white/30 shadow-inner shadow-teal-50/40 rounded-l-3xl overflow-hidden">
        
        {/* 🌸 Sticky Header */}
        <header className="sticky top-0 z-20 w-full backdrop-blur-lg bg-white/60 shadow-md border-b border-white/40">
          <DashboardHeader />
        </header>

        {/* 🪷 Sidebar + Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sidebar />
          </motion.div>

          {/* 🌤️ Main Content */}
          <main className="flex-1 overflow-auto p-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl p-8 bg-white/60 backdrop-blur-xl shadow-lg shadow-purple-100/40 border border-white/40"
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
