import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/PostCard.tsx', 'r') as f:
    content = f.read()

# Add import for Tilt
if 'import { Tilt }' not in content:
    content = content.replace('import { Badge } from "@/components/ui/badge";', 'import { Badge } from "@/components/ui/badge";\nimport { Tilt } from "@/components/motion-primitives/tilt";')

# Replace root div of the card return with Tilt
# The return statement is: return ( <div className="group bg-nexa-card-dark hover:bg-black/40 ..."> ... </div> );
content = re.sub(
    r'(return \(\s*)<div className="group bg-nexa-card-dark(.*?)"(.*?)>',
    r'\1<Tilt rotationFactor={8} className="h-full"><div className="group bg-nexa-card-dark\2"\3>',
    content,
    flags=re.DOTALL
)

# Close Tilt tag instead of div
content = re.sub(
    r'</Button>\s*</div>\s*</div>\s*\);\s*\}',
    r'</Button>\n      </div>\n    </div>\n    </Tilt>\n  );\n}',
    content
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/PostCard.tsx', 'w') as f:
    f.write(content)
