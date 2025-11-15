import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const CanvasBoard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#4A90E2");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "my_drawing.png";
    link.click();
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-br from-[#a8edea] via-[#fed6e3] to-[#fff5f8] overflow-hidden">

      {/* 🌸 Floating pastel orbs for calm atmosphere */}
      <motion.div
        className="absolute w-72 h-72 bg-pink-300/20 rounded-full blur-3xl top-10 left-10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-blue-300/20 rounded-full blur-3xl bottom-10 right-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Header */}
      <motion.h2
        className="text-4xl font-bold text-indigo-800 drop-shadow-md mb-2 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🎨 Mindful Colors
      </motion.h2>

      <motion.p
        className="text-gray-700 mb-6 text-center max-w-md z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Express your emotions through art.  
        <span className="text-indigo-600 font-medium">Relax, draw, and breathe. 💫</span>
      </motion.p>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border-4 border-white/50 rounded-2xl shadow-lg bg-white/70 backdrop-blur-md cursor-crosshair"
      />

      {/* Color Picker */}
      <div className="flex items-center gap-3 mt-5 z-10">
        <label className="text-gray-700 font-medium">🎨 Pick Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 rounded-full border-none outline-none cursor-pointer shadow-inner"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-6 z-10">
        <button
          onClick={clearCanvas}
          className="px-6 py-3 bg-white/60 backdrop-blur-md text-red-600 font-semibold rounded-xl shadow hover:bg-red-100 transition-all"
        >
          Clear
        </button>
        <button
          onClick={saveDrawing}
          className="px-6 py-3 bg-white/60 backdrop-blur-md text-green-700 font-semibold rounded-xl shadow hover:bg-green-100 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CanvasBoard;
