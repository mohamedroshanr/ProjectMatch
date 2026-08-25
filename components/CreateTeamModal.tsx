"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CreateTeamModal({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (team: any) => void }) {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("Software");
  const [roles, setRoles] = useState("");

  const handleSubmit = () => {
    if (!name) return;
    
    const newTeam = {
      id: Date.now().toString(),
      name,
      tag,
      status: roles.trim() ? `Looking for ${roles.split(',').length}` : "Forming",
      members: [
        { name: "You", role: "Founder", img: `https://api.dicebear.com/7.x/notionists/svg?backgroundColor=b6e3f4&seed=${Date.now()}` }
      ],
      missingRoles: roles.split(',').map(r => r.trim()).filter(Boolean),
      color: "from-nexa-blue to-nexa-accent"
    };

    onCreate(newTeam);
    onClose();
    setName("");
    setRoles("");
    setTag("Software");
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
              <h2 className="text-xl font-bold text-white">Create New Team</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-nexa-lavender hover:text-white rounded-full" aria-label="Icon Button">
                <X size={20} />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-nexa-lavender mb-1.5">Team Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Nexus VR Studio" className="bg-black/40 border-white/10 text-white rounded-xl h-11" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-nexa-lavender mb-1.5">Category Tag</label>
                <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none focus:border-nexa-blue h-11">
                  <option value="Software">Software</option>
                  <option value="Hardware/IoT">Hardware / IoT</option>
                  <option value="AI/ML">AI / Machine Learning</option>
                  <option value="Web3">Web3 / Crypto</option>
                  <option value="FinTech">FinTech</option>
                  <option value="Gaming/AR">Gaming / AR</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-nexa-lavender mb-1.5">Missing Roles (comma separated)</label>
                <Input value={roles} onChange={(e) => setRoles(e.target.value)} placeholder="e.g. Backend Dev, 3D Artist" className="bg-black/40 border-white/10 text-white rounded-xl h-11" />
              </div>

              <Button onClick={handleSubmit} className="w-full nexa-grad-bg text-white rounded-xl h-11 shadow-lg shadow-nexa-accent/20 mt-4 border-0">
                <Check size={16} className="mr-2" /> Form Team
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
