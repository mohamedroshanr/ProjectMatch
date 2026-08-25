import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/MobileMenu.tsx', 'r') as f:
    content = f.read()

# Add MOCK_USERS import if missing
if 'import { MOCK_USERS }' not in content:
    content = content.replace('import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";', 'import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";\nimport { MOCK_USERS } from "@/lib/mockData";')

# Inject the variables inside the component
mock_logic = """
  const mockUser = user ? MOCK_USERS.find(u => u.id === user.uid) : null;
  const displayName = profile?.name || mockUser?.name || "User";
  const displayAvatar = profile?.photoURL || mockUser?.avatar || "";
"""

if 'const mockUser =' not in content:
    content = content.replace('const pathname = usePathname();', 'const pathname = usePathname();\n' + mock_logic)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/MobileMenu.tsx', 'w') as f:
    f.write(content)
