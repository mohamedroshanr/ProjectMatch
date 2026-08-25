import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'r') as f:
    content = f.read()

# Add MOCK_USERS import
if 'import { MOCK_USERS }' not in content:
    content = content.replace('import { BlurFade } from "@/components/motion-primitives/blur-fade";', 'import { BlurFade } from "@/components/motion-primitives/blur-fade";\nimport { MOCK_USERS } from "@/lib/mockData";')

# Expand PRESET_SKILLS
expanded_skills = """const PRESET_SKILLS = [
  // Hardware & Edge
  "Embedded Systems", "C", "C++", "Python", "Edge AI", "PCB Design", "AutoCAD", "ROS", "Arduino", "Raspberry Pi", "VHDL", "Verilog", "IoT", "Microcontrollers",
  // Software & Web
  "React", "Node.js", "TypeScript", "Tailwind CSS", "Next.js", "GraphQL", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS",
  // AI & Data
  "PyTorch", "TensorFlow", "Computer Vision", "OpenCV", "NLP", "Pandas", "Scikit-Learn",
  // Web3 & Design
  "Solidity", "Smart Contracts", "Web3.js", "Figma", "UI/UX", "User Research"
];"""
content = re.sub(r'const PRESET_SKILLS = \[\s*"Embedded Systems"[^\]]*\];', expanded_skills, content)

# Get user from MOCK_USERS
user_lookup = """  const { id } = use(params);
  const mockUser = MOCK_USERS.find(u => u.id === id);
  const displayName = mockUser ? mockUser.name : "User";
  const displayHandle = "@" + displayName.toLowerCase().replace(/\\s+/g, '_');
  const displayAvatar = mockUser ? mockUser.avatar : `https://api.dicebear.com/7.x/notionists/svg?seed=${id}&backgroundColor=b6e3f4`;
"""
content = content.replace('  const { id } = use(params);', user_lookup)

# Replace @{id}_builder with actual handle and avatar
content = content.replace('@{id}_builder', '{displayHandle}')
content = re.sub(r'<AvatarImage src=\{`https:\/\/api\.dicebear\.com\/7\.x\/notionists\/svg\?seed=\$\{id\}&backgroundColor=b6e3f4`\} \/>', '<AvatarImage src={displayAvatar} />', content)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'w') as f:
    f.write(content)
