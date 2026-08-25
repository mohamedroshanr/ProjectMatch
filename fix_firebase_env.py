import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/lib/firebase.ts', 'r') as f:
    content = f.read()

new_config = """const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-api-key-to-bypass-build-error",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://mock-project-default-rtdb.firebaseio.com",
};"""

content = re.sub(
    r'const firebaseConfig = \{[\s\S]*?\};',
    new_config,
    content
)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/lib/firebase.ts', 'w') as f:
    f.write(content)
