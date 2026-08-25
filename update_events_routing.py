import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/events/page.tsx', 'r') as f:
    content = f.read()

# Add Link import if not present
if 'import Link from "next/link";' not in content:
    content = content.replace('import { Timer } from "lucide-react";', 'import { Timer } from "lucide-react";\nimport Link from "next/link";')

# Replace <Button className="w-full nexa-grad-bg...">...</Button> with <Link href={`/discover?event=${event.id}`}><Button>...</Button></Link>
content = re.sub(
    r'<Button className="w-full nexa-grad-bg text-white shadow-lg shadow-nexa-accent/20 border-0 rounded-xl h-11">\s*<Users size=\{18\} className="mr-2" \/>\s*Find a Team\s*</Button>',
    r'<Link href={`/discover?event=${event.id}`} className="block w-full mb-3"><Button className="w-full nexa-grad-bg text-white shadow-lg shadow-nexa-accent/20 border-0 rounded-xl h-11"><Users size={18} className="mr-2" />Find a Team</Button></Link>',
    content
)

# Remove the mb-3 from the original Button if it had it, or we just put it on the Link. Note the second button below it doesn't have mt-3, let's just make Link block w-full mb-3.

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/events/page.tsx', 'w') as f:
    f.write(content)
