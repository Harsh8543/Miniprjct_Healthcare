
// import React, { useState, useEffect, useContext } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { Calendar, Users, BookOpen, Smile } from "lucide-react";
// import axios from "axios";
// import { UserContext } from "@/context/usercontext";
// import { NavLink } from "react-router-dom";

// const Dashboard = () => {
//   const [moodData, setMoodData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { user } = useContext(UserContext);

//   const moodMap = {
//     1: "😞",
//     2: "😐",
//     3: "🙂",
//     4: "😊",
//     5: "🤩",
//   };

//   useEffect(() => {
//     fetchMoods();
//   }, []);

//   const fetchMoods = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/moods", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       const formatted = res.data.map((m) => ({ date: m.date, mood: m.mood }));
//       setMoodData(formatted);
//     } catch (err) {
//       console.error("Error fetching mood:", err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMoodUpdate = async (value) => {
//     const today = new Date().toISOString().split("T")[0];
//     try {
//       await axios.post(
//         "http://localhost:8000/api/moods",
//         { date: today, mood: value },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       fetchMoods();
//     } catch (err) {
//       console.error("Error updating mood:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 via-yellow-50 to-pink-50">
//       {/* Header */}
//       <div className="mb-8 text-center">
//         <h2 className="text-3xl font-extrabold text-green-800">
//           {user ? `Welcome back, ${user.name.split(" ")[0]} 👋` : "Welcome 👋"}
//         </h2>
//         <p className="text-gray-600 mt-2">
//           Here’s your mental wellness snapshot for the week.
//         </p>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {/* Positive Habit Tracker */}
//         <div className="bg-gradient-to-tr from-green-200 to-green-400 text-green-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
//           <h3 className="font-semibold text-lg mb-2">🌱 Positive Habit Tracker</h3>
//           <p className="mb-4 text-sm opacity-90">
//             Replace bad habits with good ones & grow every day 💪
//           </p>
//           <NavLink
//             to="/breathing"
//             className="inline-block bg-white text-green-700 text-sm font-medium px-6 py-2 rounded-full hover:bg-green-100 transition-colors"
//           >
//             Start Tracking
//           </NavLink>
//         </div>

//         {/* Mood Tracker */}
//         <div className="bg-gradient-to-tr from-yellow-200 to-yellow-400 text-yellow-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
//           <div className="flex items-center gap-2 mb-2">
//             <Smile size={18} />
//             <h3 className="font-semibold text-lg">Mood Tracker</h3>
//           </div>

//           {loading ? (
//             <p className="text-sm">Loading...</p>
//           ) : moodData.length === 0 ? (
//             <p className="text-sm">
//               No mood data logged yet — click a mood below to start!
//             </p>
//           ) : (
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart data={moodData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#fff5" />
//                 <XAxis dataKey="date" stroke="#fff" />
//                 <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#fff" />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="mood"
//                   stroke="#fff"
//                   strokeWidth={3}
//                   dot={{ r: 5, fill: "#fff" }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           )}

//           <div className="flex gap-2 mt-4 flex-wrap">
//             {[1, 2, 3, 4, 5].map((val) => (
//               <button
//                 key={val}
//                 onClick={() => handleMoodUpdate(val)}
//                 className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/40 text-xl transition"
//               >
//                 {moodMap[val]}
//               </button>
//             ))}
//           </div>
//           <p className="text-sm mt-2 opacity-90">Tap an emoji to log today’s mood.</p>
//           <NavLink
//             to="/moodtracker"
//             className="inline-block mt-3 text-yellow-900 underline font-medium"
//           >
//             View Full Tracker →
//           </NavLink>
//         </div>

//         {/* Self Assessment */}
//         <div className="bg-gradient-to-tr from-purple-200 to-purple-400 text-purple-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
//           <h3 className="font-semibold text-lg mb-2">📝 Self Assessment</h3>
//           <p className="mb-4 text-sm opacity-90">
//             Check your mental wellness with a quick test.
//           </p>
//           <NavLink
//             to="/selfassestments"
//             className="inline-block bg-white text-purple-700 text-sm font-medium px-6 py-2 rounded-full hover:bg-purple-100 transition-colors"
//           >
//             Click to Evaluate
//           </NavLink>
//         </div>

//         {/* Next Appointment */}
//         <div className="bg-gradient-to-tr from-pink-200 to-pink-400 text-pink-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
//           <div className="flex items-center gap-2 mb-2">
//             <Calendar size={18} />
//             <h3 className="font-semibold text-lg">Next Appointment</h3>
//           </div>
//           <p className="mb-1">Counselor: Dr. Mehta</p>
//           <p className="font-semibold">Tomorrow, 5:00 PM</p>
//           <button className="mt-3 bg-white text-pink-600 text-sm font-medium px-6 py-2 rounded-full hover:bg-pink-100 transition-colors">
//             Join Session
//           </button>
//         </div>

//         {/* Community Hub */}
//         <div className="bg-gradient-to-tr from-teal-200 to-cyan-400 text-teal-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
//           <div className="flex items-center gap-2 mb-2">
//             <Users size={18} />
//             <h3 className="font-semibold text-lg">Community Hub</h3>
//           </div>
//           <ul className="list-disc pl-5 space-y-1 text-sm">
//             <li>“Coping with exam stress”</li>
//             <li>“Meditation tips for beginners”</li>
//             <li>“How I improved my sleep schedule”</li>
//           </ul>
//           <NavLink
//             to="/community"
//             className="inline-block mt-3 underline font-medium"
//           >
//             View More →
//           </NavLink>
//         </div>

//         {/* Resources */}
//         <div className="bg-gradient-to-tr from-fuchsia-200 to-purple-400 text-fuchsia-900 shadow-lg hover:scale-105 hover:shadow-2xl transition-all rounded-2xl p-6">
//           <div className="flex items-center gap-2 mb-2">
//             <BookOpen size={18} />
//             <h3 className="font-semibold text-lg">Resources</h3>
//           </div>
//           <p className="mb-3 text-sm opacity-90">
//             Guided meditations, self-help articles, and videos.
//           </p>
//           <NavLink
//             to="/resourcehub"
//             className="inline-block bg-white text-purple-700 text-sm font-medium px-6 py-2 rounded-full hover:bg-purple-100 transition-colors"
//           >
//             Explore
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useState, useEffect, useContext } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { Calendar, Users, BookOpen, Smile } from "lucide-react";
// import axios from "axios";
// import { UserContext } from "@/context/usercontext";
// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";

// // ✨ Floating Animation Variant
// const floatAnim = {
//   initial: { y: 0 },
//   animate: {
//     y: [0, -10, 0],
//     transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
//   },
// };

// // ✨ Fade-in Animation
// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
// };

// const Dashboard = () => {
//   const [moodData, setMoodData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { user } = useContext(UserContext);

//   const moodMap = {
//     1: "😞",
//     2: "😐",
//     3: "🙂",
//     4: "😊",
//     5: "🤩",
//   };

//   useEffect(() => {
//     fetchMoods();
//   }, []);

//   const fetchMoods = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/moods", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       const formatted = res.data.map((m) => ({ date: m.date, mood: m.mood }));
//       setMoodData(formatted);
//     } catch (err) {
//       console.error("Error fetching mood:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMoodUpdate = async (value) => {
//     const today = new Date().toISOString().split("T")[0];
//     try {
//       await axios.post(
//         "http://localhost:8000/api/moods",
//         { date: today, mood: value },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       fetchMoods();
//     } catch (err) {
//       console.error("Error updating mood:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen p-0 bg-[#f8fafc]">

//       {/* ✅ NEW SUPER UNIQUE HERO SECTION */}
//       <section className="relative h-[55vh] w-full overflow-hidden flex items-center justify-center">
        
//         {/* 🌈 Animated Colorful Blobs */}
//         <motion.div
//           className="absolute w-[520px] h-[520px] rounded-full bg-pink-300 blur-3xl opacity-40 -top-20 -left-32"
//           animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
//           transition={{ repeat: Infinity, duration: 16 }}
//         />
//         <motion.div
//           className="absolute w-[420px] h-[420px] rounded-full bg-yellow-300 blur-3xl opacity-40 top-10 right-0"
//           animate={{ x: [0, -50, 30, 0], y: [0, 20, -20, 0] }}
//           transition={{ repeat: Infinity, duration: 20 }}
//         />
//         <motion.div
//           className="absolute w-[380px] h-[380px] rounded-full bg-green-300 blur-3xl opacity-40 bottom-0 left-20"
//           animate={{ x: [0, 30, -30, 0], y: [0, -25, 25, 0] }}
//           transition={{ repeat: Infinity, duration: 22 }}
//         />

//         {/* Glass Card */}
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="show"
//           className="relative z-10 bg-white/20 backdrop-blur-2xl shadow-2xl
//           border border-white/30 rounded-3xl px-10 py-8 w-[90%] md:w-[55%] text-center"
//         >
//           <motion.h1
//             variants={floatAnim}
//             initial="initial"
//             animate="animate"
//             className="text-4xl md:text-5xl font-extrabold text-slate-800"
//           >
//             Welcome to Your Calm Space ✨
//           </motion.h1>

//           <p className="mt-4 text-gray-700 text-lg">
//             Track your emotions, build healthy habits & improve mental wellness.
//           </p>

//           <motion.button
//             whileHover={{ scale: 1.08 }}
//             className="mt-6 px-8 py-3 bg-gradient-to-r from-[#ff7eb3] to-[#65c7f7]
//             shadow-xl rounded-full text-white font-bold"
//           >
//             Start Your Journey →
//           </motion.button>
//         </motion.div>
//       </section>

//       {/* ✅ Dashboard Header */}
//       <motion.div
//         variants={fadeUp}
//         initial="hidden"
//         animate="show"
//         className="p-6 text-center"
//       >
//         <h2 className="text-3xl font-extrabold text-green-800">
//           {user ? `Welcome back, ${user.name.split(" ")[0]} 👋` : "Welcome 👋"}
//         </h2>
//         <p className="text-gray-600 mt-2">
//           Here's your mental wellness snapshot for the week.
//         </p>
//       </motion.div>

//       {/* ✅ GRID with animations */}
//       <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
//         {/* ✅ Each Card Animated Wrapper */}
//         {[
//           {
//             title: "🌱 Positive Habit Tracker",
//             desc: "Replace bad habits with good ones & grow every day 💪",
//             link: "/breathing",
//             gradient: "from-green-200 to-green-400",
//           },
//           {
//             title: "😄 Mood Tracker",
//             desc: "Log your emotions & understand your patterns.",
//             link: "/moodtracker",
//             gradient: "from-yellow-200 to-yellow-400",
//             mood: true,
//           },
//           {
//             title: "📝 Self Assessment",
//             desc: "Check your mental wellness with a quick test.",
//             link: "/selfassestments",
//             gradient: "from-purple-200 to-purple-400",
//           },
//         ].map((card, idx) => (
//           <motion.div
//             key={idx}
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             transition={{ delay: idx * 0.15 }}
//             className={`bg-gradient-to-tr ${card.gradient} text-gray-900 shadow-xl 
//             hover:shadow-2xl hover:scale-[1.03] transition-all rounded-2xl p-6`}
//           >
//             <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
//             <p className="mb-4 text-sm opacity-90">{card.desc}</p>

//             {!card.mood ? (
//               <NavLink
//                 to={card.link}
//                 className="inline-block bg-white text-gray-700 text-sm font-medium px-6 py-2 rounded-full hover:bg-gray-100"
//               >
//                 Explore →
//               </NavLink>
//             ) : (
//               <>
//                 {/* MOOD TRACKER CHART */}
//                 <div>
//                   {loading ? (
//                     <p>Loading...</p>
//                   ) : moodData.length === 0 ? (
//                     <p>No mood data logged yet.</p>
//                   ) : (
//                     <ResponsiveContainer width="100%" height={160}>
//                       <LineChart data={moodData}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#0002" />
//                         <XAxis dataKey="date" stroke="#000" />
//                         <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#000" />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="mood" stroke="#222" strokeWidth={3} />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   )}
//                 </div>

//                 {/* Mood Buttons */}
//                 <div className="flex gap-2 mt-4 flex-wrap">
//                   {[1, 2, 3, 4, 5].map((v) => (
//                     <button
//                       key={v}
//                       onClick={() => handleMoodUpdate(v)}
//                       className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/40 text-xl transition"
//                     >
//                       {moodMap[v]}
//                     </button>
//                   ))}
//                 </div>

//                 <NavLink to="/moodtracker" className="underline text-sm mt-2 block">
//                   View Details →
//                 </NavLink>
//               </>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Calendar, Users, BookOpen, Smile } from "lucide-react";
import axios from "axios";
import { UserContext } from "@/context/usercontext";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// ✨ Floating Animation
const floatAnim = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  },
};

// ✨ Fade-in Animation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Dashboard = () => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);

  const moodMap = {
    1: "😞",
    2: "😐",
    3: "🙂",
    4: "😊",
    5: "🤩",
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/moods", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const formatted = res.data.map((m) => ({
        date: m.date,
        mood: m.mood,
      }));

      setMoodData(formatted);
    } catch (err) {
      console.log("Error fetching mood:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodUpdate = async (value) => {
    const today = new Date().toISOString().split("T")[0];

    try {
      await axios.post(
        "http://localhost:8000/api/moods",
        { date: today, mood: value },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchMoods();
    } catch (err) {
      console.log("Error updating mood:", err);
    }
  };

  return (
    <div className="min-h-screen p-0 bg-[#f8fafc]">

      {/* ✅ HERO SECTION */}
      <section className="relative h-[55vh] w-full overflow-hidden flex items-center justify-center">

        {/* Animated colorful blobs */}
        <motion.div
          className="absolute w-[520px] h-[520px] rounded-full bg-pink-300 blur-3xl opacity-40 -top-20 -left-32"
          animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
          transition={{ repeat: Infinity, duration: 16 }}
        />

        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full bg-yellow-300 blur-3xl opacity-40 top-10 right-0"
          animate={{ x: [0, -50, 30, 0], y: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 20 }}
        />

        <motion.div
          className="absolute w-[380px] h-[380px] rounded-full bg-green-300 blur-3xl opacity-40 bottom-0 left-20"
          animate={{ x: [0, 30, -30, 0], y: [0, -25, 25, 0] }}
          transition={{ repeat: Infinity, duration: 22 }}
        />

        {/* Glass Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative z-10 bg-white/20 backdrop-blur-2xl shadow-2xl border border-white/30 rounded-3xl px-10 py-8 w-[90%] md:w-[55%] text-center"
        >
          <motion.h1
            variants={floatAnim}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-5xl font-extrabold text-slate-800"
          >
            Welcome to Your Calm Space ✨
          </motion.h1>

          <p className="mt-4 text-gray-700 text-lg">
            Track emotions, build good habits & improve your mental wellness.
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-[#ff7eb3] to-[#65c7f7]
              shadow-xl rounded-full text-white font-bold"
          >
            Start Your Journey →
          </motion.button>
        </motion.div>
      </section>

      {/* ✅ Dashboard Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="p-6 text-center"
      >
        <h2 className="text-3xl font-extrabold text-green-800">
          {user ? `Welcome back, ${user.name.split(" ")[0]} 👋` : "Welcome 👋"}
        </h2>
        <p className="text-gray-600 mt-2">
          Here's your mental wellness snapshot for the week.
        </p>
      </motion.div>

      {/* ✅ GRID - Now 6 Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* ✅ ALL 6 Cards Data */}
        {[
          {
            title: "🌱 Positive Habit Tracker",
            desc: "Replace bad habits with good ones & grow every day 💪",
            link: "/breathing",
            gradient: "from-green-200 to-green-400",
          },
          {
            title: "😄 Mood Tracker",
            desc: "Log your emotions & understand your patterns.",
            link: "/moodtracker",
            gradient: "from-yellow-200 to-yellow-400",
            mood: true,
          },
          {
            title: "📝 Self Assessment",
            desc: "Check your mental wellness with a quick test.",
            link: "/selfassestments",
            gradient: "from-purple-200 to-purple-400",
          },
          {
            title: "📅 Next Appointment",
            desc: "Your upcoming counseling session details.",
            link: "/appointments",
            gradient: "from-pink-200 to-pink-400",
          },
          {
            title: "👥 Community Hub",
            desc: "Join helpful discussions & share your experience.",
            link: "/community",
            gradient: "from-teal-200 to-cyan-400",
          },
          {
            title: "📚 Resource Library",
            desc: "Meditation audios, articles & videos.",
            link: "/resourcehub",
            gradient: "from-fuchsia-200 to-purple-400",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: idx * 0.15 }}
            className={`bg-gradient-to-tr ${card.gradient} text-gray-900 shadow-xl 
              hover:shadow-2xl hover:scale-[1.03] transition-all rounded-2xl p-6`}
          >
            <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
            <p className="mb-4 text-sm opacity-90">{card.desc}</p>

            {/* ✅ MOOD CHART CARD LOGIC */}
            {!card.mood ? (
              <NavLink
                to={card.link}
                className="inline-block bg-white text-gray-700 text-sm font-medium px-6 py-2 rounded-full hover:bg-gray-100"
              >
                Explore →
              </NavLink>
            ) : (
              <>
                {/* MOOD CHART */}
                <div>
                  {loading ? (
                    <p>Loading...</p>
                  ) : moodData.length === 0 ? (
                    <p>No mood data logged yet.</p>
                  ) : (
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={moodData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#0002" />
                        <XAxis dataKey="date" stroke="#000" />
                        <YAxis
                          domain={[0, 5]}
                          ticks={[1, 2, 3, 4, 5]}
                          stroke="#000"
                        />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="mood"
                          stroke="#222"
                          strokeWidth={3}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Mood Buttons */}
                <div className="flex gap-2 mt-4 flex-wrap">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      onClick={() => handleMoodUpdate(v)}
                      className="px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/40 text-xl transition"
                    >
                      {moodMap[v]}
                    </button>
                  ))}
                </div>

                <NavLink
                  to="/moodtracker"
                  className="underline text-sm mt-2 block"
                >
                  View Details →
                </NavLink>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
