

import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { UserContext } from '@/context/usercontext';
import Login from '@/pages/auth/login';
import SignUp from '@/pages/auth/signup';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Menu, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const { user, clearUser } = useContext(UserContext);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/40 shadow-lg"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* 🌸 Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
            onClick={() => navigate("/")}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-8 h-8 text-pink-400" />
            </motion.div>
            <span className="text-2xl font-semibold text-gray-700 tracking-wide">
              MannSathi
            </span>
          </div>

          {/* 🌿 Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {!user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenAuthModal(true)}
                className="border transition hover:bg-pink-50 hover:text-pink-600 border-[#A8D0E6] text-gray-700"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-white/30 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-purple-200 text-gray-700">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-gray-700">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-gradient-to-tr from-pink-50 via-purple-50 to-blue-50 shadow-lg rounded-xl border border-white/40"
                >
                  <DropdownMenuItem 
                    onClick={() => navigate("/profilesetting")}
                    className="hover:bg-purple-100 rounded-md transition-colors"
                  >
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem className="hover:bg-purple-100 rounded-md transition-colors">
                    <Settings className="mr-2 h-4 w-4" /> Preferences
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => { clearUser(); navigate("/"); }}
                    className="text-red-600 hover:text-red-700 rounded-md"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              size="sm"
              onClick={() => scrollToSection('resources')}
              className="text-white bg-gradient-to-tr from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 transition"
            >
              Get Help
            </Button>
          </nav>

          {/* 📱 Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </Button>
        </div>

        {/* 📱 Animated Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-6 pt-2 pb-4 border-t border-white/40 bg-white/70 backdrop-blur-md"
            >
              <div className="flex flex-col gap-2">
                {!user ? (
                  <button
                    onClick={() => setOpenAuthModal(true)}
                    className="py-2 text-left text-gray-700 hover:bg-pink-50 rounded-md"
                  >
                    Login
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/profile")}
                      className="py-2 text-left text-gray-700 hover:bg-purple-50 rounded-md"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => { clearUser(); navigate("/"); }}
                      className="py-2 text-left text-red-600 hover:text-red-700 rounded-md"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* 🌙 Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="p-4"
        >
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </motion.div>
      </Modal>
    </>
  );
}

