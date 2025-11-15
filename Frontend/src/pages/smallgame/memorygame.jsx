
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const cardValues = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥝", "🍑", "🍒"];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const MemoryMatchingGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const doubled = [...cardValues, ...cardValues];
    setCards(shuffleArray(doubled));
  }, []);

  const handleClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index))
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts((prev) => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx] === cards[secondIdx]) {
        setMatched([...matched, firstIdx, secondIdx]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  const resetGame = () => {
    const doubled = [...cardValues, ...cardValues];
    setCards(shuffleArray(doubled));
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{
        background:
          "linear-gradient(to bottom right, #E8F0FF, #F9E9FF, #FFF6E5)",
      }}
    >
      {/* floating calm orbs */}
      <motion.div
        className="absolute w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30 top-10 left-10"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 bottom-0 right-10"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.h1
        className="text-4xl sm:text-5xl font-bold mb-4 text-gray-700 text-center drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🧠 MindCalm Memory Match
      </motion.h1>
      <p className="mb-6 text-lg text-gray-600">
        Focus, relax, and train your memory 💭
      </p>

      <p className="mb-4 text-md text-gray-600 font-medium">
        Attempts: {attempts}
      </p>

      {/* Card grid */}
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-4 max-w-xl w-full">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);

          return (
            <motion.div
              key={idx}
              onClick={() => handleClick(idx)}
              className={`h-24 sm:h-28 flex items-center justify-center text-3xl font-bold rounded-xl cursor-pointer backdrop-blur-md border shadow-md transition-all duration-300
                ${
                  isFlipped
                    ? "bg-gradient-to-br from-[#FFF6E5] to-[#E3F2FD]"
                    : "bg-white/60 hover:bg-white/80"
                }
                ${isFlipped ? "scale-105 shadow-lg" : "scale-100"}`}
              style={{
                borderColor: isFlipped ? "#a5b4fc" : "#d1d5db",
              }}
              whileHover={{ scale: isFlipped ? 1.05 : 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                initial={{ rotateY: 0 }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className="text-4xl"
              >
                {isFlipped ? card : "❓"}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* Win message */}
      {matched.length === cards.length && (
        <motion.div
          className="mt-8 text-center bg-white/70 backdrop-blur-md px-8 py-6 rounded-3xl shadow-lg border"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-700 mb-3">
            🎉 Excellent Focus!
          </h2>
          <p className="text-gray-600 mb-4">
            You’ve completed the memory challenge with {attempts} attempts 💫
          </p>
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-md hover:bg-purple-600 transition"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MemoryMatchingGame;
