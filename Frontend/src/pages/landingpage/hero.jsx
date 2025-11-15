
import { ImageWithFallback } from "@/components/inputs/imagefallback";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { UserContext } from "@/context/usercontext";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/Modal";
import Login from "@/pages/auth/login";
import SignUp from "@/pages/auth/signup";
import { motion } from "framer-motion";
import heroIllustration from "../../assets/hero-illustration.png";

export function Hero() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDashboardClick = () => {
    if (user) navigate("/dashboard");
    else setOpenAuthModal(true);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-gradient-to-br from-[#f8fdff] via-[#faf5ff] to-[#fffaf5]">
        {/* Animated Background Auras */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0f8ff] via-[#fdf2f8] to-[#fff7e6]" />

          <motion.div
            className="absolute -left-40 -top-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, #ffd6e0, transparent 40%), radial-gradient(circle at 80% 70%, #a5d8ff, transparent 40%)",
            }}
            animate={{
              x: [0, 60, -60, 0],
              y: [0, -40, 40, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute right-[-100px] top-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-55"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #fff1b8, transparent 40%), radial-gradient(circle at 70% 70%, #cdebb0, transparent 40%)",
            }}
            animate={{
              x: [0, -80, 40, 0],
              y: [0, 30, -30, 0],
              rotate: [0, -8, 8, 0],
            }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Content Wrapper */}
        <div className="relative z-20 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Section (Text & Buttons) */}
            <motion.div
              className="md:col-span-6 col-span-1 mt-[15vh] mb-[5vh]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border border-white/50">
                <h2 className="text-slate-900 text-4xl md:text-5xl font-extrabold leading-tight">
                  Your Mind Deserves <br />
                  <span className="bg-gradient-to-r from-[#ff7eb3] to-[#65c7f7] bg-clip-text text-transparent">
                    Gentle Healing 🌸
                  </span>
                </h2>

                <p className="mt-4 text-slate-700 text-lg max-w-xl">
                  <span className="font-medium">MannSathi</span> — your
                  emotional companion that listens, guides, and empowers. Access
                  guided therapy sessions, self-healing journeys, and peer
                  support spaces to bring balance and joy to your student life.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    onClick={handleDashboardClick}
                    className="rounded-2xl px-6 py-3 shadow-md bg-gradient-to-r from-[#ff7eb3] to-[#65c7f7] text-white hover:shadow-lg transition"
                  >
                    Begin Your Journey ✨
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => scrollToSection("activities")}
                    className="rounded-2xl px-6 py-3 border-2 hover:bg-gradient-to-r hover:from-[#fff0f6] hover:to-[#f0f9ff]"
                  >
                    Explore Healing Tools 🌿
                  </Button>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">20+</div>
                    <div className="text-sm text-slate-600">
                      Mindful Activities
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">25+</div>
                    <div className="text-sm text-slate-600">
                      Certified Therapists
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffd1e8] to-[#bfe9ff] flex items-center justify-center text-sm">
                    H
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Harsh Singh</div>
                    <div className="text-xs text-slate-600">
                      “MannSathi helped me find calm and strength again. It
                      feels like a warm hug after a storm.”
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Section (Illustration) */}
            <motion.div
              className="md:col-span-6 col-span-1 flex justify-center relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-full max-w-2xl"
              >
                <div className="bg-white/90 rounded-3xl p-6 shadow-2xl border border-white/60">
                  <div className="relative overflow-hidden rounded-2xl">
                    <ImageWithFallback
                      src={heroIllustration}
                      alt="Mindfulness Illustration"
                      className="w-full h-80 object-cover"
                    />

                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection("video")}
                      className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg border border-white/50"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff7eb3] to-[#65c7f7] text-white">
                        ▶
                      </div>
                    </motion.button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-xs bg-[#fef3c7] px-3 py-1 rounded-full">
                        Guided Meditations
                      </div>
                      <div className="text-xs bg-[#e0f2fe] px-3 py-1 rounded-full">
                        Emotional Therapy
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">
                      Your peace starts here ☁️
                    </div>
                  </div>
                </div>

                {/* ✅ Floating Cards — fixed position inside same container */}
                <motion.div
                  className="absolute -left-8 bottom-[-30px] w-36 h-20 rounded-2xl bg-white/80 backdrop-blur-md p-3 shadow-lg border border-white/50"
                  animate={{ x: [0, -8, 8, 0], y: [0, -6, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 6 }}
                >
                  <div className="text-xs text-slate-700 font-semibold">
                    Live Sessions
                  </div>
                  <div className="text-2xl font-bold text-slate-900">4.8★</div>
                </motion.div>

                <motion.div
                  className="absolute -right-8 -top-8 w-40 h-24 rounded-2xl bg-white/85 backdrop-blur-md p-3 shadow-xl border border-white/50"
                  animate={{ x: [0, 8, -8, 0], y: [0, 6, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 7 }}
                >
                  <div className="text-xs text-slate-700 font-semibold">
                    Programs
                  </div>
                  <div className="text-2xl font-bold text-slate-900">15+</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
}

export default Hero;
