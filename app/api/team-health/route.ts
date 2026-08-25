import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { memberSkills, projectDescription } = await req.json();
    // memberSkills: string[][] (each member's skill array)
    // projectDescription: string

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const allSkills = (memberSkills as string[][]).flat().join(", ");

    const prompt = `Analyze a project team's skill coverage.

Team combined skills: ${allSkills}
Project description: "${projectDescription}"

Return a JSON object with a "radar" field containing skill coverage scores (0-100) for these exact categories:
Frontend, Backend, ML/AI, Design, DevOps, Mobile, Data

Return ONLY valid JSON like: {"radar": {"Frontend": 80, "Backend": 60, "ML/AI": 40, "Design": 20, "DevOps": 50, "Mobile": 30, "Data": 70}}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON");
    const data = JSON.parse(jsonMatch[0]);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
