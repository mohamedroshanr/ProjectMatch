"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useProfile } from "@/lib/hooks/useProfile";
import { usePosts } from "@/lib/hooks/usePosts";
import PostCard from "@/components/PostCard";
import CreatePostModal from "@/components/CreatePostModal";
import { Button } from "@/components/ui/button";
import { Plus, Layers } from "lucide-react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { BlurFade } from "@/components/motion-primitives/blur-fade";

function SkeletonCard() {
  return (
    <div className="bg-nexa-card-dark border border-white/5 rounded-[24px] p-6 animate-pulse space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/5 rounded-full" />
        <div className="space-y-2">
          <div className="h-3 bg-white/5 rounded w-32" />
          <div className="h-2.5 bg-white/5 rounded w-24" />
        </div>
      </div>
      <div className="h-4 bg-white/5 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-full" />
      <div className="h-3 bg-white/5 rounded w-5/6" />
      <div className="flex gap-2 pt-2">
        <div className="h-7 bg-white/5 rounded-full w-20" />
        <div className="h-7 bg-white/5 rounded-full w-24" />
      </div>
    </div>
  );
}

export default function FeedPage() {
  const { user } = useAuth();
  const { profile } = useProfile(user?.uid ?? null);
  const { posts, loading } = usePosts();
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <TextEffect text="Project Feed" className="text-3xl font-bold tracking-tight text-white" />
          <BlurFade delay={0.3} yOffset={5}>
            <p className="text-nexa-lavender text-sm mt-1">
              Discover projects looking for your skills
            </p>
          </BlurFade>
        </div>
        <BlurFade delay={0.5}>
          <Button
            onClick={() => setShowCreate(true)}
            className="nexa-grad-bg hover:opacity-90 text-white gap-2 rounded-xl shadow-lg shadow-nexa-accent/20 border-0 h-10 px-5"
          >
            <Plus size={18} />
            Post a Project
          </Button>
        </BlurFade>
      </div>

      {/* Feed */}
      {loading ? (
        <div className="space-y-5">
          {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <BlurFade delay={0.1}>
            <div className="w-20 h-20 rounded-3xl bg-nexa-card-dark border border-white/5 flex items-center justify-center mb-6 mx-auto shadow-xl shadow-nexa-blue/5">
              <Layers size={32} className="text-nexa-blue" />
            </div>
            <p className="text-white font-medium text-lg">No projects yet</p>
            <p className="text-nexa-lavender text-sm mt-2 max-w-xs mx-auto">
              Be the first to post a project and find your ideal team.
            </p>
            <Button
              onClick={() => setShowCreate(true)}
              className="mt-8 nexa-grad-bg hover:opacity-90 text-white gap-2 rounded-xl border-0 shadow-lg shadow-nexa-accent/20 h-11 px-6"
            >
              <Plus size={18} />
              Post your project
            </Button>
          </BlurFade>
        </div>
      ) : (
        <div className="space-y-5">
          {posts.map((post, i) => (
            <BlurFade key={post.id} delay={0.1 + i * 0.1}>
              <PostCard post={post} currentUser={profile} />
            </BlurFade>
          ))}
        </div>
      )}

      {showCreate && (
        <CreatePostModal
          onClose={() => setShowCreate(false)}
          currentUser={profile}
        />
      )}
    </div>
  );
}
