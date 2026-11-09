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
    company: "rTurner consulting LLC",
    period: "07/2026 – 10/2026",
    address: "P.O. Box 1058, Taylorsville, KY 40071",
    platforms: ["Azure", "QuickBooks"],
    points: [
      "Built a legacy platform on Azure that manages menu and nutrition information for United School Districts.",
      "Built a best-candidate suggestion system that lets small companies and shops bid on the best-matching menus.",
      "Implemented invoice management using the QuickBooks API.",
      "Worked directly with stakeholders to turn business requirements into scalable, maintainable solutions, and coordinated with distributed engineering teams to ship enterprise-grade software.",
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
      "Founded Shepherdspath AI and built its iOS sermon app end to end as the sole mobile developer, using Flutter for the client and Firebase for the backend.",
      "Integrated the OpenAI API to generate sermon content, giving pastors an AI assistant for drafting and organizing their messages.",
      "Designed a premium, polished interface with custom animations, smooth screen transitions, and a fully themed dark mode.",
      "Migrated the project to a responsive layout using Replit, so the same experience works on both mobile and web.",
      "Owned the full product lifecycle, from UI design and feature development to testing and release preparation.",
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
      "Led the core AI engineering behind SermonAI, a platform for AI-driven sermon preparation and content automation.",
      "SermonAI 3.0: Built with Next.js, MongoDB, and OpenAI, hosted on Plesk. Integrated the Stripe API for billing and subscriptions.",
      "SermonAI 4.0: Refactored 3.0 into a new architecture using Next.js, Supabase, and Claude.",
      "Designed LLM architectures using RAG pipelines, domain-specific fine-tuning of open-source models, and multi-step agent orchestration with LangChain.",
      "Shipped AI features such as predictive insights, automated planning, and generative summaries across a full-stack application (Python/FastAPI backend, Next.js frontend).",
      "Architected cloud-native, multi-tenant systems on AWS and GCP, with an emphasis on scalability, reliability, and security.",
      "Built MLOps pipelines and CI/CD workflows with GitHub Actions; enforced data privacy and compliance standards (SOC 2, GDPR).",
      "Designed an MCP-based tool stack that replaced multiple custom integrations with one protocol-driven interface.",
      "Tuned conversational design to balance a friendly user experience with strict control over context window, response length, latency, and token cost.",
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
      "Designed and built the Brisbane Gateway front end with Next.js, delivering a clean, mobile-responsive UI that works across phones, tablets, and desktops.",
      "Deployed and hosted the application on AWS, handling the setup needed for reliable, production-ready releases.",
      "Implemented an AI chatbot with the OpenAI API to answer visitor questions and guide them toward booking.",
      "Applied technical SEO practices, including metadata, page structure, and performance improvements, to increase search visibility.",
      "Integrated the New Booking Cloud system so customers could check availability and complete bookings directly on the site.",
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
      "Built automation tools and full-stack web applications at Sprigs Life using Python (Django, Flask) and JavaScript (React, Node.js), creating the foundation for later AI-driven features.",
      "Implemented the order system using Make.com, Zapier, and a Node.js server, automating how orders are captured and processed.",
      "Implemented an email template build system using OpenAI and Make.com, generating ready-to-send email content automatically.",
      "Developed RESTful APIs and server-side services for web and mobile platforms, with responsive React interfaces and tuned PostgreSQL and MongoDB databases behind them.",
      "Integrated third-party APIs and cloud services, and deployed applications on AWS using Git, Docker, and CI/CD pipelines.",
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
      "Built voice AI workflows for real-time call handling: agent orchestration, telephony integration, call routing, and human handoff.",
      "Developed real-time voice systems using WebRTC, Twilio, and Deepgram, including streaming audio, STT/TTS pipelines, and interruption handling.",
      "Kept production calls low-latency and reliable through monitoring, retries, and graceful handoff to human agents.",
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
      "Led backend engineering for production AI systems using Python, FastAPI, Node.js, TypeScript, PostgreSQL, Redis, and AWS, including APIs, distributed services, and data pipelines.",
      "Built LLM-powered applications, including RAG pipelines, vector search, and AI agents integrated with OpenAI and Anthropic/Claude.",
      "Owned architecture and delivery for model-driven systems connected to real application data, tools, and business processes.",
      "Supported production infrastructure with Docker, Kubernetes, CI/CD, observability, security, and incident response on AWS.",
    ],
  },
  {
    id: "assort",
    role: "Software Engineer",
    company: "Assort Health",
    period: "09/2018 – 04/2020",
    address: "One Market Street, Spear Tower, Suite 1000, San Francisco, CA 94105",
    platforms: ["HIPAA", "SOC 2"],
    points: [
      "Built healthcare-focused AI workflows prioritizing reliability, privacy, and secure data handling.",
      "Designed permissioned workflows, secure API integrations, and controlled data access in environments requiring HIPAA, SOC 2, and privacy-conscious architecture.",
      "Built and maintained production AI systems handling sensitive patient data, with a focus on compliance and secure infrastructure.",
    ],
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

export const showcases = [
  {
    name: "SermonAI",
    line: "One workspace for biblical study, sermon preparation, and ministry.",
    image: "/portfolio/sermonai.jpg",
  },
  {
    name: "SIMZ",
    line: "Connected AI workflows for healthcare operations.",
    image: "/portfolio/simz.jpg",
  },
  {
    name: "Premier Agent Network",
    line: "A virtual real estate brokerage and business platform.",
    image: "/portfolio/premier-agent.jpg",
  },
  {
    name: "rTurner Consulting",
    line: "A GovCon growth platform for finding, qualifying, and winning work.",
    image: "/portfolio/rturner.jpg",
  },
  {
    name: "Assort Health",
    line: "An AI-powered patient access and engagement platform.",
    image: "/portfolio/assort-health.jpg",
  },
  {
    name: "Brisbane Gateway Resort",
    line: "A stay, groups, and booking site for the resort outside Brisbane.",
    image: "/portfolio/brisbane-gateway.jpg",
  },
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
