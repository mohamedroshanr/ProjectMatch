"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Users, Rocket, Zap, Shield, Globe } from "lucide-react";
import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { Tilt } from "@/components/motion-primitives/tilt";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Logo } from "@/components/Logo";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Transparent Header */}
      <header className="absolute top-0 w-full z-50 px-6 py-6 flex justify-between items-center">
        <Logo />
        <Link href="/login">
          <Button className="nexa-grad-bg text-white rounded-xl px-6 border-0 shadow-lg shadow-nexa-accent/20">
            Sign In
          </Button>
        </Link>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <BlurFade delay={0.1} yOffset={20}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-nexa-blue/10 border border-nexa-blue/20 text-nexa-blue text-sm font-medium mb-8">
                <span className="flex h-2 w-2 rounded-full bg-nexa-accent animate-pulse" />
                The New Standard for Hackathons
              </div>
            </BlurFade>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Build your <span className="nexa-grad-text">dream team</span><br/> without the friction.
            </h1>
            
            <BlurFade delay={0.3}>
              <p className="text-lg md:text-xl text-nexa-lavender mb-10 max-w-2xl mx-auto leading-relaxed">
                ProjectMatch uses AI to analyze your skills, find your gaps, and connect you with the perfect teammates for your next big idea.
              </p>
            </BlurFade>
            
            <BlurFade delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/login">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button className="nexa-grad-bg text-white rounded-xl h-14 px-8 text-lg border-0 shadow-2xl shadow-nexa-accent/20 w-full sm:w-auto gap-2">
                    Start Building <ArrowRight size={20} />
                  </Button>
                  </motion.div>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" className="rounded-xl h-14 px-8 text-lg border-white/10 text-white hover:bg-white/5 w-full sm:w-auto bg-black/20 backdrop-blur-md">
                    Learn More
                  </Button>
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 px-6 bg-black/40 backdrop-blur-xl border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <TextEffect text="How It Works" className="text-3xl md:text-4xl font-bold text-white mb-4 justify-center" />
              <p className="text-nexa-lavender">From an idea to a deployed project in 3 simple steps.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-nexa-blue/0 via-nexa-accent/20 to-nexa-orange/0 -translate-y-1/2 -z-10" />

              {[
                { icon: Lightbulb, title: "1. Pitch Your Idea", desc: "Share your vision and the skills you already bring to the table.", color: "text-nexa-blue", bg: "bg-nexa-blue/10 border-nexa-blue/20" },
                { icon: Zap, title: "2. AI Skill Match", desc: "Our AI identifies the gaps in your team and matches you with missing talent.", color: "text-nexa-accent", bg: "bg-nexa-accent/10 border-nexa-accent/20" },
                { icon: Rocket, title: "3. Build & Ship", desc: "Collaborate in your new team and crush the next hackathon.", color: "text-nexa-orange", bg: "bg-nexa-orange/10 border-nexa-orange/20" }
              ].map((step, i) => (
                <BlurFade key={i} delay={0.2 * i} className="h-full">
                  <Tilt rotationFactor={15} className="h-full">
                  <div className="bg-nexa-card-dark h-full border border-white/5 p-8 rounded-[32px] text-center shadow-xl shadow-black/50 h-full relative z-10">
                    <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 border ${step.bg}`}>
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-nexa-lavender-3 leading-relaxed">{step.desc}</p>
                  </div>
                  </Tilt>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* About Us / Vision Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <BlurFade delay={0.2}>
              <div className="w-20 h-20 mx-auto rounded-full nexa-grad-bg p-[1px] mb-8 shadow-2xl shadow-nexa-accent/20">
                <div className="w-full h-full bg-nexa-card-dark rounded-full flex items-center justify-center">
                  <Globe className="w-10 h-10 text-nexa-accent" />
                </div>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Built for the Builders</h2>
              <p className="text-lg text-nexa-lavender leading-relaxed mb-10">
                ProjectMatch was created because finding the right co-founders, hackathon teammates, and research partners is fundamentally broken. 
                We believe that by intelligently mapping skills, availability, and interests, we can accelerate the pace of innovation worldwide.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                {[
                  { val: "500+", label: "Active Builders" },
                  { val: "120+", label: "Projects Shipped" },
                  { val: "15", label: "Hackathons" },
                  { val: "24/7", label: "AI Matching" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold nexa-grad-text mb-1">{stat.val}</div>
                    <div className="text-xs text-nexa-lavender-3 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-10 text-center bg-black/60 backdrop-blur-md">
        <p className="text-nexa-lavender-3 text-sm">
          &copy; {new Date().getFullYear()} ProjectMatch. Designed with Nexacore.
        </p>
      </footer>
    </div>
  );
}
