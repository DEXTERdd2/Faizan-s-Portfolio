import type { Experience } from "@/types";

export const EXPERIENCE_STATS = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "+", label: "APIs Developed" },
  { value: 20, suffix: "+", label: "Happy Clients" },
  { value: 15, suffix: "+", label: "Enterprise Apps" },
  { value: 10, suffix: "+", label: "Cloud Deployments" },
];

export const CAREER_PATH = [
  { title: "Freelance Developer", period: "2020" },
  { title: "Software Engineer", period: "2019" },
  { title: "ASP.NET Core Developer", period: "2020" },
  { title: "Senior ASP.NET Core Developer", period: "2022" },
  { title: "Technical Team Lead", period: "Present" },
];

export const EXP_META: Record<
  string,
  {
    employmentType: string;
    industries: string[];
    domains: string[];
    website?: string;
  }
> = {
  "translation-empire": {
    employmentType: "Full-time",
    industries: ["Enterprise", "SaaS", "Communication"],
    domains: ["Translation", "Collaboration"],
  },
  "dove-solutions": {
    employmentType: "Part-time",
    industries: ["Enterprise", "SaaS"],
    domains: ["Business Systems", "Admin Portals"],
  },
  "upwork-frontend": {
    employmentType: "Contract",
    industries: ["SaaS", "FinTech"],
    domains: ["Frontend", "Client Projects"],
  },
  "fiverr-freelance": {
    employmentType: "Freelance",
    industries: ["Enterprise", "Healthcare", "FinTech", "Education"],
    domains: ["Full Stack", "Automation"],
  },
  stackwise: {
    employmentType: "Full-time",
    industries: ["Healthcare", "FinTech", "Enterprise"],
    domains: ["REST APIs", "Client Portfolios"],
  },
  bellmedex: {
    employmentType: "Full-time",
    industries: ["Healthcare", "Enterprise"],
    domains: ["EHR", "Practice Management"],
  },
};

const ACHIEVEMENT_ICONS: [RegExp, string][] = [
  [/lead|team|mentor/i, "◆"],
  [/api|rest|swagger/i, "⬡"],
  [/microservice|architecture|clean/i, "◎"],
  [/sql|database|query|schema/i, "▣"],
  [/azure|cloud|deploy|ci\/cd|devops/i, "↑"],
  [/signalr|real.?time|websocket/i, "◉"],
  [/performance|optim|uptime|speed/i, "⚡"],
  [/jwt|auth|rbac|security/i, "◇"],
  [/client|deliver|ship/i, "✓"],
];

export function achievementIcon(text: string) {
  for (const [re, icon] of ACHIEVEMENT_ICONS) {
    if (re.test(text)) return icon;
  }
  return "✦";
}

export function getExpMeta(exp: Experience) {
  return (
    EXP_META[exp.id] ?? {
      employmentType: "Professional",
      industries: ["Enterprise"],
      domains: ["Software Development"],
    }
  );
}
