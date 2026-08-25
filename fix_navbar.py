import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Replace the duplicated line
content = content.replace(
    '<Link href={`/profile/${user.uid}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">\n/${user.uid}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">',
    '<Link href={`/profile/${user.uid}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">'
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'w') as f:
    f.write(content)
