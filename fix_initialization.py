import re

# Fix Navbar
with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '  const mockUser = user ? MOCK_USERS.find(u => u.id === user.uid) : null;\n  const displayName = profile?.name || mockUser?.name || "User";\n  const displayAvatar = profile?.photoURL || mockUser?.avatar || "";\n\n  const { profile } = useProfile(user?.uid ?? null);',
    '  const { profile } = useProfile(user?.uid ?? null);\n  const mockUser = user ? MOCK_USERS.find(u => u.id === user.uid) : null;\n  const displayName = profile?.name || mockUser?.name || "User";\n  const displayAvatar = profile?.photoURL || mockUser?.avatar || "";'
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'w') as f:
    f.write(content)

# Fix MobileMenu
with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/MobileMenu.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '  const mockUser = user ? MOCK_USERS.find(u => u.id === user.uid) : null;\n  const displayName = profile?.name || mockUser?.name || "User";\n  const displayAvatar = profile?.photoURL || mockUser?.avatar || "";\n\n  const { profile } = useProfile(user?.uid ?? null);',
    '  const { profile } = useProfile(user?.uid ?? null);\n  const mockUser = user ? MOCK_USERS.find(u => u.id === user.uid) : null;\n  const displayName = profile?.name || mockUser?.name || "User";\n  const displayAvatar = profile?.photoURL || mockUser?.avatar || "";'
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/MobileMenu.tsx', 'w') as f:
    f.write(content)
