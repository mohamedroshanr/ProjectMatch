"use client";

import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { Tilt } from "@/components/motion-primitives/tilt";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Code, PenTool, Database, MessageSquare } from "lucide-react";
import { useState } from "react";
import { CreateTeamModal } from "@/components/CreateTeamModal";

// Mock data to ensure it renders beautifully
const MOCK_TEAMS = [
  {
    id: "1",
    name: "Project Alpha (AI Trading)",
    tag: "FinTech",
    status: "Forming",
    members: [
      { name: "Alex Chen", role: "ML Engineer", img: "https://api.dicebear.com/7.x/notionists/svg?backgroundColor=b6e3f4&seed=alex" },
      { name: "Sarah Kim", role: "Frontend", img: "https://api.dicebear.com/7.x/notionists/svg?backgroundColor=b6e3f4&seed=sarah" }
    ],
    missingRoles: ["Backend Dev", "Designer"],
    color: "from-nexa-blue to-nexa-accent"
  },
  {
    id: "2",
    name: "EcoTrack",
    tag: "Sustainability",
    status: "Full Team",
    members: [
      { name: "Jordan Lee", role: "Fullstack", img: "https://api.dicebear.com/7.x/notionists/svg?backgroundColor=b6e3f4&seed=jordan" },
      { name: "Mia Wong", role: "Data Science", img: "https://api.dicebear.com/7.x/notionists/svg?backgroundColor=b6e3f4&seed=mia" },
      { name: "David Smith", role: "Product", img: "https://api.dicebear.com/7.x/notionists/svg?backgroundColor=b6e3f4&seed=david" },
      { name: "Emma Davis", role: "Designer", img: "https://api.dicebear.com/7.x/notionists/svg?backgroundColor=b6e3f4&seed=emma" }
    ],
    missingRoles: [],
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: "3",
    name: "Nexus VR Studio",
    tag: "Gaming/AR",
    status: "Looking for 1",
    members: [
      { name: "Liam Johnson", role: "Unity Dev", img: "https://api.dicebear.com/7.x/notionists/svg?backgroundColor=b6e3f4&seed=liam" },
      { name: "Noah Garcia", role: "3D Artist", img: "https://api.dicebear.com/7.x/notionists/svg?backgroundColor=b6e3f4&seed=noah" }
    ],
    missingRoles: ["Sound Designer"],
    color: "from-nexa-accent to-nexa-orange"
  }
];

export default function TeamsPage() {
  const [teams, setTeams] = useState(MOCK_TEAMS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTeam = (newTeam: any) => {
    setTeams([newTeam, ...teams]);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <TextEffect text="Teams & Groups" className="text-3xl font-bold text-white" />
          <BlurFade delay={0.2}>
            <p className="text-nexa-lavender mt-2">Manage your active projects and discover forming teams.</p>
          </BlurFade>
        </div>
        <BlurFade delay={0.4}>
          <Button onClick={() => setIsModalOpen(true)} className="nexa-grad-bg text-white rounded-xl shadow-lg shadow-nexa-accent/20 border-0 h-10 px-5">
            + Create Team
          </Button>
        </BlurFade>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, idx) => (
          <BlurFade key={team.id} delay={0.1 * idx}>
            <Tilt rotationFactor={10} className="h-full">
            <div className="bg-nexa-card-dark h-full border border-white/5 rounded-[32px] overflow-hidden shadow-xl shadow-black/50 group hover:border-nexa-blue/30 transition-colors">
              <div className={`h-2 w-full bg-gradient-to-r ${team.color}`} />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="bg-white/5 border-white/10 text-nexa-lavender">
                    {team.tag}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={team.missingRoles.length === 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-nexa-orange/10 text-nexa-orange border-nexa-orange/20"}
                  >
                    {team.status}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">{team.name}</h3>

                <div className="mb-6">
                  <div className="text-xs text-nexa-lavender-3 uppercase tracking-wider font-semibold mb-3">
                    Team Members ({team.members.length})
                  </div>
                  <div className="flex -space-x-3 overflow-hidden">
                    {team.members.map((member, i) => (
                      <Avatar key={i} className="inline-block border-2 border-nexa-card-dark w-10 h-10">
                        <AvatarImage src={member.img} />
                        <AvatarFallback className="bg-nexa-blue text-white">{member.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {team.missingRoles.length > 0 && (
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-dashed border-white/20 bg-white/5 text-white/50 text-xs font-medium relative z-10">
                        +{team.missingRoles.length}
                      </div>
                    )}
                  </div>
                </div>

                {team.missingRoles.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs text-nexa-lavender-3 uppercase tracking-wider font-semibold mb-2">
                      Missing Roles
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {team.missingRoles.map((role, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-nexa-accent/10 text-nexa-accent border border-nexa-accent/20">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-white/5 flex gap-3">
                  <Button className="flex-1 bg-white/5 hover:bg-white/10 text-white border-0 rounded-xl">
                    View Details
                  </Button>
                  <Button size="icon" className="bg-white/5 hover:bg-white/10 text-white border-0 rounded-xl shrink-0">
                    <MessageSquare size={18} />
                  </Button>
                </div>
              </div>
            </div>
            </Tilt>
          </BlurFade>
        ))}
      </div>
      <CreateTeamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateTeam} />
    </div>
  );
}
