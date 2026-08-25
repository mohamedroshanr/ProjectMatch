"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  college: string;
  degree: string;
  year: number;
  bio: string;
  skills: string[];
  interests: string[];
  availability: string;
  experience: string;
  githubUsername: string;
  following: string[];
}

export function useProfile(uid: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) { setLoading(false); return; }
    const ref = doc(db, "users", uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setProfile({ uid: snap.id, ...snap.data() } as UserProfile);
      }
      setLoading(false);
    });
    return unsub;
  }, [uid]);

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!uid) return;
    await updateDoc(doc(db, "users", uid), data);
  };

  return { profile, loading, updateProfile };
}
