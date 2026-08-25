"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { ref, push, set } from "firebase/database";
import { db, rtdb } from "@/lib/firebase";
import { Post } from "@/lib/hooks/usePosts";
import { UserProfile } from "@/lib/hooks/useProfile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tilt } from "@/components/motion-primitives/tilt";
import { MOCK_USERS } from "@/lib/mockData";
import { Sparkles, Clock, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface MatchScore {
  score: number;
  reason: string;
}

interface PostCardProps {
  post: Post;
  currentUser: UserProfile | null;
}

export default function PostCard({ post, currentUser }: PostCardProps) {
  const [authorData, setAuthorData] = useState<Partial<UserProfile> | null>(null);
  const [match, setMatch] = useState<MatchScore | null>(null);
  const [matchLoading, setMatchLoading] = useState(false);
  const [interested, setInterested] = useState(false);
  const [interestLoading, setInterestLoading] = useState(false);

  useEffect(() => {
    // Fetch author details
    getDoc(doc(db, "users", post.authorId)).then((snap) => {
      if (snap.exists()) {
        setAuthorData(snap.data() as UserProfile);
      } else {
        // Fallback for mock posts
        const mockUser = MOCK_USERS.find(u => u.id === post.authorId);
        if (mockUser) {
          setAuthorData({
            displayName: mockUser.name,
            college: mockUser.role,
            photoURL: mockUser.avatar,
          });
        }
      }
    });
    // Check if already interested
    if (currentUser) {
      setInterested(post.interested?.includes(currentUser.uid) ?? false);
    }
  }, [post, currentUser]);

  useEffect(() => {
    // Fetch AI match score
    if (!currentUser?.uid) return;
    setMatchLoading(true);
    fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: post.id, viewerUserId: currentUser.uid }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.score !== undefined) setMatch(data);
      })
      .finally(() => setMatchLoading(false));
  }, [post.id, currentUser?.uid]);

  const handleInterest = async () => {
    if (!currentUser || interested) return;
    setInterestLoading(true);
    try {
      // Mark interest on post
      await updateDoc(doc(db, "posts", post.id), {
        interested: arrayUnion(currentUser.uid),
      });
      // Create message thread in Firestore
      const threadId = `${post.id}_${currentUser.uid}`;
      await set(ref(rtdb, `chats/${threadId}/meta`), {
        postId: post.id,
        postTitle: post.title,
        participants: [post.authorId, currentUser.uid],
        createdAt: Date.now(),
      });
      // Send initial message
      await push(ref(rtdb, `chats/${threadId}/messages`), {
        senderId: currentUser.uid,
        text: `Hi! I'm interested in your project "${post.title}". I have skills in ${currentUser.skills?.slice(0, 3).join(", ")}.`,
        timestamp: Date.now(),
      });
      setInterested(true);
    } finally {
      setInterestLoading(false);
    }
  };

  const scoreColor =
    !match ? "text-nexa-lavender-3"
    : match.score >= 80 ? "text-nexa-accent"
    : match.score >= 60 ? "text-nexa-blue"
    : match.score >= 40 ? "text-nexa-orange"
    : "text-red-400";

  return (
    <Tilt rotationFactor={8} className="h-full"><div className="group bg-nexa-card-dark hover:bg-black/40 border border-white/5 hover:border-nexa-blue/30 rounded-[24px] p-6 transition-all duration-300 shadow-lg shadow-nexa-blue/5">
      {/* Author row */}
      <div className="flex items-center justify-between mb-4">
        <Link href={`/profile/${post.authorId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Avatar className="w-10 h-10 border border-white/10">
            <AvatarImage src={authorData?.photoURL} />
            <AvatarFallback className="bg-nexa-blue/20 text-nexa-blue text-sm">
              {authorData?.displayName?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-white leading-tight">{authorData?.displayName || "Loading..."}</p>
            <p className="text-xs text-nexa-lavender-3">{authorData?.college || ""}</p>
          </div>
        </Link>

        {/* AI Match Badge */}
        <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-full px-3 py-1.5">
          <Sparkles size={12} className={matchLoading ? "text-white/20 animate-pulse" : "text-nexa-accent"} />
          {matchLoading ? (
            <span className="text-xs text-nexa-lavender-3">Analyzing...</span>
          ) : match ? (
            <span className={`text-xs font-semibold ${scoreColor}`}>{match.score}% match</span>
          ) : (
            <span className="text-xs text-nexa-lavender-3">–</span>
          )}
        </div>
      </div>

      {/* Post content */}
      <h3 className="font-semibold text-lg text-white mb-2 leading-snug">{post.title}</h3>
      <p className="text-sm text-nexa-lavender line-clamp-2 mb-4 leading-relaxed">{post.description}</p>

      {/* AI match reason tooltip */}
      {match?.reason && (
        <div className="bg-nexa-accent/10 border border-nexa-accent/20 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs text-nexa-lavender-2 flex items-start gap-2 leading-relaxed">
            <Sparkles size={12} className="mt-0.5 flex-shrink-0 text-nexa-accent" />
            {match.reason}
          </p>
        </div>
      )}

      {/* Roles needed */}
      <div className="flex flex-wrap gap-2 mb-5">
        {post.rolesNeeded?.map((role) => (
          <Badge key={role} variant="outline" className="border-nexa-blue/30 text-nexa-blue text-xs bg-nexa-blue/10 rounded-lg px-2.5 py-0.5">
            {role}
          </Badge>
        ))}
        {post.skillsNeeded?.map((skill) => (
          <Badge key={skill} variant="outline" className="border-white/10 text-nexa-lavender text-xs bg-white/5 rounded-lg px-2.5 py-0.5">
            {skill}
          </Badge>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-nexa-lavender-3">
          <Clock size={12} />
          {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          {post.interested?.length > 0 && (
            <span className="ml-2">· {post.interested.length} interested</span>
          )}
        </div>

        <Button
          onClick={handleInterest}
          disabled={interestLoading || interested || !currentUser}
          size="sm"
          className={
            interested
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-default rounded-xl h-9"
              : "nexa-grad-bg hover:opacity-90 text-white gap-1 rounded-xl h-9 px-4 border-0 shadow-md shadow-nexa-accent/20"
          }
        >
          {interestLoading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : interested ? (
            "✓ Interested"
          ) : (
            <>I&apos;m Interested <ChevronRight size={14} /></>
          )}
        </Button>
      </div>
    </div>
    </Tilt>
  );
}
