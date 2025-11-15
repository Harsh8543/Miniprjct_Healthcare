

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const moodOptions = [
  { emoji: "😊", label: "Happy", color: "from-yellow-100 via-orange-50 to-yellow-200" },
  { emoji: "😔", label: "Sad", color: "from-blue-100 via-cyan-50 to-blue-200" },
  { emoji: "😤", label: "Frustrated", color: "from-red-100 via-pink-50 to-red-200" },
  { emoji: "😴", label: "Tired", color: "from-purple-100 via-lavender-50 to-purple-200" },
  { emoji: "🤯", label: "Stressed", color: "from-pink-100 via-rose-50 to-pink-200" },
];

export default function PeerForum() {
  const [threads, setThreads] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [mood, setMood] = useState("😊");
  const [anonymous, setAnonymous] = useState(true);

  // 🧠 Fetch threads from backend
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/forum/threads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setThreads(res.data);
      } catch (err) {
        console.error("Failed to fetch threads:", err);
      }
    };
    fetchThreads();
  }, []);

  // 🪶 Add new thread
  const addThread = async () => {
    if (!newPost.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8000/api/forum/threads",
        { text: newPost, mood, anonymous },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setThreads([
        { ...res.data, comments: [], reactions: { like: 0, love: 0, hug: 0 } },
        ...threads,
      ]);
      setNewPost("");
    } catch (err) {
      console.error("Failed to create thread:", err);
    }
  };

  // 💬 Add comment
  const addComment = async (threadId, text) => {
    if (!text.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8000/api/forum/${threadId}/comments`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setThreads(threads.map((t) => (t._id === threadId ? res.data : t)));
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  // ❤️ Add reaction
  const addReaction = async (threadId, type) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8000/api/forum/${threadId}/reactions`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setThreads(threads.map((t) => (t._id === threadId ? res.data : t)));
    } catch (err) {
      console.error("Failed to react:", err);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-6 bg-gradient-to-br from-[#d6f6f3] via-[#f9f9fb] to-[#fde2e4]">
      {/* Floating glowing orbs background */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-teal-200 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-16 right-20 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-25"
        animate={{ y: [0, -25, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />

      <div className="relative grid grid-cols-4 gap-8 z-10">
        <div className="col-span-3 space-y-6">
          <motion.h2
            className="text-3xl font-bold text-teal-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Peer Support Forum 🌿
          </motion.h2>

          {/* ✨ Post Box */}
          <motion.div
            className="backdrop-blur-xl bg-white/60 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-white/40"
            whileHover={{ scale: 1.02 }}
          >
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind today? 🌈"
              className="w-full border-none bg-white/70 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200 text-gray-800 placeholder-gray-500"
            />
            <div className="flex justify-between items-center mt-3 flex-wrap gap-2">
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="border-none bg-white/60 px-3 py-1 rounded-lg shadow text-lg"
              >
                {moodOptions.map((m) => (
                  <option key={m.emoji}>{m.emoji}</option>
                ))}
              </select>

              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={() => setAnonymous(!anonymous)}
                />
                <span>Post Anonymously</span>
              </label>

              <button
                onClick={addThread}
                className="bg-teal-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:bg-teal-600 hover:shadow-lg transition-all"
              >
                Post
              </button>
            </div>
          </motion.div>

          {/* 💬 Threads */}
          {threads.map((thread, i) => {
            const moodObj = moodOptions.find((m) => m.emoji === thread.mood);
            return (
              <motion.div
                key={thread._id || i}
                className={`p-5 rounded-2xl shadow-xl border border-white/40 backdrop-blur-md bg-gradient-to-br ${
                  moodObj ? moodObj.color : "from-gray-100 to-gray-200"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{thread.mood}</span>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {thread.text}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  {thread.anonymous ? "Anonymous" : thread.user?.name || "User"}
                </p>

                {/* Reaction Buttons */}
                <div className="flex space-x-3 mb-3 flex-wrap gap-2">
                  {["like", "love", "hug"].map((type) => (
                    <motion.button
                      key={type}
                      onClick={() => addReaction(thread._id, type)}
                      whileTap={{ scale: 1.2 }}
                      className="px-3 py-1 bg-white/60 rounded-full backdrop-blur-lg shadow hover:bg-white/80"
                    >
                      {type === "like" && "👍"}{" "}
                      {type === "love" && "💖"}{" "}
                      {type === "hug" && "🤗"}{" "}
                      {thread.reactions?.[type] || 0}
                    </motion.button>
                  ))}
                </div>

                {/* Comments */}
                <div className="mt-2">
                  <h4 className="font-semibold text-sm mb-1 text-gray-800">
                    Comments:
                  </h4>
                  {thread.comments?.map((c, j) => (
                    <p
                      key={c._id || j}
                      className="text-sm text-gray-700 ml-2 mb-1"
                    >
                      <span className="font-medium">{c.author || "User"}:</span>{" "}
                      {c.text}
                    </p>
                  ))}
                  <CommentBox threadId={thread._id} addComment={addComment} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 🌸 Sidebar */}
        <motion.div
          className="col-span-1 bg-white/60 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-white/40 space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-semibold text-purple-700">
            Quick Help 🌸
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📞 Helpline: 1800-123-456</li>
            <li>🧘 Guided Meditation</li>
            <li>
              📺{" "}
              <a
                href="https://youtube.com"
                className="text-blue-600 underline"
              >
                Wellness Videos
              </a>
            </li>
            <li>💡 “This forum is peer support, not medical advice.”</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

// 💬 Comment Box Component
function CommentBox({ threadId, addComment }) {
  const [comment, setComment] = useState("");
  const handleSubmit = () => {
    if (comment.trim()) {
      addComment(threadId, comment);
      setComment("");
    }
  };

  return (
    <div className="flex mt-2 space-x-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a kind reply..."
        className="flex-grow border-none bg-white/70 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
      />
      <button
        onClick={handleSubmit}
        className="bg-teal-500 text-white px-3 py-1 rounded-md text-sm hover:bg-teal-600 transition-all"
      >
        Reply
      </button>
    </div>
  );
}
