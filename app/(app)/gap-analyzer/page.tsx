"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useProfile } from "@/lib/hooks/useProfile";
import { usePosts } from "@/lib/hooks/usePosts";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { BlurFade } from "@/components/motion-primitives/blur-fade";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Search, ArrowRight, Zap, Target } from "lucide-react";

export default function GapAnalyzerPage() {
  const { user } = useAuth();
  const { profile } = useProfile(user?.uid ?? null);
  const { posts } = usePosts();
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      // Very basic analysis logic for demo purposes
      const userSkills = profile?.skills || [];
      const marketDemand: Record<string, number> = {};
      
      posts.forEach(post => {
        post.skillsNeeded.forEach(skill => {
          marketDemand[skill] = (marketDemand[skill] || 0) + 1;
        });
      });

      const missing = Object.entries(marketDemand)
        .filter(([skill]) => !userSkills.includes(skill))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      setResults({
        score: Math.floor(Math.random() * 30) + 60, // 60-90 score
        recommendations: missing.map(m => m[0]),
      });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-nexa-blue/10 flex items-center justify-center mx-auto mb-6 border border-nexa-blue/20 shadow-lg shadow-nexa-blue/10">
          <BrainCircuit className="text-nexa-blue w-8 h-8" />
        </div>
        <TextEffect text="AI Gap Analyzer" className="text-3xl font-bold justify-center text-white" />
        <BlurFade delay={0.2}>
          <p className="text-nexa-lavender mt-3 max-w-md mx-auto">
            Scan your profile against all active projects to discover which skills you're missing and what you should learn next.
          </p>
        </BlurFade>
      </div>

      {!results ? (
        <BlurFade delay={0.4}>
          <div className="bg-nexa-card-dark border border-white/5 p-8 rounded-[32px] text-center shadow-lg shadow-nexa-blue/5">
            <Search className="w-12 h-12 text-nexa-lavender-3 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Ready to analyze your profile?</h3>
            <p className="text-sm text-nexa-lavender mb-6">
              We'll compare your current {profile?.skills?.length || 0} skills against the requirements of {posts.length} active projects.
            </p>
            <Button 
              onClick={handleAnalyze} 
              disabled={analyzing}
              className="nexa-grad-bg text-white hover:opacity-90 w-full sm:w-auto rounded-xl border-0 shadow-lg shadow-nexa-accent/20 h-11 px-8"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Analyzing market data...
                </>
              ) : (
                <>
                  Run Analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </BlurFade>
      ) : (
        <div className="space-y-6">
          <BlurFade delay={0.1}>
            <div className="bg-nexa-card-dark border border-nexa-accent/20 p-6 rounded-[24px] flex items-center justify-between shadow-lg shadow-nexa-accent/5">
              <div>
                <h3 className="text-lg font-medium text-white">Employability Score</h3>
                <p className="text-sm text-nexa-lavender mt-1">Based on current hackathon demands</p>
              </div>
              <div className="text-4xl font-bold nexa-grad-text">
                {results.score}/100
              </div>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BlurFade delay={0.2}>
              <div className="bg-nexa-card-dark border border-white/5 p-6 rounded-[24px] h-full shadow-lg shadow-nexa-blue/5">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="text-nexa-blue w-5 h-5" />
                  <h3 className="font-medium text-white">Top Skills to Learn</h3>
                </div>
                <ul className="space-y-3">
                  {results.recommendations.length > 0 ? results.recommendations.map((skill: string, i: number) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-sm text-white">{skill}</span>
                      <span className="text-xs px-2.5 py-1 bg-nexa-accent/10 border border-nexa-accent/20 rounded-lg text-nexa-accent">High Demand</span>
                    </li>
                  )) : (
                    <li className="text-sm text-nexa-lavender">You have all the highly requested skills!</li>
                  )}
                </ul>
              </div>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="bg-nexa-card-dark border border-white/5 p-6 rounded-[24px] h-full shadow-lg shadow-nexa-blue/5">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="text-nexa-orange w-5 h-5" />
                  <h3 className="font-medium text-white">AI Recommendation</h3>
                </div>
                <p className="text-sm text-nexa-lavender leading-relaxed">
                  Based on your profile, focusing on <strong className="text-nexa-accent">{results.recommendations[0] || 'your core skills'}</strong> will unlock 3x more project opportunities. Consider building a small weekend project to add it to your portfolio.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-6 border-white/10 hover:bg-white/5 text-white rounded-xl"
                  onClick={() => setResults(null)}
                >
                  Run New Analysis
                </Button>
              </div>
            </BlurFade>
          </div>
        </div>
      )}
    </div>
  );
}
