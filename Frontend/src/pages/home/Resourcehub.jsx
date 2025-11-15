
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function ResourcesPage() {
  const RAW = useMemo(
    () => ({
      meditation: [
        {
          title: "10 Min Morning Meditation",
          desc: "Calm your mind before study.",
          link: "https://www.youtube.com/watch?v=inpok4MKVLM",
          minutes: 10,
          tags: ["calm", "focus", "mindfulness"],
        },
        {
          title: "5 Min Box Breathing",
          desc: "Quick stress relief breathing exercise.",
          link: "https://www.youtube.com/watch?v=nmFUDkj1Aq0",
          minutes: 5,
          tags: ["breathing", "anxiety"],
        },
        {
          title: "Body Scan for Sleep (15m)",
          desc: "Release tension before bed.",
          link: "https://www.youtube.com/watch?v=86m4RC_ADEY",
          minutes: 15,
          tags: ["sleep", "relax"],
        },
      ],
      wellness: [
        {
          title: "Manage Study Stress: 6 Practical Tips",
          desc: "Simple tools for busy students.",
          link: "https://www.youtube.com/watch?v=hnpQrMqDoqE",
          minutes: 9,
          tags: ["stress", "study", "habits"],
        },
        {
          title: "Sleep Hygiene for Better Focus",
          desc: "Routines that improve rest.",
          link: "https://www.youtube.com/watch?v=1zG1U3q4k2Y",
          minutes: 8,
          tags: ["sleep", "productivity"],
        },
        {
          title: "Mindful Study Break (7m)",
          desc: "Reset your attention between tasks.",
          link: "https://www.youtube.com/watch?v=w6T02g5hnT4",
          minutes: 7,
          tags: ["focus", "break"],
        },
      ],
      motivation: [
        {
          title: "Growth Mindset Explained",
          desc: "Believe you can improve.",
          link: "https://www.youtube.com/watch?v=_X0mgOOSpLU",
          minutes: 10,
          tags: ["mindset", "learning"],
        },
        {
          title: "Stay Motivated in College",
          desc: "Keep going when it’s hard.",
          link: "https://www.youtube.com/watch?v=ZXsQAXx_ao0",
          minutes: 6,
          tags: ["motivation", "discipline"],
        },
      ],
    }),
    []
  );

  const MOODS = [
    { key: "stressed", label: "😣 Stressed", suggest: "meditation" },
    { key: "anxious", label: "😟 Anxious", suggest: "meditation" },
    { key: "low", label: "💧 Low Mood", suggest: "motivation" },
    { key: "meh", label: "😐 Low Focus", suggest: "wellness" },
  ];

  const [tab, setTab] = useState("meditation");
  const [q, setQ] = useState("");
  const [maxMins, setMaxMins] = useState(null);
  const [mood, setMood] = useState(null);
  const [favs, setFavs] = useState(() => {
    try {
      const raw = localStorage.getItem("mh_favs");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("mh_favs", JSON.stringify(favs));
    } catch (e) {}
  }, [favs]);

  const chosenTab = mood
    ? MOODS.find((m) => m.key === mood)?.suggest || tab
    : tab;

  const items = RAW[chosenTab] || [];
  const filtered = items.filter((it) => {
    const text = `${it.title} ${it.desc} ${it.tags.join(" ")}`.toLowerCase();
    const okQ = q ? text.includes(q.toLowerCase()) : true;
    const okM = maxMins ? it.minutes <= maxMins : true;
    return okQ && okM;
  });

  const allItems = Object.values(RAW).flat();
  const favItems = allItems.filter((it) => favs.includes(it.title));

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🌈 Floating Orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, 100, -100, 0], y: [0, -80, 80, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ x: [0, -120, 80, 0], y: [0, 60, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-purple-50 p-6 flex flex-col items-center">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-green-500 to-purple-500 mt-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🌿 Wellness Resources
        </motion.h1>
        <p className="text-gray-600 mt-2 text-center">
          Take a deep breath, relax, and explore.
        </p>

        {/* 😌 Mood Buttons */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {MOODS.map((m) => (
            <button
              key={m.key}
              className={`rounded-2xl p-4 font-semibold transition-all shadow ${
                mood === m.key
                  ? "bg-gradient-to-r from-emerald-300 to-purple-300"
                  : "bg-white/70 backdrop-blur hover:shadow-lg"
              }`}
              onClick={() =>
                setMood((prev) => (prev === m.key ? null : m.key))
              }
            >
              {m.label}
              <div className="text-sm text-gray-600">→ {m.suggest}</div>
            </button>
          ))}
        </motion.div>

        {/* 🔍 Filters */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <input
            type="text"
            placeholder="Search: sleep, stress, focus…"
            className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {[5, 10, 15].map((m) => (
            <button
              key={m}
              onClick={() => setMaxMins((v) => (v === m ? null : m))}
              className={`px-4 py-2 rounded-full ${
                maxMins === m
                  ? "bg-gradient-to-r from-indigo-500 to-green-400 text-white"
                  : "bg-white/70 backdrop-blur border"
              }`}
            >
              ≤ {m} min
            </button>
          ))}
          <button
            className="px-4 py-2 rounded-full border bg-white hover:bg-gray-100"
            onClick={() => {
              setQ("");
              setMaxMins(null);
              setMood(null);
            }}
          >
            Clear
          </button>
        </div>

        {/* 🧭 Tabs */}
        <div className="flex flex-wrap justify-center mt-6 gap-3">
          {["meditation", "wellness", "motivation", "favourites"].map((t) => (
            <button
              key={t}
              className={`px-5 py-2 rounded-full transition-all ${
                (!mood && tab === t) ||
                (mood &&
                  t === (MOODS.find((m) => m.key === mood)?.suggest || ""))
                  ? "bg-gradient-to-r from-indigo-500 to-green-500 text-white"
                  : "bg-white/70 backdrop-blur hover:shadow"
              }`}
              onClick={() => {
                setTab(t);
                setMood(null);
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* 💫 Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl w-full px-4"
          layout
        >
          {(tab === "favourites"
            ? favItems
            : filtered
          ).map((res) => (
            <motion.div
              key={res.title}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-5 shadow-md hover:shadow-xl transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="font-bold text-lg text-gray-800">
                {res.title}
              </h3>
              <p className="text-gray-600 mt-2">{res.desc}</p>
              <div className="flex gap-2 flex-wrap mt-3">
                <span className="px-3 py-1 bg-emerald-100 rounded-full text-sm">
                  ~{res.minutes} min
                </span>
                {res.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-indigo-400 text-white text-sm font-semibold shadow hover:opacity-90 transition"
                >
                  ▶ Watch
                </a>
                <button
                  onClick={() =>
                    setFavs((prev) =>
                      prev.includes(res.title)
                        ? prev.filter((x) => x !== res.title)
                        : [...prev, res.title]
                    )
                  }
                  className={`text-2xl transition ${
                    favs.includes(res.title)
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                >
                  {favs.includes(res.title) ? "♥" : "♡"}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-sm text-gray-600 mt-10 text-center max-w-md">
          💡 These resources support wellbeing but don’t replace professional
          help. If you’re struggling, contact your campus counselor or local
          helpline.
        </p>
      </div>
    </div>
  );
}
