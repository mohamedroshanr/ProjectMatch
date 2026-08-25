import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/page.tsx', 'r') as f:
    content = f.read()

if 'import { Tilt }' not in content:
    content = content.replace('import { BlurFade } from "@/components/motion-primitives/blur-fade";', 'import { BlurFade } from "@/components/motion-primitives/blur-fade";\nimport { Tilt } from "@/components/motion-primitives/tilt";')

content = re.sub(
    r'<BlurFade key={i} delay={0\.2 \* i}>\s*<div className="bg-nexa-card-dark',
    r'<BlurFade key={i} delay={0.2 * i} className="h-full">\n                  <Tilt rotationFactor={15} className="h-full">\n                  <div className="bg-nexa-card-dark h-full',
    content
)

content = re.sub(
    r'</h3>\s*<p className="text-nexa-lavender-3 leading-relaxed">{step\.desc}</p>\s*</div>\s*</BlurFade>',
    r'</h3>\n                    <p className="text-nexa-lavender-3 leading-relaxed">{step.desc}</p>\n                  </div>\n                  </Tilt>\n                </BlurFade>',
    content
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/app/page.tsx', 'w') as f:
    f.write(content)
