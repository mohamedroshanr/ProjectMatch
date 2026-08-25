import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/events/page.tsx', 'r') as f:
    content = f.read()

if 'import { Tilt }' not in content:
    content = content.replace('import { BlurFade } from "@/components/motion-primitives/blur-fade";', 'import { BlurFade } from "@/components/motion-primitives/blur-fade";\nimport { Tilt } from "@/components/motion-primitives/tilt";')

content = re.sub(
    r'<BlurFade key={event\.id} delay={0\.1 \* idx}>\s*<div className="bg-nexa-card-dark',
    r'<BlurFade key={event.id} delay={0.1 * idx}>\n            <Tilt rotationFactor={6}>\n            <div className="bg-nexa-card-dark',
    content
)

content = re.sub(
    r'</Button>\s*</div>\s*</div>\s*</div>\s*</BlurFade>',
    r'</Button>\n                </div>\n              </div>\n            </div>\n            </Tilt>\n          </BlurFade>',
    content
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/(app)/events/page.tsx', 'w') as f:
    f.write(content)
