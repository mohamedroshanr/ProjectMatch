import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/ai-matcher/page.tsx', 'r') as f:
    content = f.read()

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

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/ai-matcher/page.tsx', 'w') as f:
    f.write(content)
