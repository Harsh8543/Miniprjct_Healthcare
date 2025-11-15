
import { NavLink } from "react-router-dom";
import {
  Home,
  Book,
  Group,
  Calendar,
  Smile,
  Shapes
} from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="h-screen w-20 flex flex-col items-center py-6 
                 bg-gradient-to-b from-[#e0f7fa]/90 via-[#fce4ec]/80 to-[#ede7f6]/90 
                 backdrop-blur-xl border-r border-white/30 shadow-lg shadow-pink-100/30"
    >
      {/* 🌿 Logo Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <span className="text-3xl font-extrabold text-teal-500 drop-shadow-md">🌿</span>
      </motion.div>

      {/* 🧭 Navigation Links */}
      <nav className="flex flex-col gap-6">
        {[
          { to: "/dashboard", icon: <Home className="w-5 h-5" />, label: "Home" },
          { to: "/resourcehub", icon: <Book className="w-5 h-5" />, label: "Resources" },
          { to: "/community", icon: <Group className="w-5 h-5" />, label: "Community" },
          { to: "/counselingsessions", icon: <Calendar className="w-5 h-5" />, label: "Sessions" },
          { to: "/moodtracker", icon: <Smile className="w-5 h-5" />, label: "Mood" },
          { to: "/gamehub", icon: <Shapes className="w-5 h-5" />, label: "Games" },
        ].map((link, i) => (
          <motion.div
            key={link.to}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `relative flex items-center justify-center w-12 h-12 rounded-2xl 
                 transition-all duration-300 group
                 ${isActive
                   ? "bg-gradient-to-tr from-[#b2ebf2] to-[#f8bbd0] text-purple-800 shadow-inner shadow-purple-200"
                   : "text-gray-500 hover:bg-gradient-to-tr from-[#e0f2f1] to-[#fce4ec]"
                 }`
              }
            >
              {link.icon}
              {/* Tooltip */}
              <span className="absolute left-16 px-3 py-1 rounded-md bg-white/80 text-gray-700 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                {link.label}
              </span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* 🌟 Footer / Calm Message */}
      <div className="text-[10px] text-gray-500 mt-6 italic text-center opacity-70">
        <p>“Breathe, reflect, grow 🌸”</p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
