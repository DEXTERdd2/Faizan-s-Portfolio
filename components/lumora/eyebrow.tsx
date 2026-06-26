"use client";

import { type ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}

export function Eyebrow({ children, tone = "dark", className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium ${
        tone === "light" ? "text-white/70" : "text-foreground/70"
      } ${className}`}
    >
      <span
        className={`size-1.5 rounded-pill ${
          tone === "light" ? "card-surface" : "bg-foreground/50"
        }`}
      />
      {children}
    </span>
  );
}
