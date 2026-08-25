import re

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/PostCard.tsx', 'r') as f:
    content = f.read()

replacement = """
    getDoc(doc(db, "users", post.authorId)).then((snap) => {
      if (snap.exists()) {
        setAuthorData(snap.data() as UserProfile);
      } else {
        // Fallback for mock posts
        setAuthorData({
          displayName: "Demo User " + post.authorId.slice(-1),
          college: "Stanford University",
          photoURL: "https://i.pravatar.cc/150?u=" + post.authorId,
        });
      }
    });
"""

content = re.sub(r'getDoc\(doc\(db, "users", post\.authorId\)\)\.then\(\(snap\) => \{\s*if \(snap\.exists\(\)\) setAuthorData\(snap\.data\(\) as UserProfile\);\s*\}\);', replacement.strip(), content)

with open('/Users/roshan/.gemini/antigravity/scratch/projectmatch/components/PostCard.tsx', 'w') as f:
    f.write(content)
