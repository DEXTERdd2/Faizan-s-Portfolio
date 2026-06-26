"use client";

import { useEffect, useState } from "react";
import { formatClockDate, formatClockTime, scrollToSection } from "@/lib/lumora";
import { useApp } from "./app-context";
import { GridIcon, LogoMark } from "./icons";
import { HoverSpring } from "./hover-spring";
import { ThemeToggle } from "./theme-toggle";
import { useActiveSection, useScrolled } from "@/hooks/use-active-section";

const navItems = [
  { label: "About", shortLabel: "About", id: "about" },
  { label: "Skills", shortLabel: "Skills", id: "skills" },
  { label: "Experience", shortLabel: "Exp.", id: "experience" },
  { label: "Services", shortLabel: "Services", id: "services" },
  { label: "Process", shortLabel: "Process", id: "process" },
  { label: "Work", shortLabel: "Work", id: "works" },
];

export function Header() {
  const { introReady, openNav, openModal } = useApp();
  const activeSection = useActiveSection();
  const scrolled = useScrolled(40);
  const heroMode = !scrolled;
  const [time, setTime] = useState("9:41am");
  const [date, setDate] = useState("12 March, 2025");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(formatClockTime(now));
      setDate(formatClockDate(now));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleNav = (id: string) => scrollToSection(id);

  const pillClass = heroMode
    ? "border-white/12 bg-white/[0.06] backdrop-blur-md"
    : "border-line bg-surface/90 backdrop-blur-md";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 isolate transition-all duration-300 ${
        heroMode
          ? "border-b border-white/5 bg-[#020617]/50 backdrop-blur-lg"
          : "border-b border-line bg-[#0a0f18]/95 shadow-lg shadow-black/25 backdrop-blur-xl"
      }`}
      style={{
        opacity: introReady ? 1 : 0,
        transform: introReady ? "translateY(0)" : "translateY(-14px)",
        pointerEvents: introReady ? "auto" : "none",
        transition:
          "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 150ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) 150ms, background 0.3s, box-shadow 0.3s, border-color 0.3s",
      }}
    >
      <div className="shell py-3 sm:py-3.5">
        <div className="grid grid-cols-[auto_1fr] items-center gap-3 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] lg:gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            suppressHydrationWarning
            className={`flex shrink-0 items-center gap-2 text-base font-semibold tracking-tight sm:text-lg ${
              heroMode ? "text-white" : "text-foreground"
            }`}
          >
            <HoverSpring scale={1.04}>
              <span className="flex items-center gap-2">
                <LogoMark className={`size-5 ${heroMode ? "text-accent-from" : "text-accent"}`} />
                Faizan
              </span>
            </HoverSpring>
          </button>

          {/* Center nav — grid column, never absolute */}
          <nav className="hidden min-w-0 lg:block lg:justify-self-center">
            <ul className={`flex max-w-full gap-0.5 rounded-pill border px-1 py-1 ${pillClass}`}>
              {navItems.map((item) => {
                const active = activeSection === item.id;
                return (
                  <li key={item.id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => handleNav(item.id)}
                      suppressHydrationWarning
                      className={`relative whitespace-nowrap rounded-pill px-2.5 py-1.5 text-[0.7rem] font-medium transition xl:px-3 xl:text-xs 2xl:px-3.5 2xl:text-sm ${
                        heroMode
                          ? active
                            ? "text-white"
                            : "text-white/55 hover:text-white"
                          : active
                            ? "text-foreground"
                            : "text-foreground/50 hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <span
                          className={`absolute inset-0 rounded-pill ${
                            heroMode ? "bg-white/10" : "bg-surface-elevated"
                          }`}
                        />
                      )}
                      <span className="relative xl:hidden">{item.shortLabel}</span>
                      <span className="relative hidden xl:inline">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right actions */}
          <div className="col-start-2 flex items-center justify-end gap-2 sm:gap-2.5 lg:col-start-3 lg:justify-self-end">
            {/* Clock — only on wide screens, compact pill */}
            <div
              className={`hidden shrink-0 flex-col rounded-pill border px-3 py-1.5 leading-none 2xl:flex ${pillClass}`}
              suppressHydrationWarning
            >
              <span
                className={`font-mono text-[0.65rem] tabular-nums ${
                  heroMode ? "text-white/90" : "text-foreground"
                }`}
              >
                {time}
              </span>
              <span
                className={`mt-0.5 text-[0.6rem] ${
                  heroMode ? "text-white/45" : "text-foreground/45"
                }`}
              >
                {date}
              </span>
            </div>

            <div className={`hidden h-6 w-px shrink-0 2xl:block ${heroMode ? "bg-white/15" : "bg-line"}`} />

            <ThemeToggle heroMode={heroMode} />

            <button
              type="button"
              onClick={openModal}
              suppressHydrationWarning
              className={`hidden shrink-0 rounded-pill px-4 py-2 text-xs font-semibold text-white transition hover:scale-[1.03] sm:inline-flex sm:text-sm ${
                heroMode
                  ? "bg-gradient-to-r from-[#7c3aed] via-[#b15f2c] to-[#db2777] shadow-md shadow-purple-900/25"
                  : "bg-gradient-to-r from-accent-from to-accent shadow-md shadow-accent/20"
              }`}
            >
              Contact Me
            </button>

            <button
              type="button"
              onClick={openNav}
              suppressHydrationWarning
              className={`shrink-0 rounded-pill border backdrop-blur-sm transition ${pillClass} ${
                heroMode ? "hover:bg-white/10" : "hover:bg-surface-elevated"
              }`}
            >
              <HoverSpring scale={1.05}>
                <span
                  className={`flex items-center gap-1.5 px-3 py-2 text-[0.65rem] font-medium uppercase tracking-wider sm:px-3.5 sm:text-xs ${
                    heroMode ? "text-white/80" : "text-foreground"
                  }`}
                >
                  <GridIcon className="size-3.5" />
                  <span className="hidden sm:inline">Menu</span>
                </span>
              </HoverSpring>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
