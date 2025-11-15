

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function MindfulSnakeGame() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [rows] = useState(20);
  const [cols] = useState(20);
  const [cellSize] = useState(20);
  const [speed, setSpeed] = useState(120);
  const [playMusic, setPlayMusic] = useState(false);

  const snakeRef = useRef([{ x: 9, y: 9 }]);
  const dirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef(placeRandomFood([{ x: 9, y: 9 }], cols, rows));
  const lastMoveRef = useRef(Date.now());
  const audioRef = useRef(null);

  function isEqual(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
  }

  function placeRandomFood(snake, cols, rows) {
    const occupied = new Set(snake.map((p) => `${p.x},${p.y}`));
    let fx, fy;
    do {
      fx = Math.floor(Math.random() * cols);
      fy = Math.floor(Math.random() * rows);
    } while (occupied.has(`${fx},${fy}`));
    return { x: fx, y: fy };
  }

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
    dirRef.current = { x: 1, y: 0 };
    foodRef.current = placeRandomFood(snakeRef.current, cols, rows);
    setScore(0);
    setSpeed(120);
    setPaused(false);
    setRunning(true);
    lastMoveRef.current = Date.now();
  }, [cols, rows]);

  // Key controls
  useEffect(() => {
    function handleKey(e) {
      if (!running) return;
      const key = e.key;
      const d = dirRef.current;
      if (key === "ArrowUp" || key === "w") {
        if (d.y !== 1) dirRef.current = { x: 0, y: -1 };
      } else if (key === "ArrowDown" || key === "s") {
        if (d.y !== -1) dirRef.current = { x: 0, y: 1 };
      } else if (key === "ArrowLeft" || key === "a") {
        if (d.x !== 1) dirRef.current = { x: -1, y: 0 };
      } else if (key === "ArrowRight" || key === "d") {
        if (d.x !== -1) dirRef.current = { x: 1, y: 0 };
      } else if (key === " ") {
        setPaused((p) => !p);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [running]);

  // Main game loop
  useEffect(() => {
    let rafId;
    function loop() {
      const now = Date.now();
      if (!paused && running && now - lastMoveRef.current >= speed) {
        step();
        lastMoveRef.current = now;
      }
      draw();
      rafId = requestAnimationFrame(loop);
    }
    if (running) rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [running, paused, speed]);

  function step() {
    const snake = [...snakeRef.current];
    const head = { ...snake[0] };
    const d = dirRef.current;
    head.x += d.x;
    head.y += d.y;

    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
      setRunning(false);
      return;
    }
    for (let s of snake) {
      if (isEqual(head, s)) {
        setRunning(false);
        return;
      }
    }

    snake.unshift(head);
    if (isEqual(head, foodRef.current)) {
      setScore((s) => s + 1);
      setSpeed((prev) => Math.max(40, Math.floor(prev * 0.93)));
      foodRef.current = placeRandomFood(snake, cols, rows);
    } else snake.pop();
    snakeRef.current = snake;
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    ctx.fillStyle = "#101623";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const food = foodRef.current;
    drawCell(ctx, food.x, food.y, cellSize, "#ff6b6b");

    const snake = snakeRef.current;
    for (let i = 0; i < snake.length; i++) {
      const s = snake[i];
      const color = i === 0 ? "#a5f3fc" : "#38bdf8";
      drawCell(ctx, s.x, s.y, cellSize, color);
    }
  }

  function drawCell(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
    ctx.shadowBlur = 0;
  }

  // Music control
  useEffect(() => {
    if (playMusic) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [playMusic]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-pink-100 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">
          🌿 Mindful Snake
        </h1>
        <p className="text-indigo-500 italic mt-2">
          “Calm your mind — move gently, grow steadily.” 💭
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white/40 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/30"
      >
        <canvas
          ref={canvasRef}
          className="rounded-xl shadow-lg border-4 border-indigo-200"
          style={{ width: 400, height: 400 }}
        />
        <div className="flex gap-4 mt-5 justify-center">
          {!running ? (
            <button onClick={resetGame} className={btnClass}>
              Start
            </button>
          ) : (
            <button onClick={() => setPaused((p) => !p)} className={btnClass}>
              {paused ? "Resume" : "Pause"}
            </button>
          )}
          <button
            onClick={() => {
              snakeRef.current = [{ x: 9, y: 9 }];
              dirRef.current = { x: 1, y: 0 };
              foodRef.current = placeRandomFood(snakeRef.current, cols, rows);
              setRunning(false);
              setScore(0);
            }}
            className={btnClass}
          >
            Reset
          </button>
          <button onClick={() => setPlayMusic((m) => !m)} className={btnClass}>
            {playMusic ? "🔇 Mute" : "🎵 Relax"}
          </button>
        </div>
        <div className="mt-4 text-indigo-700 text-center font-semibold">
          Score: {score}
        </div>
      </motion.div>

      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_5ec65d87b0.mp3"
      />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-indigo-200 rounded-full opacity-50 blur-3xl"
            style={{
              width: 120,
              height: 120,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
              transition: {
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}

const btnClass =
  "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition transform hover:scale-105";
