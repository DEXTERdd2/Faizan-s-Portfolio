import type {
  Experience,
  NavItem,
  Project,
  Service,
  SkillCategory,
  SocialLink,
  Stat,
  TechLogo,
  Testimonial,
  WhyChooseCard,
  ClientLogo,
  ProcessStep,
  Certification,
} from "@/types";

const sk = (name: string, level: number) => ({ name, level });

export const siteConfig = {
  name: "Faizan Shahid",
  title: "Senior Software Engineer | Full Stack Developer",
  description:
    "Senior Software Engineer with 5+ years of experience designing and developing scalable web applications. Expert in ASP.NET Core, React, Next.js, Azure, and enterprise-grade solutions.",
  url: "https://faizanshahid.dev",
  email: "faizanshahid751@gmail.com",
  phone: "03238546912",
  whatsapp: "+923238546912",
  calendlyUrl: "https://calendly.com",
  location: "Pakistan",
  resumeUrl: "/resume",
  ogImage: "/og-image.svg",
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/DEXTERdd2",
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/faizan-shahid-7471aa219/?skipRedirect=true",
    icon: "linkedin",
  },
  {
    name: "Email",
    href: "mailto:faizanshahid751@gmail.com",
    icon: "mail",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/923238546912",
    icon: "whatsapp",
  },
];

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const aboutHighlights = [
  { value: "5+", label: "Years" },
  { value: "50+", label: "Projects" },
  { value: "12+", label: "Countries" },
  { value: "100+", label: "APIs" },
];

export const devTips = [
  "Ship clean architecture, not shortcuts.",
  "Every API deserves documentation.",
  "Performance is a feature.",
  "AI augments engineers — it doesn't replace craft.",
];

export const heroTechBadges = [
  "ASP.NET Core",
  "React",
  "Next.js",
  "Azure",
  "Microservices",
  "SQL Server",
  "TypeScript",
  "Docker",
];

export const heroStats = [
  { value: "5", suffix: "+", label: "Years Experience" },
  { value: "50", suffix: "+", label: "Projects Delivered" },
  { value: "20", suffix: "+", label: "Clients" },
  { value: "12", suffix: "+", label: "Countries Served" },
  { value: "100", suffix: "+", label: "APIs Built" },
  { value: "142", suffix: "", label: "GitHub Contributions" },
  { value: "40", suffix: "+", label: "Technologies" },
  { value: "15", suffix: "+", label: "AI Automations" },
  { value: "200", suffix: "+", label: "Deployments" },
];

export const heroBadges = [
  { label: "Available for projects", tone: "green" as const },
  { label: "Open to work", tone: "accent" as const },
  { label: "Focus: Enterprise APIs & AI", tone: "neutral" as const },
];

export const heroBullets = [
  "Full Stack Developer",
  "ASP.NET Core Engineer",
  "Backend Architect",
];

export const heroSummary =
  "Senior Software Engineer with 5+ years building scalable web applications, cloud-native APIs, and AI-powered automation for international clients.";

export const heroBio =
  "Senior Software Engineer with 5+ years of experience designing and developing scalable web applications. I lead and mentor development teams, conduct code reviews, define project scope, and ensure on-time delivery using Agile (Scrum/Kanban) methodologies. Experienced in building secure, high-performance applications with ASP.NET Core, C#, RESTful APIs, Entity Framework Core, SQL Server, MySQL, and Dapper. Proficient in frontend development using React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, and Bootstrap. Skilled in deploying, monitoring, and optimizing cloud solutions on Microsoft Azure, including App Services, Azure SQL Database, Azure Storage, Azure DevOps, CI/CD pipelines, and Application Insights. Passionate about clean architecture, SOLID principles, performance optimization, and delivering reliable, business-driven software solutions.";

export const whyChooseCards = [
  { id: "1", title: "Fast Delivery", description: "Agile sprints with clear milestones and on-time releases." },
  { id: "2", title: "Clean Code", description: "Maintainable, tested, and documented codebases built to last." },
  { id: "3", title: "Enterprise Architecture", description: "Microservices, CQRS, and cloud-native patterns at scale." },
  { id: "4", title: "SEO Friendly", description: "Semantic markup and Core Web Vitals best practices." },
  { id: "5", title: "Scalable Systems", description: "Architecture that grows from MVP to millions of requests." },
  { id: "6", title: "Pixel Perfect", description: "Meticulous UI craft with responsive, accessible layouts." },
  { id: "7", title: "Long-term Support", description: "Ongoing maintenance, updates, and feature evolution." },
  { id: "8", title: "Excellent Communication", description: "Clear updates for international clients across time zones." },
  { id: "9", title: "Modern Technologies", description: "React, Next.js, ASP.NET Core, Azure, and AI tooling." },
  { id: "10", title: "AI Integration", description: "LLMs, RAG pipelines, agents, and workflow automation." },
  { id: "11", title: "Performance Optimized", description: "Profiling-driven improvements for speed and reliability." },
];

export const clientLogos = [
  { name: "Translation Empire", abbr: "TE" },
  { name: "Stackwise Tech", abbr: "ST" },
  { name: "BellMedex", abbr: "BM" },
  { name: "HealthFirst", abbr: "HF" },
  { name: "TechVentures", abbr: "TV" },
  { name: "GlobalTech", abbr: "GT" },
  { name: "StartupLabs", abbr: "SL" },
  { name: "Azure Partner", abbr: "AZ" },
];

export const experiences: Experience[] = [
  {
    id: "translation-empire",
    company: "Translation Empire",
    logo: "TE",
    role: "Senior ASP.NET Core Developer | Team Lead",
    period: "2022 — Present",
    location: "Remote",
    description:
      "Leading a team of developers building enterprise translation management platforms with real-time collaboration features.",
    responsibilities: [
      "Lead architecture decisions and code reviews for a distributed engineering team",
      "Design REST APIs and SignalR hubs for real-time collaboration",
      "Own Azure DevOps pipelines and production deployments",
    ],
    achievements: [
      "Architected microservices platform serving 50,000+ daily API requests",
      "Reduced deployment time by 60% through Azure DevOps CI/CD pipelines",
      "Led team of 5 developers delivering features 30% ahead of schedule",
      "Implemented SignalR real-time features improving user engagement by 40%",
    ],
    technologies: [
      "ASP.NET Core",
      "SignalR",
      "Azure",
      "SQL Server",
      "Entity Framework",
      "Docker",
    ],
  },
  {
    id: "dove-solutions",
    company: "Dove Solutions",
    logo: "DS",
    role: "Full Stack Software Developer (Part-Time)",
    period: "Mar 2025 — Sep 2025",
    location: "Remote",
    description:
      "Contributed to enterprise software development, backend architecture, and modern web applications while collaborating with cross-functional teams to deliver scalable business solutions.",
    responsibilities: [
      "Developed enterprise-grade applications using ASP.NET Core, React.js, and Next.js",
      "Designed scalable backend architectures and implemented secure REST APIs",
      "Built dynamic dashboards, admin portals, and business management systems",
      "Developed reusable frontend components with React and TypeScript",
      "Worked with SQL Server to design, optimize, and maintain relational databases",
      "Implemented authentication, authorization, and role-based access control",
      "Integrated third-party APIs, payment gateways, and cloud services",
      "Participated in application deployment, debugging, and performance optimization",
      "Collaborated closely with designers and stakeholders to deliver high-quality software",
    ],
    achievements: [
      "Delivered enterprise dashboards and admin portals on schedule with cross-functional teams",
      "Implemented RBAC and secure API layers for business management systems",
      "Optimized SQL Server schemas and queries for production workloads",
    ],
    technologies: [
      "ASP.NET Core",
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "SQL Server",
      "REST APIs",
      "Entity Framework Core",
      "Git",
      "GitHub",
      "Azure",
      "Docker",
      "Tailwind CSS",
      "Clean Architecture",
      "Microservices",
    ],
  },
  {
    id: "upwork-frontend",
    company: "Upwork",
    logo: "UW",
    role: "TypeScript Frontend Developer (Part-Time)",
    period: "Feb 2024 — Apr 2024",
    location: "Remote",
    description:
      "Specialized in modern TypeScript-based applications, building responsive interfaces, reusable components, and improving application performance for client projects.",
    responsibilities: [
      "Developed modern web applications using TypeScript, React.js, and Next.js",
      "Built reusable UI components following scalable component architecture",
      "Collaborated with backend developers to integrate RESTful APIs",
      "Optimized frontend performance through lazy loading, code splitting, and efficient rendering",
      "Improved user experience with responsive layouts and smooth animations",
      "Participated in bug fixing, feature enhancements, and application maintenance",
      "Ensured code quality using Git, code reviews, and best development practices",
    ],
    achievements: [
      "Shipped responsive React/Next.js interfaces with reusable component libraries",
      "Improved frontend performance via lazy loading and code splitting",
      "Integrated REST APIs with backend teams for seamless client delivery",
    ],
    technologies: [
      "TypeScript",
      "React.js",
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "REST APIs",
      "Git",
      "GitHub",
      "Responsive Design",
      "Performance Optimization",
    ],
  },
  {
    id: "fiverr-freelance",
    company: "Fiverr",
    logo: "FV",
    role: "Freelance Full Stack Software Developer",
    period: "Jan 2020 — Dec 2023",
    location: "Remote",
    description:
      "Delivered custom web applications, enterprise solutions, and business automation systems for clients across various industries. Managed the complete software development lifecycle, from requirements gathering and system architecture to deployment and post-launch maintenance.",
    responsibilities: [
      "Designed and developed scalable web applications using React.js, Next.js, Angular, ASP.NET Core MVC, and Razor Pages",
      "Built secure RESTful APIs and backend services using ASP.NET Core with authentication and third-party integrations",
      "Designed scalable system architectures following Clean Architecture, Repository Pattern, SOLID, and DI",
      "Developed responsive, SEO-friendly, and high-performance user interfaces with modern frontend frameworks",
      "Integrated payment gateways, email services, cloud storage, and external APIs for business applications",
      "Optimized SQL Server databases through query tuning, indexing, and efficient schema design",
      "Collaborated with international clients to understand business requirements and deliver tailored solutions",
      "Maintained code quality using Git version control, documentation, and modern development practices",
      "Delivered projects on time while maintaining high client satisfaction and long-term relationships",
    ],
    achievements: [
      "Completed full SDLC delivery for international clients across multiple industries",
      "Built enterprise solutions spanning React, Next.js, Angular, and ASP.NET Core stacks",
      "Maintained long-term client relationships through on-time delivery and post-launch support",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Angular",
      "ASP.NET Core MVC",
      "Razor Pages",
      "ASP.NET Core Web API",
      "C#",
      "JavaScript",
      "TypeScript",
      "SQL Server",
      "REST APIs",
      "Azure",
      "Git",
      "GitHub",
      "Bootstrap",
      "Tailwind CSS",
      "Microservices",
      "Clean Architecture",
    ],
  },
  {
    id: "stackwise",
    company: "Stackwise Technologies",
    logo: "ST",
    role: "ASP.NET Core Developer",
    period: "2020 — 2022",
    location: "Pakistan",
    description:
      "Developed scalable web applications and REST APIs for diverse client portfolios across healthcare and fintech sectors.",
    responsibilities: [
      "Built and maintained ASP.NET Core Web APIs for multiple clients",
      "Optimized SQL Server performance and database schemas",
      "Implemented authentication, authorization, and API documentation",
    ],
    achievements: [
      "Built 15+ REST APIs with comprehensive Swagger documentation",
      "Optimized database queries reducing response times by 45%",
      "Implemented JWT authentication and role-based authorization",
      "Migrated legacy systems to modern ASP.NET Core architecture",
    ],
    technologies: [
      "ASP.NET Core",
      "Web API",
      "SQL Server",
      "Angular",
      "Azure",
      "Git",
    ],
  },
  {
    id: "bellmedex",
    company: "BellMedex Pakistan",
    logo: "BM",
    role: "Software Engineer",
    period: "2019 — 2020",
    location: "Pakistan",
    description:
      "Contributed to healthcare EHR and practice management systems, focusing on backend services and database optimization.",
    responsibilities: [
      "Developed backend modules for patient and practice management",
      "Integrated third-party healthcare and insurance APIs",
      "Maintained production systems with high availability requirements",
    ],
    achievements: [
      "Developed patient management modules for EHR system",
      "Created automated reporting dashboards for medical practices",
      "Integrated third-party APIs for insurance verification",
      "Maintained 99.9% uptime for critical healthcare services",
    ],
    technologies: [
      "ASP.NET MVC",
      "SQL Server",
      "JavaScript",
      "Bootstrap",
      "IIS",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      sk("React.js", 95), sk("Next.js", 92), sk("Angular", 85), sk("ASP.NET Core MVC", 90),
      sk("Razor Pages", 88), sk("HTML5", 95), sk("CSS3", 92), sk("JavaScript", 94),
      sk("TypeScript", 93), sk("Tailwind CSS", 92), sk("Bootstrap", 88), sk("Material UI", 85),
      sk("Framer Motion", 88),
    ],
  },
  {
    name: "Backend",
    skills: [
      sk("ASP.NET Core", 96), sk("Node.js", 88), sk("Express.js", 85), sk("PHP", 82),
      sk("Laravel", 80), sk("Python", 86), sk("FastAPI", 84),
    ],
  },
  {
    name: "Databases",
    skills: [
      sk("SQL Server", 94), sk("PostgreSQL", 88), sk("MySQL", 86), sk("MongoDB", 82), sk("Firebase", 80),
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      sk("Azure", 90), sk("Docker", 85), sk("Git", 94), sk("GitHub", 93), sk("CI/CD", 88), sk("IIS", 86),
    ],
  },
  {
    name: "Architecture",
    skills: [
      sk("REST APIs", 96), sk("Microservices", 90), sk("Clean Architecture", 92), sk("Repository Pattern", 91),
      sk("Dependency Injection", 93), sk("SOLID Principles", 92), sk("CQRS", 85), sk("JWT Authentication", 90),
    ],
  },
  {
    name: "AI & Automation",
    skills: [
      sk("OpenAI", 88), sk("Claude AI", 86), sk("ChatGPT", 90), sk("Google Gemini", 82),
      sk("n8n", 85), sk("LangChain", 80), sk("CrewAI", 78), sk("MCP", 84),
      sk("AI Agents", 86), sk("RAG", 85), sk("Vector Databases", 82), sk("Prompt Engineering", 90),
      sk("AI Workflow Automation", 88), sk("Custom AI Chatbots", 87), sk("LLM Applications", 86),
      sk("Automation Pipelines", 89), sk("Webhooks", 92),
    ],
  },
];

export const processSteps: ProcessStep[] = [
  { id: "1", title: "Discovery", description: "Understanding goals, users, constraints, and success metrics." },
  { id: "2", title: "Planning", description: "Architecture, milestones, tech stack, and delivery roadmap." },
  { id: "3", title: "Design", description: "UX flows, wireframes, API contracts, and system diagrams." },
  { id: "4", title: "Development", description: "Iterative sprints with clean code and continuous integration." },
  { id: "5", title: "Testing", description: "Unit, integration, and performance testing before release." },
  { id: "6", title: "Deployment", description: "Azure CI/CD pipelines with zero-downtime deployments." },
  { id: "7", title: "Maintenance", description: "Monitoring, optimization, and long-term feature support." },
];

export const certifications: Certification[] = [
  { id: "1", title: "Microsoft Azure Fundamentals", issuer: "Microsoft", year: "2023", badge: "AZ", url: "https://learn.microsoft.com" },
  { id: "2", title: "ASP.NET Core Web Development", issuer: "Microsoft Learn", year: "2022", badge: "NET", url: "https://learn.microsoft.com" },
  { id: "3", title: "REST API Design & Development", issuer: "Professional", year: "2021", badge: "API" },
  { id: "4", title: "SQL Server Database Administration", issuer: "Microsoft", year: "2021", badge: "SQL", url: "https://learn.microsoft.com" },
  { id: "5", title: "Docker & Containerization", issuer: "Docker", year: "2022", badge: "DK", url: "https://docker.com" },
  { id: "6", title: "AI & LLM Application Development", issuer: "Self-Certified", year: "2024", badge: "AI" },
];

export const projects: Project[] = [
  {
    id: "pearly-ecommerce",
    title: "Pearly — Full-Stack Luxury E-Commerce & CMS Platform",
    category: "E-Commerce",
    tagline:
      "A production-style luxury e-commerce platform with a Shopify-inspired admin, headless CMS, and a polished customer storefront.",
    description:
      "Pearly is a full-stack e-commerce web application built for a luxury handmade jewelry and accessories brand. It combines a high-end customer storefront with an enterprise-grade admin dashboard and content management system, so store owners can run products, orders, marketing, and site content without touching code.",
    gallery: [
      {
        variant: "cover",
        label: "Pearly Platform",
        subtitle: "Luxury storefront + enterprise admin in one stack",
        isCover: true,
      },
      {
        variant: "dashboard",
        label: "Admin Dashboard & CMS",
        subtitle: "Store operations, content, and team management",
        frameUrl: "pearly.store/admin",
      },
      {
        variant: "products",
        label: "Product Catalog",
        subtitle: "Create, edit, bulk actions, CSV import/export",
        frameUrl: "pearly.store/admin/products",
      },
      {
        variant: "media",
        label: "CMS Media Library",
        subtitle: "Homepage, blog, banners, and asset management",
        frameUrl: "pearly.store/admin/media",
      },
    ],
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "NextAuth v5",
      "Stripe",
      "Framer Motion",
      "Recharts",
    ],
    features: [
      "20+ admin modules — commerce, content, growth & system",
      "Role-based access (Admin / Manager / Customer Support)",
      "CMS-driven homepage, blog, banners & static pages",
      "Product bulk ops, CSV import/export & inventory tracking",
      "Full storefront: cart, checkout, wishlist & compare",
      "Customer account portal with orders, profile & support",
    ],
    role: "Full Stack Developer",
    duration: "Enterprise build",
    clientType: "Luxury Retail · Handmade Jewelry",
    stats: "20+ admin modules",
    challenge:
      "Luxury artisan brand needed a premium storefront and Shopify-grade admin without enterprise SaaS licensing costs.",
    solution:
      "Next.js 15 full-stack platform with headless CMS, RBAC admin panel, Stripe checkout, and CMS-driven content — no code deploys for site updates.",
    results:
      "Unified store operations: products, orders, marketing, support tickets, and content managed from one dashboard.",
    featured: true,
    liveUrl: "#",
    githubUrl: "https://github.com/DEXTERdd2",
  },
  {
    id: "healthcare-ehr",
    title: "Healthcare EHR & Practice Management",
    category: "Healthcare",
    description:
      "Comprehensive electronic health records and practice management system for medical facilities with patient scheduling, billing, and clinical documentation.",
    previewVariant: "patients",
    technologies: ["ASP.NET Core", "MVC", "SQL Server", "Azure"],
    features: [
      "Patient Management",
      "Clinical Documentation",
      "Billing Integration",
      "HIPAA Compliance",
    ],
    role: "Lead Backend Developer",
    duration: "8 months",
    clientType: "Healthcare · International",
    stats: "50k+ records managed",
    challenge: "Legacy healthcare workflows with fragmented patient data.",
    solution: "Unified EHR platform with HIPAA-compliant ASP.NET Core backend.",
    results: "50k+ records managed with 99.9% uptime across facilities.",
    liveUrl: "#",
    githubUrl: "https://github.com/DEXTERdd2",
  },
  {
    id: "translation-platform",
    title: "Translation Management Platform",
    category: "Enterprise",
    description:
      "Real-time translation management platform with collaborative workflows, project tracking, and automated quality assurance processes.",
    previewVariant: "projects",
    technologies: ["ASP.NET Core", "SignalR", "Azure", "Microservices"],
    features: [
      "Real-time Collaboration",
      "Project Management",
      "Quality Assurance",
      "Analytics Dashboard",
    ],
    role: "Senior Full Stack Developer",
    duration: "12 months",
    clientType: "Enterprise · Remote",
    stats: "50k+ daily API requests",
    challenge: "Scaling real-time collaboration for global translation teams.",
    solution: "Microservices architecture with SignalR hubs and Azure deployment.",
    results: "50k+ daily requests, 60% faster deployments, 40% engagement lift.",
    liveUrl: "#",
    githubUrl: "https://github.com/DEXTERdd2",
  },
  {
    id: "cv-parser-ai",
    title: "CV Parser AI Platform",
    category: "AI",
    description:
      "Intelligent CV parsing platform leveraging OpenAI and FastAPI to extract structured data from resumes with high accuracy.",
    previewVariant: "candidates",
    technologies: ["ASP.NET Core", "OpenAI", "FastAPI"],
    features: [
      "AI-Powered Parsing",
      "Bulk Processing",
      "ATS Integration",
      "Custom Templates",
    ],
    role: "Backend Architect",
    duration: "6 months",
    clientType: "SaaS · Startup",
    stats: "95% parsing accuracy",
    challenge: "Manual CV screening bottleneck for high-volume hiring.",
    solution: "OpenAI + FastAPI pipeline with structured extraction and bulk processing.",
    results: "95% parsing accuracy with ATS-ready structured output.",
    liveUrl: "#",
    githubUrl: "https://github.com/DEXTERdd2",
  },
  {
    id: "twilio-platform",
    title: "Twilio Communication Platform",
    category: "Business",
    description:
      "Multi-channel communication platform integrating Voice, SMS, and WhatsApp for enterprise customer engagement.",
    previewVariant: "messages",
    technologies: ["ASP.NET Core", "Twilio", "SignalR", "Azure"],
    features: [
      "Voice Integration",
      "SMS Campaigns",
      "WhatsApp Business",
      "Analytics",
    ],
    role: "Integration Engineer",
    duration: "5 months",
    clientType: "SaaS · International",
    stats: "1M+ messages/month",
    challenge: "Fragmented communication channels across voice, SMS, and WhatsApp.",
    solution: "Unified Twilio integration layer with SignalR real-time delivery.",
    results: "1M+ messages/month with enterprise-grade reliability.",
    liveUrl: "#",
    githubUrl: "https://github.com/DEXTERdd2",
  },
  {
    id: "ride-management",
    title: "Ride Management System",
    category: "Business",
    description:
      "GPS-enabled ride management system with real-time tracking, route optimization, and driver management capabilities.",
    previewVariant: "drivers",
    technologies: ["ASP.NET Core", "GPS", "Maps API", "REST APIs"],
    features: [
      "Real-time Tracking",
      "Route Optimization",
      "Driver Management",
      "Payment Integration",
    ],
    role: "Full Stack Developer",
    duration: "7 months",
    clientType: "Transportation · B2B",
    stats: "Real-time GPS fleet tracking",
    challenge: "Manual dispatch and no real-time fleet visibility.",
    solution: "GPS-enabled platform with route optimization and driver APIs.",
    results: "Live fleet tracking with optimized routes and payment integration.",
    liveUrl: "#",
    githubUrl: "https://github.com/DEXTERdd2",
  },
  {
    id: "gaming-backend",
    title: "Gaming Backend Services",
    category: "Admin Panels",
    description:
      "High-performance gaming backend with real-time APIs, player authentication, leaderboards, and matchmaking services.",
    previewVariant: "players",
    technologies: ["ASP.NET Core", "SignalR", "Redis", "SQL Server"],
    features: [
      "Real-time Multiplayer",
      "Leaderboards",
      "Matchmaking",
      "Anti-cheat System",
    ],
    role: "Backend Developer",
    duration: "9 months",
    clientType: "Gaming · Startup",
    stats: "10k+ concurrent players",
    challenge: "Latency and cheat vulnerabilities in multiplayer sessions.",
    solution: "SignalR real-time layer with Redis caching and anti-cheat modules.",
    results: "10k+ concurrent players with sub-100ms matchmaking.",
    liveUrl: "#",
    githubUrl: "https://github.com/DEXTERdd2",
  },
  {
    id: "enterprise-erp",
    title: "Enterprise ERP System",
    category: "ERP",
    description:
      "Full-featured ERP solution with inventory management, billing, accounting, and comprehensive reporting modules.",
    previewVariant: "inventory",
    technologies: ["ASP.NET Core", "SQL Server", "Azure", "Angular"],
    features: [
      "Inventory Management",
      "Billing & Invoicing",
      "Financial Reports",
      "Multi-tenant",
    ],
    role: "Lead Developer",
    duration: "14 months",
    clientType: "Enterprise · Multi-tenant",
    stats: "200+ business modules",
    challenge: "Siloed business units with disconnected inventory and billing.",
    solution: "Multi-tenant ERP with modular ASP.NET Core microservices.",
    results: "200+ modules unified with real-time financial reporting.",
    liveUrl: "#",
    githubUrl: "https://github.com/DEXTERdd2",
  },
  {
    id: "travel-tour",
    title: "Travel & Tour Management",
    category: "E-Commerce",
    description:
      "Complete travel agency management system with booking, payments, itinerary planning, and customer relationship management.",
    previewVariant: "bookings",
    technologies: ["ASP.NET Core", "Payment Gateway", "SQL Server"],
    features: [
      "Online Booking",
      "Payment Processing",
      "Itinerary Builder",
      "CRM Integration",
    ],
    role: "Full Stack Developer",
    duration: "6 months",
    clientType: "Travel · SME",
    stats: "5k+ bookings processed",
    challenge: "Manual booking workflows and disconnected payment systems.",
    solution: "Integrated booking engine with payment gateway and CRM modules.",
    results: "5k+ bookings with automated itinerary and payment processing.",
    liveUrl: "#",
    githubUrl: "https://github.com/DEXTERdd2",
  },
];

export const services: Service[] = [
  { id: "fullstack", title: "Full Stack Development", description: "End-to-end product engineering from database to polished UI.", icon: "layers" },
  { id: "frontend", title: "Frontend Development", description: "React, Next.js, and premium interfaces with flawless UX.", icon: "layers" },
  { id: "backend", title: "Backend Development", description: "ASP.NET Core APIs and services built for scale.", icon: "server" },
  { id: "api", title: "API Development", description: "Versioned REST APIs with Swagger, tests, and documentation.", icon: "api" },
  { id: "enterprise", title: "Enterprise Software", description: "Large-scale systems for complex business workflows.", icon: "building" },
  { id: "cloud", title: "Cloud Solutions", description: "Azure architecture, deployment, and DevOps automation.", icon: "cloud" },
  { id: "database", title: "Database Design", description: "Schema design, optimization, and migration strategies.", icon: "database" },
  { id: "performance", title: "Performance Optimization", description: "Profiling, caching, and bottleneck elimination.", icon: "zap" },
  { id: "consulting", title: "Technical Consulting", description: "Architecture decisions, code reviews, and team mentoring.", icon: "consulting" },
  { id: "ai-auto", title: "AI Automation", description: "LLM-powered workflows, agents, and intelligent pipelines.", icon: "api" },
  { id: "workflow", title: "Workflow Automation", description: "n8n, webhooks, and business process automation.", icon: "plug" },
  { id: "chatbots", title: "AI Chatbots", description: "Custom GPT chatbots with RAG and enterprise integrations.", icon: "layers" },
  { id: "biz-auto", title: "Business Automation", description: "End-to-end automation for ops, sales, and support teams.", icon: "building" },
];

export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Clients" },
  { value: 12, suffix: "+", label: "Countries Served" },
  { value: 100, suffix: "+", label: "APIs Built" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 142, suffix: "", label: "GitHub Contributions" },
  { value: 40, suffix: "+", label: "Technologies" },
  { value: 15, suffix: "+", label: "AI Automations" },
  { value: 200, suffix: "+", label: "Deployments" },
];

export const featuredProject = projects.find((p) => p.featured) ?? projects[1];

export const projectCategories = [
  "All",
  "Enterprise",
  "Healthcare",
  "Business",
  "AI",
  "Automation",
  "ERP",
  "CRM",
  "Landing Pages",
  "E-Commerce",
  "Admin Panels",
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "CTO",
    company: "TechVentures Inc.",
    country: "United States",
    content:
      "Faizan delivered an exceptional translation platform that exceeded our expectations. His expertise in ASP.NET Core and attention to architectural details made our project a huge success.",
    avatar: "SM",
    rating: 5,
    accent: "from-violet-500 to-purple-700",
  },
  {
    id: "2",
    name: "James Rodriguez",
    role: "Product Manager",
    company: "HealthFirst Solutions",
    country: "United Kingdom",
    content:
      "Working with Faizan on our EHR system was transformative. He understood our complex healthcare requirements and delivered a robust, scalable solution on time and within budget.",
    avatar: "JR",
    rating: 5,
    accent: "from-emerald-500 to-teal-700",
  },
  {
    id: "3",
    name: "Emily Chen",
    role: "Founder",
    company: "StartupLabs",
    country: "Canada",
    content:
      "Faizan's technical consulting helped us make critical architecture decisions that saved us months of development time. His microservices expertise is truly world-class.",
    avatar: "EC",
    rating: 5,
    accent: "from-sky-500 to-blue-700",
  },
  {
    id: "4",
    name: "Michael Thompson",
    role: "Engineering Director",
    company: "GlobalTech Corp",
    country: "Germany",
    content:
      "The API platform Faizan built handles millions of requests daily with zero downtime. His performance optimization skills and clean code practices are outstanding.",
    avatar: "MT",
    rating: 5,
    accent: "from-orange-500 to-amber-700",
  },
];

export const techLogos: TechLogo[] = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "Angular", color: "#DD0031" },
  { name: "Node.js", color: "#339933" },
  { name: ".NET", color: "#512BD4" },
  { name: "Azure", color: "#0078D4" },
  { name: "Docker", color: "#2496ED" },
  { name: "SQL Server", color: "#CC2927" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "FastAPI", color: "#009688" },
  { name: "PHP", color: "#777BB4" },
  { name: "TypeScript", color: "#3178C6" },
];

