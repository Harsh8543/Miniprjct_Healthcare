

import { useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "@/context/usercontext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, LogOut, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  const { user, loading, clearUser } = useContext(UserContext);

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <header className="border-b px-6 py-4 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 text-center">
        <p className="text-sm text-gray-500 animate-pulse">
          Loading your calm space...
        </p>
      </header>
    );
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="border-b border-[#A8D0E6] bg-gradient-to-r from-[#f0f8ff] via-[#f8efff] to-[#fff8f8] px-6 py-4 shadow-sm backdrop-blur-md"
    >
      <div className="flex items-center justify-between">
        {/* Left Logo */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
          <Link
            to="/"
            className="flex items-center gap-3 transition transform hover:scale-105"
            title="Go to Home 💖"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-8 h-8 text-pink-400 drop-shadow-sm" />
            </motion.div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              MannSathi
            </h1>
          </Link>
        </motion.div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <motion.div whileHover={{ rotate: 15 }}>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-white/40 transition-colors rounded-lg backdrop-blur-sm"
              title="Your mindful reminders 🔔"
            >
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
            </Button>
          </motion.div>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 hover:bg-white/40 transition-colors rounded-lg backdrop-blur-sm"
                title="Open your calm corner 💆‍♂️"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.profileImageUrl} />
                  <AvatarFallback className="bg-purple-200 text-gray-700">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-gray-700 font-medium">
                  {user?.name || "Guest"}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 bg-white/70 backdrop-blur-lg shadow-xl border border-white/40 rounded-2xl"
            >
              <Link to="/profilesetting">
                <DropdownMenuItem className="hover:bg-purple-100 rounded-md transition-all">
                  <User className="mr-2 h-4 w-4 text-indigo-500" />
                  Profile Settings
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem className="hover:bg-purple-100 rounded-md transition-all">
                <Settings className="mr-2 h-4 w-4 text-indigo-500" />
                Preferences
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  clearUser();
                  window.location.href = "/";
                }}
                className="text-red-600 hover:text-red-700 rounded-md transition-all"
                disabled={!user}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}







