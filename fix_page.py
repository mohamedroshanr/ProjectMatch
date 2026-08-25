import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'Start Building <ArrowRight size={20} />\n                  </Button>\n                </Link>',
    'Start Building <ArrowRight size={20} />\n                  </Button>\n                  </motion.div>\n                </Link>'
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/page.tsx', 'w') as f:
    f.write(content)
