import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'r') as f:
    content = f.read()

new_repo_ui = """                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-nexa-blue font-medium text-sm">ProjectMatch</span>
                      <span className="text-xs text-nexa-lavender-3">TypeScript</span>
                    </div>
                    <p className="text-xs text-nexa-lavender">AI-Powered Team Formation Platform for Hackathons & Startups.</p>
                  </div>
"""

content = content.replace(
    '<div className="space-y-3">',
    '<div className="space-y-3">\n' + new_repo_ui
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'w') as f:
    f.write(content)
