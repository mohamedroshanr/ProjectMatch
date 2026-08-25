import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Add states for notification dropdown
if 'const [notificationsOpen, setNotificationsOpen] = useState(false);' not in content:
    content = content.replace(
        'const [requirementModalOpen, setRequirementModalOpen] = useState(false);', 
        'const [requirementModalOpen, setRequirementModalOpen] = useState(false);\n  const [notificationsOpen, setNotificationsOpen] = useState(false);'
    )
if 'import { Check, X as XIcon } from "lucide-react";' not in content:
    content = content.replace('import { LogOut, User, Menu, X, Bell, Plus } from "lucide-react";', 'import { LogOut, User, Menu, X, Bell, Plus, Check, X as XIcon } from "lucide-react";')

# Replace the notification bell button with a dropdown structure
bell_replacement = """
                  <div className="relative">
                    <button 
                      onClick={() => setNotificationsOpen(!notificationsOpen)}
                      className="relative text-nexa-lavender hover:text-white transition-colors mr-2"
                    >
                      <Bell size={20} />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-nexa-orange rounded-full border-2 border-nexa-card-dark"></span>
                    </button>
                    
                    <AnimatePresence>
                      {notificationsOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-4 w-80 bg-nexa-card-dark border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50"
                        >
                          <div className="p-3 border-b border-white/5 bg-black/20">
                            <h4 className="text-sm font-semibold text-white">Notifications</h4>
                          </div>
                          <div className="p-2 space-y-1">
                            <div className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                              <p className="text-sm text-white mb-2"><span className="font-bold">@alex_c</span> sent you a friend request.</p>
                              <div className="flex gap-2">
                                <Button className="flex-1 h-8 text-xs bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-0">
                                  <Check size={14} className="mr-1" /> Accept
                                </Button>
                                <Button className="flex-1 h-8 text-xs bg-white/5 text-nexa-lavender hover:bg-white/10 border-0">
                                  <XIcon size={14} className="mr-1" /> Decline
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
"""

content = re.sub(
    r'<button className="relative text-nexa-lavender hover:text-white transition-colors mr-2">\s*<Bell size=\{20\} \/>\s*<span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-nexa-orange rounded-full border-2 border-nexa-card-dark"><\/span>\s*<\/button>',
    bell_replacement,
    content
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/Navbar.tsx', 'w') as f:
    f.write(content)
