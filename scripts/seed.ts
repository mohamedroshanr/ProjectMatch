#!/usr/bin/env tsx
/**
 * Seed script — populates Firestore with 6 demo users + 4 demo posts
 * Run: npx tsx scripts/seed.ts
 * 
 * Requires .env.local to be set up with Firebase service account credentials
 */
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount as Parameters<typeof cert>[0]) });
}

const db = getFirestore();

const USERS = [
  {
    id: "demo_aarav",
    displayName: "Aarav Shah",
    email: "aarav@demo.com",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=aarav&backgroundColor=b6e3f4",
    college: "IIT Bombay",
    degree: "B.Tech Computer Science",
    year: 3,
    bio: "Full-stack developer passionate about AI/ML products. Built 3 hackathon-winning projects. Looking to collaborate on impactful ideas.",
    skills: ["React", "TypeScript", "Node.js", "Python", "TensorFlow"],
    interests: ["AI/ML", "FinTech", "EdTech"],
    availability: "weekends",
    experience: "intermediate",
    githubUsername: "aarav-dev",
    following: [],
  },
  {
    id: "demo_priya",
    displayName: "Priya Nair",
    email: "priya@demo.com",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=c0aede",
    college: "NID Ahmedabad",
    degree: "B.Des UX Design",
    year: 4,
    bio: "UI/UX designer who codes. Figma expert, know React basics. Love designing systems that feel intuitive from the first tap.",
    skills: ["Figma", "UI Design", "CSS", "React", "Prototyping", "User Research"],
    interests: ["HealthTech", "Accessibility", "Design Systems"],
    availability: "evenings",
    experience: "expert",
    githubUsername: "priya-design",
    following: [],
  },
  {
    id: "demo_rahul",
    displayName: "Rahul Verma",
    email: "rahul@demo.com",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul&backgroundColor=ffd5dc",
    college: "IISc Bangalore",
    degree: "M.Tech Data Science",
    year: 2,
    bio: "ML engineer specializing in NLP and recommendation systems. Published researcher. Looking for engineering co-collaborators.",
    skills: ["Python", "PyTorch", "NLP", "HuggingFace", "Scikit-learn", "Data Science"],
    interests: ["NLP", "Healthcare AI", "Research"],
    availability: "weekends",
    experience: "expert",
    githubUsername: "rahul-ml",
    following: [],
  },
  {
    id: "demo_sneha",
    displayName: "Sneha Patel",
    email: "sneha@demo.com",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha&backgroundColor=d1f4e0",
    college: "BITS Pilani",
    degree: "B.E. Computer Science",
    year: 2,
    bio: "Backend engineer obsessed with distributed systems. AWS certified. Love building things that scale.",
    skills: ["Go", "Kubernetes", "AWS", "PostgreSQL", "Redis", "Docker"],
    interests: ["DevOps", "Cloud", "Systems"],
    availability: "full-time",
    experience: "intermediate",
    githubUsername: "sneha-backend",
    following: [],
  },
  {
    id: "demo_karan",
    displayName: "Karan Mehta",
    email: "karan@demo.com",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=karan&backgroundColor=fde68a",
    college: "SRCC Delhi",
    degree: "B.Com Economics",
    year: 3,
    bio: "Product & business guy. Domain expert in FinTech and EdTech. Looking for technical co-founders for a B2B SaaS idea.",
    skills: ["Product Management", "Market Research", "Excel", "Notion", "Pitch Decks"],
    interests: ["FinTech", "B2B SaaS", "EdTech"],
    availability: "part-time",
    experience: "intermediate",
    githubUsername: "",
    following: [],
  },
  {
    id: "demo_zara",
    displayName: "Zara Khan",
    email: "zara@demo.com",
    photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=zara&backgroundColor=fecaca",
    college: "NIT Trichy",
    degree: "B.Tech Electronics",
    year: 4,
    bio: "Flutter developer + IoT enthusiast. Built 2 published apps on Play Store. Interested in hardware-software projects.",
    skills: ["Flutter", "Dart", "Firebase", "IoT", "Arduino", "Mobile Development"],
    interests: ["Mobile", "IoT", "Smart Cities"],
    availability: "weekends",
    experience: "intermediate",
    githubUsername: "zara-flutter",
    following: [],
  },
];

const POSTS = [
  {
    id: "demo_post_1",
    authorId: "demo_aarav",
    authorName: "Aarav Shah",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=aarav&backgroundColor=b6e3f4",
    title: "AI-powered study planner for college students",
    description: "Building a personalized study planner that uses AI to create adaptive study schedules based on syllabus, deadlines, and learning pace. Currently have the ML model ready, need frontend and design help.",
    rolesNeeded: ["Frontend Developer", "UI/UX Designer"],
    skillsNeeded: ["React", "Figma", "Tailwind CSS"],
    status: "open",
    interested: [],
  },
  {
    id: "demo_post_2",
    authorId: "demo_rahul",
    authorName: "Rahul Verma",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul&backgroundColor=ffd5dc",
    title: "Real-time misinformation detection API",
    description: "Research project to build a free public API that detects misinformation in news articles using transformer models. Looking for a backend engineer to wrap the model and a frontend dev to build the demo dashboard.",
    rolesNeeded: ["Backend Developer", "Frontend Developer"],
    skillsNeeded: ["Node.js", "REST API", "React", "FastAPI"],
    status: "open",
    interested: [],
  },
  {
    id: "demo_post_3",
    authorId: "demo_karan",
    authorName: "Karan Mehta",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=karan&backgroundColor=fde68a",
    title: "FinTech micro-lending platform for college students",
    description: "Validated idea with 200+ student surveys. Need a technical co-founder to build the MVP. The platform handles peer-to-peer lending with smart UPI integration. Full equity split discussion open.",
    rolesNeeded: ["Backend Developer", "Frontend Developer", "ML Engineer"],
    skillsNeeded: ["React", "Node.js", "UPI API", "Python"],
    status: "open",
    interested: [],
  },
  {
    id: "demo_post_4",
    authorId: "demo_sneha",
    authorName: "Sneha Patel",
    authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha&backgroundColor=d1f4e0",
    title: "Open-source DevOps dashboard for small teams",
    description: "Building a lightweight alternative to DataDog for indie developers and small teams. Self-hosted, no per-seat pricing. Need an ML person for anomaly detection and a designer for the monitoring UI.",
    rolesNeeded: ["ML Engineer", "UI/UX Designer"],
    skillsNeeded: ["PyTorch", "Time Series", "Figma", "Grafana"],
    status: "open",
    interested: [],
  },
];

async function seed() {
  console.log("🌱 Seeding ProjectMatch demo data...\n");

  // Seed users
  for (const user of USERS) {
    const { id, ...data } = user;
    await db.collection("users").doc(id).set({
      ...data,
      createdAt: Timestamp.now(),
    });
    console.log(`✓ User: ${data.displayName}`);
  }

  // Seed posts
  for (const post of POSTS) {
    const { id, ...data } = post;
    await db.collection("posts").doc(id).set({
      ...data,
      createdAt: Timestamp.now(),
    });
    console.log(`✓ Post: ${data.title.slice(0, 50)}...`);
  }

  console.log("\n✅ Seeding complete! 6 users + 4 posts created.");
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
