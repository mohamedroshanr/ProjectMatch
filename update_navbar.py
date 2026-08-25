import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Add imports
if 'import { Bell, Plus } from "lucide-react";' not in content:
    content = content.replace('import { LogOut, User, Menu, X } from "lucide-react";', 'import { LogOut, User, Menu, X, Bell, Plus } from "lucide-react";')
if 'import { CreateRequirementModal }' not in content:
    content = content.replace('import { Logo } from "./Logo";', 'import { Logo } from "./Logo";\nimport { CreateRequirementModal } from "./CreateRequirementModal";')

# Add modal state
if 'const [requirementModalOpen, setRequirementModalOpen] = useState(false);' not in content:
    content = content.replace('const [mobileMenuOpen, setMobileMenuOpen] = useState(false);', 'const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [requirementModalOpen, setRequirementModalOpen] = useState(false);')

# Add Post Requirement and Bell to Desktop Nav
desktop_nav_replacement = """
            {/* Desktop Profile & Auth */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <Button onClick={() => setRequirementModalOpen(true)} className="bg-white/10 hover:bg-white/20 text-white rounded-xl h-9 px-4 text-xs font-semibold mr-2 border-0">
                    <Plus size={14} className="mr-1" /> Post Requirement
                  </Button>
                  <button className="relative text-nexa-lavender hover:text-white transition-colors mr-2">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-nexa-orange rounded-full border-2 border-nexa-card-dark"></span>
                  </button>
                  <Link href={`/profile/${user.uid}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
"""
content = re.sub(r'\{\/\* Desktop Profile & Auth \*\/\}[\s\S]*?\{user \? \([\s\S]*?<div className="flex items-center gap-3">\s*<Link href=\{\`/profile', desktop_nav_replacement, content)

# Add <CreateRequirementModal />
content = content.replace('</>', '  <CreateRequirementModal isOpen={requirementModalOpen} onClose={() => setRequirementModalOpen(false)} />\n    </>')

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'w') as f:
    f.write(content)
