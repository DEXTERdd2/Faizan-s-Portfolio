"use client";

import { useEffect, useState } from "react";
import { formatClockTime, scrollToSection } from "@/lib/lumora";
import { useApp } from "./app-context";
import { ThemeToggle } from "./theme-toggle";
import { useMounted } from "@/hooks/use-mounted";
import { XIcon, LogoMark } from "./icons";

const items = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Work", id: "works" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Certifications", id: "certifications" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact", isContact: true },
];

export function NavMenu() {
  const { navOpen, closeNav, openModal } = useApp();
  const mounted = useMounted();
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!navOpen) return;
    const tick = () => setTime(formatClockTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeNav(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen, closeNav]);

  if (!navOpen) return null;

  const handleItem = (id: string, isContact?: boolean) => {
    closeNav();
    setTimeout(() => {
      if (isContact) openModal();
      else scrollToSection(id);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[115] flex flex-col bg-ink text-white">
      <div className="shell flex items-center justify-between py-5 sm:py-6">
        <span className="flex items-center gap-2 text-lg font-semibold">
          <LogoMark className="size-5 text-accent-from" />
          Faizan
        </span>
        <button
          type="button"
          onClick={closeNav}
          className="inline-flex items-center gap-2 rounded-control border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white/70 hover:border-white/40 hover:text-white"
        >
          <XIcon className="size-3.5" />
          Close
        </button>
      </div>

      <nav className="shell flex flex-1 flex-col justify-center">
        <ul className="flex flex-col gap-1">
          {items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleItem(item.id, item.isContact)}
                className="group flex w-full items-baseline gap-4 py-2 text-left text-4xl font-semibold tracking-tight sm:text-5xl"
                style={{
                  opacity: navOpen ? 1 : 0,
                  transform: navOpen ? "translateY(0)" : "translateY(1rem)",
                  transition: `all 0.5s ease-out ${i * 45 + 80}ms`,
                }}
              >
                <span className="text-base font-normal text-white/30 group-hover:text-accent-from">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-white/70 group-hover:text-white">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell flex flex-col gap-3 border-t border-white/10 py-6 text-xs uppercase tracking-wider text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <span suppressHydrationWarning>
          Local time — {mounted && time ? time : "—"}
        </span>
        <div className="flex items-center gap-3">
          <ThemeToggle heroMode />
          <button
            type="button"
            onClick={() => { closeNav(); setTimeout(openModal, 100); }}
            className="text-white/70 hover:text-white hover:underline"
          >
            Hire Me →
          </button>
        </div>
      </div>
    </div>
  );
}
