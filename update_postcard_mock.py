import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/PostCard.tsx', 'r') as f:
    content = f.read()

if 'import { MOCK_USERS }' not in content:
    content = content.replace('import { Tilt } from "@/components/motion-primitives/tilt";', 'import { Tilt } from "@/components/motion-primitives/tilt";\nimport { MOCK_USERS } from "@/lib/mockData";')

replacement = """
    getDoc(doc(db, "users", post.authorId)).then((snap) => {
      if (snap.exists()) {
        setAuthorData(snap.data() as UserProfile);
      } else {
        // Fallback for mock posts
        const mockUser = MOCK_USERS.find(u => u.id === post.authorId);
        if (mockUser) {
          setAuthorData({
            displayName: mockUser.name,
            college: mockUser.role,
            photoURL: mockUser.avatar,
          });
        }
      }
    });
"""

content = re.sub(r'getDoc\(doc\(db, "users", post\.authorId\)\)\.then\(\(snap\) => \{[\s\S]*?\}\);', replacement.strip(), content)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/PostCard.tsx', 'w') as f:
    f.write(content)
