"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePosts } from "@/lib/hooks/usePosts";
import { useAuth } from "@/lib/hooks/useAuth";
import { useProfile } from "@/lib/hooks/useProfile";

export function CreateRequirementModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("Remote");
  
  const { createPost } = usePosts();
  const { user } = useAuth();
  const { profile } = useProfile(user?.uid ?? null);

  const handleSubmit = async () => {
    if (!title || !description || !user) return;
    
    await createPost({
      title,
      description: `${description} \n\n📍 Location: ${location}`,
      skillsNeeded: skills.split(",").map(s => s.trim()),
      rolesNeeded: ["Contributor"],
      authorId: user.uid,
      authorName: profile?.displayName || "Anonymous",
      authorPhoto: profile?.photoURL || "",
    });
    
    onClose();
    setTitle("");
    setDescription("");
    setSkills("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-nexa-card-dark border border-white/10 p-6 rounded-[32px] shadow-2xl shadow-black/80 relative z-10 w-full max-w-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Post a Requirement</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-nexa-lavender hover:text-white rounded-full">
                <X size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-nexa-lavender mb-1.5">Project Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Edge AI Drone Startup" className="bg-black/40 border-white/10 text-white rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-nexa-lavender mb-1.5">Project Details</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what you're building..." className="bg-black/40 border-white/10 text-white rounded-xl h-24 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-nexa-lavender mb-1.5">Needed Skills (comma separated)</label>
                <Input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. C++, ROS, OpenCV" className="bg-black/40 border-white/10 text-white rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-nexa-lavender mb-1.5">Location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none">
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="San Francisco, CA">San Francisco, CA</option>
                  <option value="New York, NY">New York, NY</option>
                  <option value="London, UK">London, UK</option>
                </select>
              </div>

              <Button onClick={handleSubmit} className="w-full nexa-grad-bg text-white rounded-xl h-11 shadow-lg shadow-nexa-accent/20 mt-4 border-0">
                <Send size={16} className="mr-2" /> Post to Feed
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
