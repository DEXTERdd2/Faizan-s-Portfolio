"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/theme-provider";
import { HoverSpring } from "./hover-spring";

export function ThemeToggle({ heroMode = false }: { heroMode?: boolean }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <HoverSpring scale={1.06}>
      <button
        type="button"
        onClick={toggleTheme}
        suppressHydrationWarning
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className={`grid size-10 place-items-center rounded-control border backdrop-blur-sm transition ${
          heroMode
            ? "border-white/20 bg-white/10 text-white/80 hover:bg-white/15"
            : "border-line bg-card text-foreground/70 hover:bg-surface-elevated"
        }`}
      >
        {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    </HoverSpring>
  );
}
