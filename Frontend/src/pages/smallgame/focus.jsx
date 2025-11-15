
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const wordsList = [
  "focus",
  "keyboard",
  "speed",
  "react",
  "canvas",
  "typing",
  "challenge",
  "brain",
  "game",
  "concentration",
  "practice",
  "fast",
  "coding",
];

const FallingTypingGame = () => {
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const containerRef = useRef(null);

  // 🌈 spawn new words
  useEffect(() => {
    if (gameOver) return;

    const spawnInterval = setInterval(() => {
      const randomWord =
        wordsList[Math.floor(Math.random() * wordsList.length)];
      const startX = Math.floor(Math.random() * 80);
      setWords((prev) => [
        ...prev,
        { text: randomWord, y: 0, x: startX, color: randomColor() },
      ]);
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [gameOver]);

  // 👇 falling animation
  useEffect(() => {
    if (gameOver) return;

    const fallInterval = setInterval(() => {
      setWords((prev) => prev.map((w) => ({ ...w, y: w.y + 2 })));
    }, 100);

    return () => clearInterval(fallInterval);
  }, [gameOver]);

  // ❌ check for game over
  useEffect(() => {
    const containerHeight = containerRef.current?.offsetHeight || 400;
    words.forEach((word) => {
      if (word.y * 5 >= containerHeight - 30) {
        setGameOver(true);
      }
    });
  }, [words]);

  // 🎯 typing logic
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    words.forEach((word) => {
      if (word.text === value) {
        setWords((prev) => prev.filter((w) => w.text !== word.text));
        setScore((prev) => prev + 1);
        setUserInput("");
      }
    });
  };

  const restartGame = () => {
    setWords([]);
    setUserInput("");
    setScore(0);
    setGameOver(false);
  };

  function randomColor() {
    const colors = ["#ff4d6d", "#6dc1ff", "#ffcb6d", "#6dff96", "#d86dff"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#dbeafe] via-[#ede9fe] to-[#fff1f2] p-6">
      
      {/* floating pastel orbs for calming ambient effect */}
      <motion.div
        className="absolute w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30 top-10 left-10"
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-30 bottom-10 right-10"
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />

      {/* title and quote */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 drop-shadow-lg"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ⚡ Falling Words Typing Game
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-6 text-center max-w-lg italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        "Train your mind to stay calm, focused, and quick 🧠✨"
      </motion.p>

      <p className="text-lg mb-4 text-gray-700 font-medium">Score: {score}</p>

      {!gameOver ? (
        <>
          <div
            ref={containerRef}
            className="relative w-full max-w-3xl h-[400px] border-[3px] border-indigo-200 rounded-2xl bg-white/60 backdrop-blur-lg overflow-hidden shadow-2xl"
          >
            {words.map((word, idx) => (
              <div
                key={idx}
                className="absolute text-2xl font-bold"
                style={{
                  top: `${word.y * 5}px`,
                  left: `${word.x}%`,
                  color: word.color,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                  transition: "top 0.1s linear",
                }}
              >
                {word.text}
              </div>
            ))}
          </div>

          <input
            type="text"
            value={userInput}
            onChange={handleChange}
            placeholder="Type the word here..."
            className="mt-6 px-6 py-3 w-full max-w-3xl rounded-full border-2 border-indigo-200 bg-white/70 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-indigo-200 shadow-lg text-lg text-gray-800 placeholder-gray-400"
          />
        </>
      ) : (
        <>
          <motion.h2
            className="text-4xl font-extrabold mt-6 text-indigo-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🌈 Game Over!
          </motion.h2>
          <p className="mb-4 text-gray-700 text-xl">Final Score: {score}</p>
          <motion.button
            onClick={restartGame}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Restart
          </motion.button>
        </>
      )}
    </div>
  );
};

export default FallingTypingGame;
