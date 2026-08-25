"use client";

import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { Tilt } from "@/components/motion-primitives/tilt";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, MapPin, Users, ExternalLink, Timer } from "lucide-react";

const MOCK_EVENTS = [
  {
    id: "e1",
    title: "Global AI Hackathon 2026",
    date: "Oct 15 - Oct 17, 2026",
    deadline: "Registration closes in 5 days",
    location: "Hybrid (San Francisco + Online)",
    type: "AI & ML",
    tags: ["Generative AI", "24hr", "Beginner Friendly"],
    color: "from-nexa-blue to-nexa-accent",
    prize: "$50k"
  },
  {
    id: "e2",
    title: "Web3 Builders Weekend",
    date: "Nov 2 - Nov 4, 2026",
    deadline: "Registration closes in 18 days",
    location: "Online Only",
    type: "Blockchain",
    tags: ["DeFi", "Solidity", "48hr"],
    color: "from-nexa-accent to-nexa-orange",
    prize: "$25k"
  },
  {
    id: "e3",
    title: "Climate Tech Jam",
    date: "Nov 20 - Nov 21, 2026",
    deadline: "Registration open",
    location: "In-person (London, UK)",
    type: "Sustainability",
    tags: ["Hardware", "Data Science", "Impact"],
    color: "from-emerald-400 to-teal-500",
    prize: "$10k"
  }
];

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <TextEffect text="Upcoming Hackathons" className="text-3xl font-bold text-white mb-2" />
          <BlurFade delay={0.2}>
            <p className="text-nexa-lavender">Find your next competition and assemble the perfect team.</p>
          </BlurFade>
        </div>
        <BlurFade delay={0.3}>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl h-10">
              Filter by Tag
            </Button>
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl h-10">
              Online Only
            </Button>
          </div>
        </BlurFade>
      </div>

      <div className="space-y-6">
        {MOCK_EVENTS.map((event, idx) => (
          <BlurFade key={event.id} delay={0.1 * idx}>
            <Tilt rotationFactor={6}>
            <div className="bg-nexa-card-dark border border-white/5 rounded-[32px] p-1 shadow-lg shadow-black/50 group overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${event.color} opacity-10 rounded-full blur-[80px] -z-10 translate-x-1/3 -translate-y-1/3 group-hover:opacity-20 transition-opacity`} />
              
              <div className="p-7 md:p-8 flex flex-col md:flex-row gap-8">
                {/* Left side: Date & Main Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`bg-gradient-to-r ${event.color} text-white border-0`}>
                      {event.type}
                    </Badge>
                    <span className="text-nexa-orange flex items-center gap-1.5 text-xs font-semibold bg-nexa-orange/10 px-3 py-1 rounded-full border border-nexa-orange/20">
                      <Timer size={14} /> {event.deadline}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:nexa-grad-text transition-all w-fit">{event.title}</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-nexa-lavender text-sm">
                      <Calendar size={16} className="text-nexa-blue" /> {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-nexa-lavender text-sm">
                      <MapPin size={16} className="text-nexa-accent" /> {event.location}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="border-white/10 text-nexa-lavender-3 bg-white/5 rounded-lg">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex flex-col justify-center items-start md:items-end gap-3 md:w-64 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                  <div className="text-left md:text-right w-full mb-2">
                    <div className="text-xs text-nexa-lavender-3 uppercase font-semibold mb-1">Prize Pool</div>
                    <div className="text-2xl font-bold text-white">{event.prize}</div>
                  </div>
                  
                  <Link href={`/discover?event=${event.id}`} className="block w-full mb-3"><Button className="w-full nexa-grad-bg text-white shadow-lg shadow-nexa-accent/20 border-0 rounded-xl h-11"><Users size={18} className="mr-2" />Find a Team</Button></Link>
                  <Button variant="outline" className="w-full bg-transparent border-white/10 text-nexa-lavender hover:bg-white/5 hover:text-white rounded-xl h-11">
                    <ExternalLink size={18} className="mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </div>
            </Tilt>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
