"use client";

import { useSearchParams } from "next/navigation";
import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Code, PenTool, Database, MessageSquare, HandHeart, UserPlus } from "lucide-react";
import { Tilt } from "@/components/motion-primitives/tilt";
import { Suspense } from "react";

const HALF_FILLED_TEAMS = [
  {
    id: "1",
    eventId: "e1",
    name: "Project Alpha (AI Trading)",
    tag: "FinTech",
    status: "Looking for 2",
    members: [
      { name: "Alex Chen", role: "ML Engineer", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4" },
      { name: "Sarah Kim", role: "Frontend", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=ffdfbf" }
    ],
    missingRoles: ["Backend Dev", "Designer"],
    color: "from-nexa-blue to-nexa-accent"
  },
  {
    id: "3",
    eventId: "e2",
    name: "Nexus VR Studio",
    tag: "Gaming/AR",
    status: "Looking for 1",
    members: [
      { name: "Liam Johnson", role: "Unity Dev", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Liam&backgroundColor=c0aede" },
      { name: "Noah Garcia", role: "3D Artist", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Noah&backgroundColor=d1d4f9" }
    ],
    missingRoles: ["Sound Designer"],
    color: "from-nexa-accent to-nexa-orange"
  }
];

function DiscoverContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event");

  const filteredTeams = eventId 
    ? HALF_FILLED_TEAMS.filter(t => t.eventId === eventId)
    : HALF_FILLED_TEAMS;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <TextEffect text="Discover Teams" className="text-3xl font-bold text-white" />
          <BlurFade delay={0.2}>
            <p className="text-nexa-lavender mt-2">
              {eventId ? "Teams looking for members for this specific Hackathon." : "Half-filled teams actively recruiting members."}
            </p>
          </BlurFade>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredTeams.map((team, idx) => (
          <BlurFade key={team.id} delay={0.1 * idx}>
            <Tilt rotationFactor={8} className="h-full">
              <div className="bg-nexa-card-dark border border-white/5 rounded-[32px] overflow-hidden shadow-xl shadow-black/50 group hover:border-nexa-blue/30 transition-colors h-full">
                <div className={`h-2 w-full bg-gradient-to-r ${team.color}`} />
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-nexa-lavender">
                      {team.tag}
                    </Badge>
                    <Badge variant="outline" className="bg-nexa-orange/10 text-nexa-orange border-nexa-orange/20">
                      {team.status}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-6">{team.name}</h3>

                  <div className="mb-6">
                    <div className="text-xs text-nexa-lavender-3 uppercase tracking-wider font-semibold mb-3">
                      Current Members ({team.members.length})
                    </div>
                    <div className="flex -space-x-3 overflow-hidden mb-2">
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

                  <div className="pt-4 border-t border-white/5">
                    <Button className="w-full bg-white/5 hover:bg-white/10 text-white border-0 rounded-xl">
                      <HandHeart size={18} className="mr-2 text-nexa-accent" /> Request to Join
                    </Button>
                  </div>
                </div>
              </div>
            </Tilt>
          </BlurFade>
        ))}
        {filteredTeams.length === 0 && (
          <div className="col-span-2 text-center py-20 text-nexa-lavender">
            No half-filled teams found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="text-white p-10 text-center">Loading...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
