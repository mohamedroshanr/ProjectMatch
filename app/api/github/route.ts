import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  try {
    // Fetch repos from GitHub public API (no auth needed for public)
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=30&sort=updated`,
      { headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "ProjectMatch/1.0" } }
    );

    if (!reposRes.ok) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const repos = await reposRes.json();

    // Aggregate language bytes across all repos
    const langCounts: Record<string, number> = {};
    await Promise.all(
      repos.slice(0, 10).map(async (repo: { full_name: string; language: string | null }) => {
        try {
          const langRes = await fetch(
            `https://api.github.com/repos/${repo.full_name}/languages`,
            { headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "ProjectMatch/1.0" } }
          );
          if (langRes.ok) {
            const langs = await langRes.json();
            Object.entries(langs).forEach(([lang, bytes]) => {
              langCounts[lang] = (langCounts[lang] || 0) + (bytes as number);
            });
          }
        } catch {
          // Skip failed repo
        }
      })
    );

    // Sort by byte count, map languages to skills, take top 8
    const LANG_TO_SKILL: Record<string, string> = {
      TypeScript: "TypeScript",
      JavaScript: "JavaScript",
      Python: "Python",
      "Jupyter Notebook": "Data Science",
      Dart: "Flutter",
      Swift: "iOS Development",
      Kotlin: "Android",
      Rust: "Rust",
      Go: "Go",
      Java: "Java",
      "C++": "C++",
      C: "C",
      CSS: "CSS",
      HTML: "HTML",
      SCSS: "SCSS",
      Ruby: "Ruby",
      "C#": "C#",
      Shell: "Shell Scripting",
    };

    const skills = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([lang]) => LANG_TO_SKILL[lang] || lang)
      .filter(Boolean);

    return NextResponse.json({ skills, repoCount: repos.length });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
