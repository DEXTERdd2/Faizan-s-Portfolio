"use client";

import { type ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";
import { HoverSpring } from "./hover-spring";

type Variant = "dark" | "light" | "outline";
type ArrowDir = "right" | "up-right" | "none";

interface PillButtonProps {
  children: ReactNode;
  variant?: Variant;
  arrow?: ArrowDir;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

const variants: Record<Variant, string> = {
  dark: "bg-ink text-white",
  light: "bg-surface text-foreground",
  outline: "border border-line bg-transparent text-foreground",
};

const badgeVariants: Record<Variant, string> = {
  dark: "bg-surface-elevated text-accent-from",
  light: "bg-ink text-white",
  outline: "bg-accent text-white",
};

export function PillButton({
  children,
  variant = "dark",
  arrow = "none",
  onClick,
  href,
  type = "button",
  disabled,
  className = "",
}: PillButtonProps) {
  const inner = (
    <span
      className={`inline-flex items-center gap-3 rounded-pill text-sm font-medium ${variants[variant]} ${
        arrow !== "none" ? "py-1.5 pl-6 pr-1.5" : "py-3.5 px-7"
      } ${className}`}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={`grid size-9 place-items-center rounded-pill text-base ${badgeVariants[variant]}`}
        >
          {arrow === "up-right" ? (
            <ArrowUpRight className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </span>
      )}
    </span>
  );

  const wrapped = <HoverSpring scale={1.04}>{inner}</HoverSpring>;

  if (href) {
    return (
      <a href={href} className="inline-block">
        {wrapped}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-block"
      suppressHydrationWarning
    >
      {wrapped}
    </button>
  );
}
