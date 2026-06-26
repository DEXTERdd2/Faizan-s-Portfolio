export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  logo?: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: SkillItem[];
  icon?: string;
}

export interface ProjectGalleryItem {
  src: string;
  label: string;
  subtitle: string;
  frameUrl?: string;
  isCover?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  role: string;
  duration: string;
  clientType: string;
  stats?: string;
  tagline?: string;
  gallery?: ProjectGalleryItem[];
  challenge?: string;
  solution?: string;
  results?: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface WhyChooseCard {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  content: string;
  avatar: string;
  rating: number;
  accent?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TechLogo {
  name: string;
  color: string;
}

export interface ClientLogo {
  name: string;
  abbr: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  badge: string;
  url?: string;
}
