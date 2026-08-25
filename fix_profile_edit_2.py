with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'r') as f:
    content = f.read()

# Replace imports
if 'import { Input } from "@/components/ui/input";' not in content:
    content = content.replace('import { Button } from "@/components/ui/button";', 'import { Button } from "@/components/ui/button";\nimport { Input } from "@/components/ui/input";')

if 'import { Pencil, Check, Image as ImageIcon } from "lucide-react";' not in content:
    content = content.replace('import { GitBranch, UserPlus, BookOpen, MapPin, Code2 } from "lucide-react";', 'import { GitBranch, BookOpen, Code2, Pencil, Check, Image as ImageIcon } from "lucide-react";')

# Add editing states
if 'const [isEditing, setIsEditing]' not in content:
    content = content.replace('  const [githubLinked, setGithubLinked] = useState(false);', 
                              '  const [githubLinked, setGithubLinked] = useState(false);\n  const [isEditing, setIsEditing] = useState(false);\n  const [editName, setEditName] = useState("");\n  const [editAvatar, setEditAvatar] = useState("");\n  const [editCollege, setEditCollege] = useState("Stanford University");\n  const [editDegree, setEditDegree] = useState("Computer Science");')

old_logic = """  const mockUser = MOCK_USERS.find(u => u.id === id);
  const displayName = mockUser ? mockUser.name : "User";
  const displayHandle = "@" + displayName.toLowerCase().replace(/\\s+/g, '_');
  const displayAvatar = mockUser ? mockUser.avatar : `https://api.dicebear.com/7.x/notionists/svg?seed=${id}&backgroundColor=b6e3f4`;"""

new_logic = """  const mockUser = MOCK_USERS.find(u => u.id === id);
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

content = content.replace(old_logic, new_logic)

import re

header_ui = """
          <div className="px-8 pb-8 -mt-16 relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6">
            <Avatar className="w-32 h-32 border-4 border-nexa-card-dark bg-nexa-card-dark shrink-0">
              <AvatarImage src={displayAvatar} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left mb-2 md:mb-0 w-full">
              {isEditing ? (
                <div className="space-y-3 mt-4 max-w-md mx-auto md:mx-0">
                  <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Full Name" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                  <Input value={editAvatar} onChange={(e) => setEditAvatar(e.target.value)} placeholder="Profile Picture URL" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input value={editCollege} onChange={(e) => setEditCollege(e.target.value)} placeholder="College" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                    <Input value={editDegree} onChange={(e) => setEditDegree(e.target.value)} placeholder="Degree" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                    {displayHandle}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-sm text-nexa-lavender">
                    <span className="flex items-center gap-1.5"><BookOpen size={16} className="text-nexa-blue" /> {editCollege}</span>
                    <span className="flex items-center gap-1.5 text-white/50">{editDegree}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 shrink-0">
              <Button onClick={handleEditToggle} className="bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl px-6 h-11">
                {isEditing ? <><Check size={18} className="mr-2 text-emerald-400" /> Save Profile</> : <><Pencil size={18} className="mr-2" /> Edit Profile</>}
              </Button>
            </div>
          </div>
"""

content = re.sub(
    r'<div className="px-8 pb-8 -mt-16 relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/BlurFade>',
    header_ui + '\n        </div>\n      </BlurFade>',
    content
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'w') as f:
    f.write(content)
