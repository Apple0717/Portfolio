export const profile = {
  name: "William L. Todd",
  title: "AI & Voice Software Engineer",
  location: "San Leandro, California",
  email: "appleseed20240717@gmail.com",
  phone: "(626) 500-0498",
  phoneHref: "tel:6265000498",
  intro:
    "I build production AI systems, voice agents, and conversational products. From California, the work reaches school districts, healthcare, telephony, and the open web — in Python, Node.js, TypeScript, AWS, Azure, and GCP.",
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
  platforms: string[];
  address: string;
};

export const experience: Experience[] = [
  {
    id: "rturner",
    role: "Full Stack Engineer",
    company: "RTurner Consulting, LLC",
    period: "07/2026 – 10/2026",
    address: "P.O. Box 1058, Taylorsville, KY 40071",
    platforms: ["Azure", "QuickBooks"],
    points: [
      "Built an Azure platform managing menu & nutrition info for United School Districts.",
      "Built a best-candidate suggestion system for menu bidding.",
      "Implemented invoice management with the QuickBooks API.",
    ],
  },
  {
    id: "shepherdspath",
    role: "Mobile Developer (Founder)",
    company: "Shepherdspath AI",
    period: "03/2026 – 06/2026",
    address: "Liberty Lake, Washington",
    platforms: ["Flutter", "Firebase", "OpenAI", "Replit"],
    points: [
      "Built the iOS sermon app end to end with Flutter + Firebase.",
      "Integrated OpenAI to generate sermon content.",
      "Made it responsive for mobile and web via Replit.",
    ],
  },
  {
    id: "sermonai",
    role: "Software AI Engineer",
    company: "SermonAI",
    period: "03/2024 – 02/2026",
    address: "25 Atwater Ave, West Brookfield, MA 01585",
    platforms: ["Next.js", "MongoDB", "OpenAI", "Stripe", "Supabase", "Claude", "LangChain", "MCP"],
    points: [
      "SermonAI 3.0: Next.js, MongoDB, OpenAI, Stripe billing.",
      "SermonAI 4.0: re-architected with Next.js, Supabase, Claude.",
      "RAG pipelines, LangChain agents, MCP-based tool stack.",
    ],
  },
  {
    id: "brisbane",
    role: "Frontend Developer",
    company: "Brisbane Gateway",
    period: "01/2023 – 03/2024",
    address: "200 School Road, Rochedale QLD 4123, Australia",
    platforms: ["Next.js", "AWS", "OpenAI", "New Booking Cloud"],
    points: [
      "Responsive Next.js front end hosted on AWS.",
      "OpenAI chatbot guiding visitors to booking.",
      "Integrated New Booking Cloud and technical SEO.",
    ],
  },
  {
    id: "sprigs",
    role: "Automation Engineer",
    company: "Sprigs Life",
    period: "10/2023 – 12/2023",
    address: "6399 OH-83, Millersburg, OH 44654",
    platforms: ["Make.com", "Zapier", "Node", "OpenAI"],
    points: [
      "Implemented the order system using Make.com, Zapier, and a Node Server.",
      "Implemented the email template build system using OpenAI and Make.com.",
    ],
  },
  {
    id: "nexvoz",
    role: "Software Engineer",
    company: "NexVoz",
    period: "05/2023 – 10/2023",
    address: "8635 W Sahara Ave, Ste 3129, Las Vegas, NV 89117",
    platforms: ["WebRTC", "Twilio", "Deepgram"],
    points: [
      "Voice AI workflows: orchestration, telephony, call routing, human handoff.",
      "Real-time voice with WebRTC, Twilio, Deepgram STT/TTS.",
    ],
  },
  {
    id: "ramp",
    role: "Software Engineer",
    company: "Ramp",
    period: "04/2020 – 05/2023",
    address: "28 West 23rd Street, Floor 2, New York, NY 10010",
    platforms: ["Python", "FastAPI", "Node", "AWS", "OpenAI", "Claude"],
    points: [
      "Led backend for production AI systems (Python, FastAPI, Node, AWS).",
      "LLM apps with RAG, vector search, OpenAI & Claude.",
    ],
  },
  {
    id: "assort",
    role: "Software Engineer",
    company: "Assort Health",
    period: "09/2018 – 04/2020",
    address: "One Market Street, Spear Tower, Suite 1000, San Francisco, CA 94105",
    platforms: ["HIPAA", "SOC 2"],
    points: ["HIPAA / SOC 2 compliant healthcare AI workflows."],
  },
];

export const portfolio = [
  { name: "SermonAI 4.0", tag: "AI SaaS", stack: "Next.js · Supabase · Claude" },
  { name: "Shepherdspath AI", tag: "Mobile", stack: "Flutter · Firebase · OpenAI" },
  { name: "NexVoz Voice Agent", tag: "Voice AI", stack: "Twilio · WebRTC · Deepgram" },
  { name: "Brisbane Gateway", tag: "Web", stack: "Next.js · AWS · OpenAI" },
  { name: "Sprigs Life Automation", tag: "Automation", stack: "Make.com · Zapier · Node" },
  { name: "School Menu Platform", tag: "Enterprise", stack: "Azure · QuickBooks API" },
];

export const trend = [
  { year: "2018", ai: 20, voice: 5, web: 40 },
  { year: "2020", ai: 45, voice: 10, web: 45 },
  { year: "2022", ai: 60, voice: 25, web: 50 },
  { year: "2023", ai: 70, voice: 80, web: 65 },
  { year: "2024", ai: 88, voice: 60, web: 75 },
  { year: "2025", ai: 95, voice: 70, web: 80 },
  { year: "2026", ai: 98, voice: 75, web: 85 },
];

export const skills = [
  ["AI & LLMs", 96],
  ["Voice & Telephony", 88],
  ["Backend (Python/Node)", 92],
  ["Cloud (AWS/Azure/GCP)", 85],
  ["Frontend & Mobile", 84],
] as const;

export const skillSets = [
  {
    title: "AI & LLM Engineering",
    items: [
      "LLM Integration",
      "RAG Pipelines",
      "LangChain",
      "AI Agents",
      "Prompt Engineering",
      "Semantic Search",
      "Vector Search",
      "Embeddings",
      "Hugging Face",
      "Pinecone",
      "OpenAI",
      "Anthropic/Claude",
    ],
  },
  {
    title: "Voice & Conversational AI",
    items: [
      "Voice AI Agents",
      "Conversational AI",
      "Deepgram",
      "STT/TTS Pipelines",
      "LiveKit",
      "WebRTC",
      "Twilio",
      "Real-Time Audio Streaming",
      "Voice Agent Orchestration",
      "Call Routing",
      "Human Handoff",
    ],
  },
  {
    title: "Backend & Programming Languages",
    items: [
      "Python",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "FastAPI",
      "Flask",
      "Django",
      "Java",
      "C#",
      "PHP",
      "Spring Boot",
      "Laravel",
      "REST APIs",
      "API Integrations",
    ],
  },
  {
    title: "Frontend & Full-Stack Development",
    items: [
      "React",
      "Next.js",
      "React Native",
      "HTML5",
      "CSS3",
      "Responsive UI Development",
      "Full-Stack Application Development",
    ],
  },
  {
    title: "Cloud & Infrastructure",
    items: [
      "AWS",
      "Microsoft Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Cloud Deployment",
      "Production Monitoring",
      "Application Performance Optimization",
    ],
  },
  {
    title: "Databases & Data Engineering",
    items: [
      "PostgreSQL",
      "Redis",
      "Microsoft SQL Server",
      "Oracle",
      "Vector Databases",
      "Data Pipelines",
      "Pandas",
      "NumPy",
      "Database Optimization",
    ],
  },
  {
    title: "MLOps & AI Deployment",
    items: [
      "Model Deployment",
      "AI Pipeline Integration",
      "Model Serving",
      "Logging and Monitoring",
      "Caching",
      "Scalable AI Infrastructure",
    ],
  },
  {
    title: "Security & Compliance",
    items: [
      "HIPAA",
      "SOC 2",
      "Secure API Design",
      "Authentication and Authorization",
      "Role-Based Access Control (RBAC)",
      "Data Privacy",
      "Permissioned Workflows",
      "Privacy-Conscious Architecture",
    ],
  },
] as const;
