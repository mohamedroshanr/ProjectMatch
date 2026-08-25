import glob
import re

files = glob.glob('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/**/*.tsx', recursive=True) + \
        glob.glob('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Add alt text to img tags if missing
    content = re.sub(r'<img(?![^>]*alt=)[^>]*>', lambda m: m.group(0).replace('<img', '<img alt=""'), content)
    
    # Add aria-labels to buttons containing only icons (e.g., <Button size="icon" ...)
    content = re.sub(r'(<Button[^>]*size="icon"[^>]*)>', r'\1 aria-label="Icon Button">', content)
    
    with open(file, 'w') as f:
        f.write(content)
