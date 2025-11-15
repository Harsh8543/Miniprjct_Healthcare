
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import Input from "@/components/inputs/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:8000/api/user/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(res.data);
//         setFormData(res.data);
//       } catch (err) {
//         console.error("Profile fetch error:", err.response?.data || err.message);
//         toast.error("Failed to fetch profile");
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         "http://localhost:8000/api/user/profile",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setProfile(res.data);
//       setIsEditing(false);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       console.error("Profile update error:", err.response?.data || err.message);
//       toast.error("Failed to update profile");
//     }
//   };

//   if (!profile) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-green-50">
//         <p className="text-gray-500">Loading profile...</p>
//       </div>
//     );
//   }

//   const avatarUrl =
//     profile.profilePic ||
//     `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
//       profile.name || "U"
//     )}`;

//   return (
//     <div
//       className="p-6 min-h-screen"
//       style={{
//         background: "linear-gradient(to bottom, #d9f0f0, #f0e5d9)", // soft peaceful background
//       }}
//     >
//       <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 space-y-6">
//         {/* Profile Header */}
//         <div className="flex flex-col sm:flex-row items-center gap-6">
//           <Avatar className="w-24 h-24 border-4 border-green-300 shadow-lg">
//             <AvatarImage src={avatarUrl} alt={profile.name} />
//             <AvatarFallback>
//               {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
//             </AvatarFallback>
//           </Avatar>

//           <div className="flex-1">
//             <h2 className="text-3xl font-bold text-green-800">{profile.name}</h2>
//             <p className="text-gray-700">{profile.bio || "-"}</p>
//             <p className="text-gray-500 text-sm">{profile.email}</p>
//             <p className="text-gray-500 text-sm">
//               Height: {profile.height ?? "-"} cm | Weight: {profile.weight ?? "-"} kg
//             </p>
//             <p className="text-gray-500 text-sm">
//               Category: {profile.psychCategory || "-"}
//             </p>
//             <Button
//               className="mt-3 bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900"
//               onClick={() => setIsEditing(true)}
//             >
//               Edit Profile
//             </Button>
//           </div>
//         </div>

//         {/* Wellness Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="p-4 rounded-xl text-center" style={{ background: "#FFEFDB" }}>
//             <h3 className="text-xl font-bold text-orange-700">🔥 {profile.streak ?? 0}</h3>
//             <p className="text-gray-700">Day Streak</p>
//           </div>
//           <div className="p-4 rounded-xl text-center" style={{ background: "#D8F3DC" }}>
//             <h3 className="text-xl font-bold text-green-700">{profile.wellnessPoints ?? 0}</h3>
//             <p className="text-gray-700">Wellness Points</p>
//           </div>
//           <div className="p-4 rounded-xl text-center" style={{ background: "#FCE4EC" }}>
//             <h3 className="text-xl font-bold text-pink-700">{profile.currentMood || "😊"}</h3>
//             <p className="text-gray-700">Current Mood</p>
//           </div>
//         </div>

//         {/* Edit Profile Modal */}
//         <Dialog open={isEditing} onOpenChange={setIsEditing}>
//           <DialogContent className="sm:max-w-lg">
//             <DialogHeader>
//               <DialogTitle className="text-green-700">Edit Profile</DialogTitle>
//             </DialogHeader>

//             <div className="space-y-4">
//               <Input
//                 name="name"
//                 value={formData.name || ""}
//                 onChange={handleChange}
//                 placeholder="Name"
//               />
//               <Input
//                 name="email"
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={handleChange}
//                 placeholder="Email"
//               />
//               <Textarea
//                 name="bio"
//                 value={formData.bio || ""}
//                 onChange={handleChange}
//                 placeholder="Bio"
//               />
//               <Input
//                 name="height"
//                 type="number"
//                 value={formData.height || ""}
//                 onChange={handleChange}
//                 placeholder="Height (cm)"
//               />
//               <Input
//                 name="weight"
//                 type="number"
//                 value={formData.weight || ""}
//                 onChange={handleChange}
//                 placeholder="Weight (kg)"
//               />
//               <Input
//                 name="psychCategory"
//                 value={formData.psychCategory || ""}
//                 onChange={handleChange}
//                 placeholder="Psychology Category"
//               />
//             </div>

//             <DialogFooter className="flex justify-end gap-3 mt-4">
//               <Button variant="outline" onClick={() => setIsEditing(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleSave}>Save</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }



















import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Input from "@/components/inputs/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data || err.message);
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:8000/api/user/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err.response?.data || err.message);
      toast.error("Failed to update profile");
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#d9f0f0] to-[#f7ecec]">
        <p className="text-gray-600 text-lg animate-pulse">Loading your calm space...</p>
      </div>
    );
  }

  const avatarUrl =
    profile.profilePic ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      profile.name || "U"
    )}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="p-6 min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom right, #e0f7fa, #fce4ec, #fff8e1)", // soft gradient
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-6 border border-white/40"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Avatar className="w-28 h-28 border-4 border-pink-200 shadow-lg">
              <AvatarImage src={avatarUrl} alt={profile.name} />
              <AvatarFallback className="bg-pink-100 text-pink-700 text-2xl font-bold">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {profile.name}
            </h2>
            <p className="text-gray-700 italic mt-1">
              {profile.bio || "Every sunrise brings new calm energy ☀️"}
            </p>
            <p className="text-gray-500 text-sm">{profile.email}</p>
            <p className="text-gray-500 text-sm mt-1">
              Height: {profile.height ?? "-"} cm | Weight: {profile.weight ?? "-"} kg
            </p>
            <p className="text-gray-500 text-sm">
              Category: {profile.psychCategory || "Student Wellness"}
            </p>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                className="mt-4 bg-gradient-to-r from-green-200 to-teal-200 text-green-800 font-semibold hover:from-green-300 hover:to-teal-300 transition-all"
                onClick={() => setIsEditing(true)}
                title="Update your peaceful journey 🌿"
              >
                Edit Profile
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Wellness Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-5 rounded-2xl text-center bg-[#FFF1E0] hover:shadow-md transition">
            <h3 className="text-2xl font-bold text-orange-700">
              🔥 {profile.streak ?? 0}
            </h3>
            <p className="text-gray-600 mt-1">Day Streak</p>
          </div>

          <div className="p-5 rounded-2xl text-center bg-[#D8F3DC] hover:shadow-md transition">
            <h3 className="text-2xl font-bold text-green-700">
              💎 {profile.wellnessPoints ?? 0}
            </h3>
            <p className="text-gray-600 mt-1">Wellness Points</p>
          </div>

          <div className="p-5 rounded-2xl text-center bg-[#FCE4EC] hover:shadow-md transition">
            <h3 className="text-2xl font-bold text-pink-700">
              {profile.currentMood || "😊"}
            </h3>
            <p className="text-gray-600 mt-1">Current Mood</p>
          </div>
        </motion.div>

        {/* Edit Profile Modal */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-lg bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-green-700 text-lg font-semibold">
                Edit Your Profile 🌸
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mt-3">
              <Input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
              />
              <Input
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Email"
              />
              <Textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                placeholder="Write a small calming note about yourself 🌷"
              />
              <Input
                name="height"
                type="number"
                value={formData.height || ""}
                onChange={handleChange}
                placeholder="Height (cm)"
              />
              <Input
                name="weight"
                type="number"
                value={formData.weight || ""}
                onChange={handleChange}
                placeholder="Weight (kg)"
              />
              <Input
                name="psychCategory"
                value={formData.psychCategory || ""}
                onChange={handleChange}
                placeholder="Psychology Category"
              />
            </div>

            <DialogFooter className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                className="hover:bg-gray-100 transition-all"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-green-300 to-teal-300 text-green-900 font-medium hover:from-green-400 hover:to-teal-400"
                onClick={handleSave}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </motion.div>
  );
}
