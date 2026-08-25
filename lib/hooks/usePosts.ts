"use client";

import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Post {
  id: string;
  authorId: string;
  authorName?: string;
  authorPhoto?: string;
  title: string;
  description: string;
  rolesNeeded: string[];
  skillsNeeded: string[];
  status: "open" | "filled";
  interested: string[];
  createdAt: Date | number;
}

import { MOCK_POSTS } from "@/lib/mockData";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate() || new Date(),
      })) as Post[];
      
      // Inject mock data if empty for demo purposes
      if (data.length === 0) {
        setPosts(MOCK_POSTS as Post[]);
      } else {
        setPosts(data);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const createPost = async (post: Omit<Post, "id" | "createdAt" | "interested" | "status">) => {
    await addDoc(collection(db, "posts"), {
      ...post,
      status: "open",
      interested: [],
      createdAt: serverTimestamp(),
    });
  };

  return { posts, loading, createPost };
}
