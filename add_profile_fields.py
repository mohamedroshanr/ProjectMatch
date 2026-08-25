import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'r') as f:
    content = f.read()

# Add state
if 'const [editExperience' not in content:
    content = content.replace(
        'const [editDegree, setEditDegree] = useState("Computer Science");',
        'const [editDegree, setEditDegree] = useState("Computer Science");\n  const [editExperience, setEditExperience] = useState("Intermediate");\n  const [editAvailability, setEditAvailability] = useState("Weekends");'
    )

# Add to display logic
# I need to add Experience and Availability badges to the display mode of the Profile Header
display_ui = """                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-sm text-nexa-lavender">
                    <span className="flex items-center gap-1.5"><BookOpen size={16} className="text-nexa-blue" /> {editCollege}</span>
                    <span className="flex items-center gap-1.5 text-white/50">{editDegree}</span>
                  </div>
                  <div className="flex gap-2 mt-3 justify-center md:justify-start">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-nexa-blue/10 border border-nexa-blue/20 text-nexa-blue">{editExperience}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">{editAvailability}</span>
                  </div>"""

content = re.sub(
    r'<div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-sm text-nexa-lavender">[\s\S]*?<\/div>',
    display_ui,
    content
)

# Add to Edit Mode
edit_ui = """                  <div className="grid grid-cols-2 gap-3">
                    <Input value={editCollege} onChange={(e) => setEditCollege(e.target.value)} placeholder="College" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                    <Input value={editDegree} onChange={(e) => setEditDegree(e.target.value)} placeholder="Degree" className="bg-black/40 border-white/10 text-white rounded-xl h-10" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <select value={editExperience} onChange={(e) => setEditExperience(e.target.value)} className="bg-black/40 border border-white/10 text-white rounded-xl h-10 px-3 focus:outline-none focus:border-nexa-blue">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <select value={editAvailability} onChange={(e) => setEditAvailability(e.target.value)} className="bg-black/40 border border-white/10 text-white rounded-xl h-10 px-3 focus:outline-none focus:border-nexa-blue">
                      <option value="Weekends">Weekends</option>
                      <option value="Evenings">Evenings</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </select>
                  </div>"""

content = re.sub(
    r'<div className="grid grid-cols-2 gap-3">\s*<Input value=\{editCollege\}[\s\S]*?<\/div>',
    edit_ui,
    content
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/profile/[id]/page.tsx', 'w') as f:
    f.write(content)
