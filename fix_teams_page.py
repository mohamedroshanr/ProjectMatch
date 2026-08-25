import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/teams/page.tsx', 'r') as f:
    content = f.read()

# Imports
if 'import { useState } from "react";' not in content:
    content = content.replace('import { Users, Code, PenTool, Database, MessageSquare } from "lucide-react";', 'import { Users, Code, PenTool, Database, MessageSquare } from "lucide-react";\nimport { useState } from "react";\nimport { CreateTeamModal } from "@/components/CreateTeamModal";')

# Component Body
component_start = 'export default function TeamsPage() {'
replacement = """export default function TeamsPage() {
  const [teams, setTeams] = useState(MOCK_TEAMS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTeam = (newTeam: any) => {
    setTeams([newTeam, ...teams]);
  };
"""
content = content.replace(component_start, replacement)

# Button onClick
content = content.replace(
    '<Button className="nexa-grad-bg text-white rounded-xl shadow-lg shadow-nexa-accent/20 border-0 h-10 px-5">',
    '<Button onClick={() => setIsModalOpen(true)} className="nexa-grad-bg text-white rounded-xl shadow-lg shadow-nexa-accent/20 border-0 h-10 px-5">'
)

# Render Modal
content = content.replace(
    'MOCK_TEAMS.map',
    'teams.map'
)
content = content.replace(
    '</BlurFade>\n        </div>\n        <BlurFade delay={0.4}>',
    '</BlurFade>\n        </div>\n        <BlurFade delay={0.4}>'
)

# Append modal before final closing div
content = content.replace(
    '    </div>\n  );\n}',
    '      <CreateTeamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateTeam} />\n    </div>\n  );\n}'
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/teams/page.tsx', 'w') as f:
    f.write(content)
