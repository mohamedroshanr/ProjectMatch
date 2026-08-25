import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/MobileMenu.tsx', 'r') as f:
    content = f.read()

if 'import { MOCK_USERS }' not in content:
    content = content.replace('import { useProfile } from "@/lib/hooks/useProfile";', 'import { useProfile } from "@/lib/hooks/useProfile";\nimport { MOCK_USERS } from "@/lib/mockData";')

mock_logic = """
  const mockUser = user ? MOCK_USERS.find(u => u.id === user.uid) : null;
  const displayName = profile?.name || mockUser?.name || "User";
  const displayAvatar = profile?.photoURL || mockUser?.avatar || "";
"""
if 'const mockUser = user ?' not in content:
    content = content.replace('const { profile } = useProfile(user?.uid ?? null);', 'const { profile } = useProfile(user?.uid ?? null);\n' + mock_logic)

content = content.replace('{profile?.name || "User"}', '{displayName}')
content = content.replace('src={profile?.photoURL}', 'src={displayAvatar}')

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/MobileMenu.tsx', 'w') as f:
    f.write(content)
