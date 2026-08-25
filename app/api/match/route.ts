import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { postId, viewerUserId } = await req.json();

    // Fetch post and viewer profile from Firestore
    const [postSnap, userSnap] = await Promise.all([
      getDoc(doc(db, "posts", postId)),
      getDoc(doc(db, "users", viewerUserId)),
    ]);

    if (!postSnap.exists() || !userSnap.exists()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const post = postSnap.data();
    const user = userSnap.data();

    const viewerSkills = user.skills?.join(", ") || "No skills listed";
    const rolesNeeded = post.rolesNeeded?.join(", ") || "";
    const skillsNeeded = post.skillsNeeded?.join(", ") || "";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a team formation AI. Analyze how well this person fits a project.

Person's skills: ${viewerSkills}
Person's experience level: ${user.experience || "intermediate"}
Person's availability: ${user.availability || "unknown"}

Project title: ${post.title}
Roles needed: ${rolesNeeded}
Skills needed: ${skillsNeeded}

Return a JSON object with exactly two fields:
- "score": a number 0-100 representing fit percentage
- "reason": a single sentence (max 15 words) explaining the match

Return ONLY valid JSON, no markdown.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // Parse JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    const data = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      score: Math.min(100, Math.max(0, Math.round(data.score))),
      reason: data.reason || "",
    });
  } catch (error) {
    console.error("Match API error:", error);
    return NextResponse.json({ score: 0, reason: "" }, { status: 500 });
  }
}
