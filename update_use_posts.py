import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/lib/hooks/usePosts.ts', 'r') as f:
    content = f.read()

# Replace the MOCK_POSTS array definition with an import
content = re.sub(r'const MOCK_POSTS: Post\[\] = \[.*?\];', 'import { MOCK_POSTS } from "@/lib/mockData";', content, flags=re.DOTALL)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/lib/hooks/usePosts.ts', 'w') as f:
    f.write(content)
