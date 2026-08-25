with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'r') as f:
    content = f.read()

# I need to extract the new_logic and move it after the useStates.
# First, remove the current logic block:
logic_block = """  const mockUser = MOCK_USERS.find(u => u.id === id);
  const displayName = editName || (mockUser ? mockUser.name : "User");
  const displayHandle = "@" + displayName.toLowerCase().replace(/\\s+/g, '_');
  const displayAvatar = editAvatar || (mockUser ? mockUser.avatar : `https://api.dicebear.com/7.x/notionists/svg?seed=${id}&backgroundColor=b6e3f4`);
  
  const handleEditToggle = () => {
    if (!isEditing) {
      setEditName(displayName);
      setEditAvatar(displayAvatar);
    }
    setIsEditing(!isEditing);
  };"""

content = content.replace(logic_block + "\n", "")
content = content.replace(logic_block, "")

# Now insert it right before toggleSkill
insert_marker = "  const toggleSkill = (skill: string) => {"
content = content.replace(insert_marker, logic_block + "\n\n" + insert_marker)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'w') as f:
    f.write(content)
