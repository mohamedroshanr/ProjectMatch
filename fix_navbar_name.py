import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'r') as f:
    content = f.read()

if 'import { MOCK_USERS }' not in content:
    content = content.replace('import { CreateRequirementModal } from "./CreateRequirementModal";', 'import { CreateRequirementModal } from "./CreateRequirementModal";\nimport { MOCK_USERS } from "@/lib/mockData";')

# Replace {profile?.name || "User"} with mock fallback
mock_logic = """
  const mockUser = user ? MOCK_USERS.find(u => u.id === user.uid) : null;
  const displayName = profile?.name || mockUser?.name || "User";
  const displayAvatar = profile?.photoURL || mockUser?.avatar || "";
"""
if 'const mockUser = user ?' not in content:
    content = content.replace('const { user, logOut } = useAuth();', 'const { user, logOut } = useAuth();\n' + mock_logic)

content = content.replace('{profile?.name || "User"}', '{displayName}')
content = content.replace('src={profile?.photoURL}', 'src={displayAvatar}')

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'w') as f:
    f.write(content)
