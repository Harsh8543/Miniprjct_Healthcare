
import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Games
import SnakeGame from "./snake";
import Journoul from "./journoul";
import CanvasBoard from "./mindfullcolors";
import FallingTypingGame from "./focus";
import MemoryMatchingGame from "./memorygame";
import MeditationSounds from "./Meditation";

// Images
import snakeThumb from "@/assets/snake.png";
import journel from "@/assets/Journel.png";
import canvas from "@/assets/Canvas.png";
import typinggame from "@/assets/typinggame.png";
import memory from "@/assets/Memory.png";
import meditation from "@/assets/meditation.png";

// ✅ GAME DATA
const SAMPLE_GAMES = [
  { id: "MeditationSounds", title: "Meditation Sounds", category: "Relax", thumb: meditation, short: "Soothing ambient sounds to relax and breathe." },
  { id: "MemoryMatchingGame", title: "Memory Matching", category: "Memory", thumb: memory, short: "Gentle memory drills to sharpen attention." },
  { id: "TypingGame", title: "Focus Typing", category: "Focus", thumb: typinggame, short: "Calm typing practice to build focus." },
  { id: "CanvasBoard", title: "Mindful Colors", category: "Drawing", thumb: canvas, short: "Draw to express and release tension." },
  { id: "journel", title: "Journoul", category: "Wellness", thumb: journel, short: "Reflect, write, and track your thoughts." },
  { id: "snake", title: "Snake", category: "Arcade", thumb: snakeThumb, short: "Light-hearted classic — quick fun breaks!" },
];

export default function SmallGameHub() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [playingGame, setPlayingGame] = useState(null);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);

  const categories = useMemo(() => ["All", ...new Set(SAMPLE_GAMES.map((g) => g.category))], []);
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return SAMPLE_GAMES.filter(
      (g) =>
        (g.title.toLowerCase().includes(q) || g.short.toLowerCase().includes(q)) &&
        (category === "All" || g.category === category)
    );
  }, [query, category]);

  // 🎵 Toggle ambient background sound
  const toggleSound = () => {
    if (soundOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setSoundOn(!soundOn);
  };

  // ✅ Floating pastel orbs background
  const FloatingBackground = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-pink-200 via-teal-200 to-blue-200 blur-3xl"
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, 1.3, 1],
            rotate: [0, 60, 0],
          }}
          transition={{ duration: 12 + Math.random() * 10, repeat: Infinity, repeatType: "mirror" }}
          style={{ top: `${Math.random() * 90}%`, left: `${Math.random() * 90}%` }}
        />
      ))}
    </div>
  );

  if (playingGame)
    return (
      <PlayShell onBack={() => setPlayingGame(null)}>
        {playingGame === "snake" && <SnakeGame />}
        {playingGame === "CanvasBoard" && <CanvasBoard />}
        {playingGame === "journel" && <Journoul />}
        {playingGame === "TypingGame" && <FallingTypingGame />}
        {playingGame === "MemoryMatchingGame" && <MemoryMatchingGame />}
        {playingGame === "MeditationSounds" && <MeditationSounds />}
      </PlayShell>
    );

  return (
    <div className="relative min-h-screen p-6 bg-gradient-to-br from-[#DDF6F3] via-[#F9EBFF] to-[#FFF9E7] overflow-hidden">
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/audio/2022/03/15/audio_49b9f5a655.mp3" />
      <FloatingBackground />

      {/* 🪷 Background Sound Toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleSound}
        className="fixed bottom-6 right-6 bg-white/50 backdrop-blur-lg rounded-full p-4 shadow-lg border border-white/40"
      >
        {soundOn ? "🔊" : "🔈"}
      </motion.button>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header Section */}
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#7DE5ED] via-[#A485F2] to-[#F7D08A] bg-clip-text text-transparent drop-shadow-xl">
              🌿 Calm Game Hub
            </h1>
            <p className="text-slate-700 mt-3 text-lg max-w-xl">
              Gentle games crafted to uplift mood, build focus, and ease mental stress 🌸
            </p>
            <motion.p
              className="italic text-slate-600 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              “Take a deep breath, play gently, and find your calm 💖”
            </motion.p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Search calming games..."
              className="w-full px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-md shadow border border-white/40"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <button
              className="px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-md hover:bg-white/80 border border-white/40 shadow"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Reset
            </button>
          </div>
        </motion.header>

        {/* Game Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filtered.map((game, idx) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -6 }}
              className="rounded-3xl shadow-2xl overflow-hidden cursor-pointer bg-white/50 backdrop-blur-xl border border-white/40 hover:shadow-pink-200/50 transition"
              onClick={() => setSelected(game)}
            >
              <div className="p-5 flex flex-col items-center text-center">
                <img src={game.thumb} alt="" className="h-28 drop-shadow-xl mb-5" />
                <h3 className="text-xl font-semibold text-slate-800">{game.title}</h3>
                <p className="text-slate-600 mt-2 text-sm">{game.short}</p>
                <span className="text-xs mt-4 px-3 py-1 bg-white/70 rounded-full border border-white/40">
                  {game.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-12">
            No calming games found. Try another keyword 🌸
          </div>
        )}

        {/* Modal Preview */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-white/50"
              >
                <img src={selected.thumb} className="h-32 mx-auto drop-shadow mb-4" />
                <h2 className="text-3xl font-bold text-center text-slate-800">{selected.title}</h2>
                <p className="text-center text-slate-600 mt-2">{selected.short}</p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#60A5FA] to-[#C084FC] text-white shadow hover:scale-105"
                    onClick={() => {
                      setPlayingGame(selected.id);
                      setSelected(null);
                    }}
                  >
                    Play Now
                  </button>
                  <button
                    className="px-4 py-3 bg-white/70 rounded-2xl border border-white/40 shadow hover:bg-white/90"
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ✅ PlayShell: game screen container
function PlayShell({ children, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6 bg-gradient-to-br from-[#E1F8FF] via-[#FFE9F7] to-[#FFF6E5]"
    >
      <button
        onClick={onBack}
        className="mb-6 px-6 py-2 rounded-full bg-white/80 border border-white/40 shadow hover:scale-105"
      >
        ← Back to Hub
      </button>
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
        {children}
      </div>
    </motion.div>
  );
}
