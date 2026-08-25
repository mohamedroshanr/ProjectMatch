import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export interface RoleSlot {
  role: string;
  skills: string[];
  matches: Array<{
    uid: string;
    name: string;
    photoURL: string;
    matchScore: number;
    matchReason: string;
  }>;
}

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Step 1: Extract roles from description
    const extractPrompt = `Analyze this project description and extract the team roles needed.

Project: "${description}"

Return a JSON array of role objects. Each object has:
- "role": role title (e.g., "Frontend Developer", "ML Engineer", "UI/UX Designer", "Backend Developer", "Data Engineer", "Product Manager", "DevOps Engineer", "Domain Expert")
- "skills": array of 2-4 specific skills needed for this role

Return ONLY valid JSON array, no markdown. Maximum 5 roles.`;

    const extractResult = await model.generateContent(extractPrompt);
    const extractText = extractResult.response.text().trim();
    const jsonMatch = extractText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("No JSON array found");
    const roles: Array<{ role: string; skills: string[] }> = JSON.parse(jsonMatch[0]);

    // Step 2: Fetch all users from Firestore
    const usersSnap = await getDocs(collection(db, "users"));
    const users = usersSnap.docs.map((d) => ({ uid: d.id, ...d.data() })) as Array<{
      uid: string;
      displayName: string;
      photoURL: string;
      skills: string[];
      experience: string;
    }>;

    // Step 3: Score users per role using Gemini
    const roleSlots: RoleSlot[] = await Promise.all(
      roles.map(async (roleObj) => {
        const userScores = await Promise.all(
          users.slice(0, 20).map(async (u) => {
            const scorePrompt = `Score how well this person fits the role of "${roleObj.role}" for a project needing skills: ${roleObj.skills.join(", ")}.

Person's skills: ${(u.skills || []).join(", ") || "none"}
Experience: ${u.experience || "intermediate"}

Return JSON: {"score": <0-100>, "reason": "<max 12 words>"}
Return ONLY JSON.`;
            try {
              const res = await model.generateContent(scorePrompt);
              const text = res.response.text().trim();
              const m = text.match(/\{[\s\S]*\}/);
              if (!m) return null;
              const parsed = JSON.parse(m[0]);
              return {
                uid: u.uid,
                name: u.displayName || "Unknown",
                photoURL: u.photoURL || "",
                matchScore: Math.min(100, Math.max(0, Math.round(parsed.score || 0))),
                matchReason: parsed.reason || "",
              };
            } catch {
              return null;
            }
          })
        );

        const sorted = userScores
          .filter(Boolean)
          .sort((a, b) => (b?.matchScore ?? 0) - (a?.matchScore ?? 0))
          .slice(0, 3) as RoleSlot["matches"];

        return { role: roleObj.role, skills: roleObj.skills, matches: sorted };
      })
    );

    return NextResponse.json({ roles: roleSlots });
  } catch (error) {
    console.error("Gap API error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
