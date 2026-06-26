"use client";

import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import type { SocialLink } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="size-4" />,
  linkedin: <Linkedin className="size-4" />,
  mail: <Mail className="size-4" />,
  whatsapp: <MessageCircle className="size-4" />,
};

export function SocialIcon({ link, className = "" }: { link: SocialLink; className?: string }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={link.name}
    >
      {iconMap[link.icon] ?? link.name[0]}
    </a>
  );
}
