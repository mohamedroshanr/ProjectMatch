"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile } from "@/lib/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreatePostModalProps {
  onClose: () => void;
  currentUser: UserProfile | null;
}

export default function CreatePostModal({ onClose, currentUser }: CreatePostModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [roles, setRoles] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    
    try {
      await addDoc(collection(db, "posts"), {
        title,
        description,
        rolesNeeded: roles.split(",").map((r) => r.trim()).filter(Boolean),
        skillsNeeded: skills.split(",").map((s) => s.trim()).filter(Boolean),
        authorId: currentUser.uid,
        createdAt: Date.now(),
        interested: [],
      });
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={onClose} 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-nexa-card-dark border border-white/10 w-full max-w-lg rounded-[32px] shadow-2xl shadow-nexa-blue/10 overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-1 nexa-grad-bg" />
          
          <div className="flex justify-between items-center p-6 border-b border-white/5">
            <h2 className="text-xl font-semibold text-white">Post a Project</h2>
            <button onClick={onClose} className="text-nexa-lavender-3 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-nexa-lavender">Project Title</label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., AI Code Assistant for VS Code"
                className="bg-black/30 border-white/10 focus:border-nexa-blue focus:ring-nexa-blue rounded-xl h-11 text-white placeholder:text-white/20"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-nexa-lavender">Description</label>
              <Textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What are you building? Why is it cool?"
                className="bg-black/30 border-white/10 focus:border-nexa-blue focus:ring-nexa-blue rounded-xl h-28 resize-none text-white placeholder:text-white/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-nexa-lavender">Roles Needed (comma separated)</label>
              <Input
                required
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                placeholder="e.g., Frontend Dev, ML Engineer"
                className="bg-black/30 border-white/10 focus:border-nexa-blue focus:ring-nexa-blue rounded-xl h-11 text-white placeholder:text-white/20"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-nexa-lavender">Skills Needed (comma separated)</label>
              <Input
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., React, Python, TensorFlow"
                className="bg-black/30 border-white/10 focus:border-nexa-blue focus:ring-nexa-blue rounded-xl h-11 text-white placeholder:text-white/20"
              />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={onClose} className="text-nexa-lavender hover:text-white hover:bg-white/5 rounded-xl">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="nexa-grad-bg text-white rounded-xl px-6 border-0 shadow-lg shadow-nexa-accent/20">
                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                Post Project
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
