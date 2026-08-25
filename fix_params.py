import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'r') as f:
    content = f.read()

# Add use import if missing
if 'import { useState, use } from "react";' not in content:
    content = content.replace('import { useState } from "react";', 'import { useState, use } from "react";')

# Replace component signature and add use()
content = re.sub(
    r'export default function ProfilePage\(\{ params \}: \{ params: \{ id: string \} \}\) \{',
    'export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {\n  const { id } = use(params);',
    content
)

# Replace params.id with id
content = content.replace('params.id', 'id')

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'w') as f:
    f.write(content)
