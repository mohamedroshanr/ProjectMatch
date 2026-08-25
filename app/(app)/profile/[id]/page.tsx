"use client";

import { useState, use } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitBranch, BookOpen, Code2, Pencil, Check, Image as ImageIcon } from "lucide-react";
import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { MOCK_USERS } from "@/lib/mockData";

const PRESET_SKILLS = [
  // Hardware & Edge
  "Embedded Systems", "C", "C++", "Python", "Edge AI", "PCB Design", "AutoCAD", "ROS", "Arduino", "Raspberry Pi", "VHDL", "Verilog", "IoT", "Microcontrollers",
  // Software & Web
  "React", "Node.js", "TypeScript", "Tailwind CSS", "Next.js", "GraphQL", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS",
  // AI & Data
  "PyTorch", "TensorFlow", "Computer Vision", "OpenCV", "NLP", "Pandas", "Scikit-Learn",
  // Web3 & Design
  "Solidity", "Smart Contracts", "Web3.js", "Figma", "UI/UX", "User Research"
];

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [academicYear, setAcademicYear] = useState("3rd Year");
  const [selectedSkills, setSelectedSkills] = useState(["Embedded Systems", "Python", "ROS"]);
  const [githubLinked, setGithubLinked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editCollege, setEditCollege] = useState("Stanford University");
  const [editDegree, setEditDegree] = useState("Computer Science");
  const [editExperience, setEditExperience] = useState("Intermediate");
  const [editAvailability, setEditAvailability] = useState("Weekends");

  const mockUser = MOCK_USERS.find(u => u.id === id);
  const displayName = editName || (mockUser ? mockUser.name : "User");
  const displayHandle = "@" + displayName.toLowerCase().replace(/\s+/g, '_');
  const displayAvatar = editAvatar || (mockUser ? mockUser.avatar : `https://api.dicebear.com/7.x/notionists/svg?seed=${id}&backgroundColor=b6e3f4`);
  
  const handleEditToggle = () => {
    if (!isEditing) {
      setEditName(displayName);
      setEditAvatar(displayAvatar);
    }
    setIsEditing(!isEditing);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <BlurFade delay={0.1}>
        <div className="bg-nexa-card-dark border border-white/5 rounded-[32px] overflow-hidden shadow-xl shadow-black/50 mb-8 relative">
          <div className="h-32 w-full nexa-grad-bg opacity-40" />
          
          
          <div className="px-8 pb-8 -mt-16 relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6">
            <Avatar className="w-32 h-32 border-4 border-nexa-card-dark bg-nexa-card-dark shrink-0">
              <AvatarImage src={displayAvatar} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left mb-2 md:mb-0 w-full">
              {isEditing ? (
                <div className="space-y-3 mt-4 max-w-md mx-auto md:mx-0">
                  <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Full Name" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                  <Input value={editAvatar} onChange={(e) => setEditAvatar(e.target.value)} placeholder="Profile Picture URL" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                                    <div className="grid grid-cols-2 gap-3">
                    <Input value={editCollege} onChange={(e) => setEditCollege(e.target.value)} placeholder="College" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                    <Input value={editDegree} onChange={(e) => setEditDegree(e.target.value)} placeholder="Degree" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select value={editExperience} onChange={(e) => setEditExperience(e.target.value)} className="bg-black/40 border border-white/10 text-white rounded-xl h-10 px-3 focus:outline-none focus:border-nexa-blue">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <select value={editAvailability} onChange={(e) => setEditAvailability(e.target.value)} className="bg-black/40 border border-white/10 text-white rounded-xl h-10 px-3 focus:outline-none focus:border-nexa-blue">
                      <option value="Weekends">Weekends</option>
                      <option value="Evenings">Evenings</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                    {displayHandle}
                  </h1>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-sm text-nexa-lavender">
                    <span className="flex items-center gap-1.5"><BookOpen size={16} className="text-nexa-blue" /> {editCollege}</span>
                    <span className="flex items-center gap-1.5 text-white/50">{editDegree}</span>
                  </div>
                  <div className="flex gap-2 mt-3 justify-center md:justify-start">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-nexa-blue/10 border border-nexa-blue/20 text-nexa-blue">{editExperience}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">{editAvailability}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 shrink-0">
              <Button onClick={handleEditToggle} className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl px-6 h-11">
                {isEditing ? <><Check size={18} className="mr-2 text-emerald-400" /> Save Profile</> : <><Pencil size={18} className="mr-2" /> Edit Profile</>}
              </Button>
            </div>
          </div>

        </div>
      </BlurFade>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <BlurFade delay={0.2}>
            <div className="bg-nexa-card-dark border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Academic Status</h3>
              <select 
                value={academicYear} 
                onChange={e => setAcademicYear(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-nexa-blue"
              >
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="4th Year">4th Year (Senior)</option>
                <option value="Grad Student">Grad Student</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="bg-nexa-card-dark border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <GitBranch size={18} /> GitHub Integration
              </h3>
              
              {!githubLinked ? (
                <div className="text-center p-6 bg-black/40 border border-white/5 rounded-xl border-dashed">
                  <GitBranch size={32} className="mx-auto text-white/20 mb-3" />
                  <p className="text-sm text-nexa-lavender-3 mb-4">Link your GitHub to showcase your repositories and commit history.</p>
                  <Button onClick={() => setGithubLinked(true)} className="bg-white/10 hover:bg-white/20 text-white rounded-lg h-9 text-sm">
                    Connect GitHub
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-nexa-blue font-medium text-sm">ProjectMatch</span>
                      <span className="text-xs text-nexa-lavender-3">TypeScript</span>
                    </div>
                    <p className="text-xs text-nexa-lavender">AI-Powered Team Formation Platform for Hackathons & Startups.</p>
                  </div>

                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-nexa-blue font-medium text-sm">edge-ai-robot</span>
                      <span className="text-xs text-nexa-lavender-3">Python</span>
                    </div>
                    <p className="text-xs text-nexa-lavender">Computer vision processing pipeline for ROS.</p>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-nexa-blue font-medium text-sm">smart-home-hub</span>
                      <span className="text-xs text-nexa-lavender-3">Rust</span>
                    </div>
                    <p className="text-xs text-nexa-lavender">ESP32 firmware written in Rust.</p>
                  </div>
                </div>
              )}
            </div>
          </BlurFade>
        </div>

        <div className="md:col-span-2 space-y-8">
          <BlurFade delay={0.4}>
            <div className="bg-nexa-card-dark border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Code2 size={18} /> Available Skills
              </h3>
              <p className="text-sm text-nexa-lavender mb-6">Select the tags that best represent your technical abilities to improve AI matchmaking accuracy.</p>
              
              <div className="flex flex-wrap gap-2">
                {PRESET_SKILLS.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                        isSelected 
                          ? 'bg-nexa-blue/20 text-nexa-blue border-nexa-blue/40 shadow-lg shadow-nexa-blue/10' 
                          : 'bg-white/5 text-nexa-lavender border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {skill}
                    </button>
                  )
                })}
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
