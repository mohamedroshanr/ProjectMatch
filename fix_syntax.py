import glob
import re

files = glob.glob('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/**/*.tsx', recursive=True) + \
        glob.glob('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Revert the specific broken replacements caused by `onClick={() =>`
    content = content.replace('onClick={() = aria-label="Icon Button">', 'onClick={() =>')
    
    # Actually, the replacement was: `onClick={() = aria-label="Icon Button"> setMobileMenuOpen(true)}`
    # It replaced `>` with ` aria-label="Icon Button">`
    content = content.replace('= aria-label="Icon Button">', '=>')
    
    with open(file, 'w') as f:
        f.write(content)
