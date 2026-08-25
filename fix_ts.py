import re

# Fix profile?.name to profile?.displayName
def fix_display_name(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    content = content.replace('profile?.name', 'profile?.displayName')
    with open(filepath, 'w') as f:
        f.write(content)

fix_display_name('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx')
fix_display_name('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/MobileMenu.tsx')
fix_display_name('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/CreateRequirementModal.tsx')

# Fix usePosts.ts Type Error
with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/lib/hooks/usePosts.ts', 'r') as f:
    content = f.read()
content = content.replace('setPosts(MOCK_POSTS);', 'setPosts(MOCK_POSTS as Post[]);')
with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/lib/hooks/usePosts.ts', 'w') as f:
    f.write(content)

