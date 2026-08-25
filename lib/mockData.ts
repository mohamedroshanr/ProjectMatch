export const MOCK_USERS = [
  {
    id: "user1",
    name: "Alex Chen",
    role: "ML Engineer",
    skills: ["Python", "PyTorch", "TensorFlow", "C++", "CUDA"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=b6e3f4"
  },
  {
    id: "user2",
    name: "Sarah Kim",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind", "Next.js", "Framer Motion"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sarah&backgroundColor=ffdfbf"
  },
  {
    id: "user3",
    name: "Jordan Lee",
    role: "Fullstack Engineer",
    skills: ["Node.js", "React", "PostgreSQL", "AWS", "Docker"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Jordan&backgroundColor=c0aede"
  },
  {
    id: "user4",
    name: "Mia Wong",
    role: "Data Scientist",
    skills: ["Python", "SQL", "Pandas", "Scikit-Learn", "Tableau"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Mia&backgroundColor=d1d4f9"
  },
  {
    id: "user5",
    name: "David Smith",
    role: "Backend Developer",
    skills: ["Java", "Spring Boot", "Go", "Kubernetes", "Redis"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=David&backgroundColor=ffd5dc"
  },
  {
    id: "user6",
    name: "Emma Davis",
    role: "UX/UI Designer",
    skills: ["Figma", "UI Design", "User Research", "Prototyping", "CSS"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Emma&backgroundColor=b6e3f4"
  },
  {
    id: "user7",
    name: "Liam Johnson",
    role: "Smart Contract Dev",
    skills: ["Solidity", "Rust", "Web3.js", "Hardhat", "Cairo"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Liam&backgroundColor=ffdfbf"
  },
  {
    id: "user8",
    name: "Noah Garcia",
    role: "Hardware/IoT Engineer",
    skills: ["C", "C++", "Arduino", "Raspberry Pi", "Embedded Systems"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Noah&backgroundColor=c0aede"
  },
  {
    id: "user9",
    name: "Olivia Martinez",
    role: "DevOps Engineer",
    skills: ["AWS", "Terraform", "CI/CD", "Linux", "Kubernetes"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Olivia&backgroundColor=d1d4f9"
  },
  {
    id: "user10",
    name: "William Brown",
    role: "Mobile Developer",
    skills: ["Swift", "Kotlin", "Flutter", "React Native", "Firebase"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=William&backgroundColor=ffd5dc"
  }
];

export const MOCK_POSTS = [
  {
    id: "post1",
    authorId: "user8", // Noah
    title: "IoT Hardware Hub",
    description: "Building an open-source hub for smart home devices using ESP32 and Rust. Need someone with embedded experience to help write the firmware drivers.",
    rolesNeeded: ["Embedded Dev", "Rust Developer"],
    skillsNeeded: ["Rust", "Embedded Systems", "C++"],
    status: "open",
    interested: ["user4"],
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: "post2",
    authorId: "user1", // Alex
    title: "Edge AI Computer Vision",
    description: "Developing a real-time object detection model that runs on edge devices with 15+ FPS. Looking for a data scientist to help optimize the PyTorch models.",
    rolesNeeded: ["Data Scientist", "ML Ops"],
    skillsNeeded: ["Python", "PyTorch", "TensorFlow"],
    status: "open",
    interested: ["user4", "user3"],
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: "post3",
    authorId: "user3", // Jordan
    title: "Full-Stack SaaS for Clinics",
    description: "A comprehensive dashboard for medical clinics to manage appointments and patient records. Need a frontend specialist to build out the complex calendar UI.",
    rolesNeeded: ["Frontend Developer", "UX Designer"],
    skillsNeeded: ["React", "TypeScript", "Tailwind", "Figma"],
    status: "open",
    interested: ["user2", "user6"],
    createdAt: Date.now() - 3600000 * 12,
  },
  {
    id: "post4",
    authorId: "user7", // Liam
    title: "Autonomous Robotics Swarm",
    description: "Research project focusing on decentralized coordination of micro-drones. We need backend networking experts to handle the low-latency communication layer.",
    rolesNeeded: ["Backend Dev", "Network Engineer"],
    skillsNeeded: ["Go", "C++", "Networking", "Redis"],
    status: "open",
    interested: ["user5"],
    createdAt: Date.now() - 3600000 * 24,
  },
  {
    id: "post5",
    authorId: "user2", // Sarah
    title: "AI Code Assistant for VS Code",
    description: "Building a lightweight, local-first LLM code assistant using Ollama. Need a backend dev to build the local server that interfaces with the model.",
    rolesNeeded: ["Backend Developer"],
    skillsNeeded: ["Node.js", "Python", "Local LLMs"],
    status: "filled",
    interested: ["user5", "user1"],
    createdAt: Date.now() - 3600000 * 48,
  },
  {
    id: "post6",
    authorId: "user10", // William
    title: "Cross-platform Crypto Wallet",
    description: "Starting a new mobile wallet app focused on UX for non-technical users. Looking for a smart contract dev to handle the on-chain integrations.",
    rolesNeeded: ["Smart Contract Dev"],
    skillsNeeded: ["Solidity", "Web3.js", "Flutter"],
    status: "open",
    interested: ["user7"],
    createdAt: Date.now() - 3600000 * 72,
  }
];
