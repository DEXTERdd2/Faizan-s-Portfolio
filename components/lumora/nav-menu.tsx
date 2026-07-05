"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatClockTime, scrollToSection } from "@/lib/lumora";
import { useApp } from "./app-context";
import { ThemeToggle } from "./theme-toggle";
import { useMounted } from "@/hooks/use-mounted";
import { useActiveSection } from "@/hooks/use-active-section";
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
  const activeSection = useActiveSection();
  const mounted = useMounted();
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!navOpen) return;
    document.body.style.overflow = "hidden";
    const tick = () => setTime(formatClockTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => {
      document.body.style.overflow = "";
      clearInterval(id);
    };
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeNav(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen, closeNav]);

  const handleItem = (id: string, isContact?: boolean) => {
    closeNav();
    setTimeout(() => {
      if (isContact) openModal();
      else scrollToSection(id);
    }, 100);
  };

  return (
    <AnimatePresence>
      {navOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeNav}
            className="fixed inset-0 z-[114] bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[115] flex w-full max-w-md flex-col border-l border-white/10 bg-ink/95 text-white shadow-2xl backdrop-blur-2xl backdrop-saturate-150 sm:max-w-lg"
          >
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

            <nav className="shell flex flex-1 flex-col justify-center overflow-y-auto pb-6">
              <ul className="flex flex-col gap-1">
                {items.map((item, i) => {
                  const active = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleItem(item.id, item.isContact)}
                        className={`group flex w-full items-baseline gap-3 py-2 text-left transition sm:gap-4 ${
                          active ? "text-white" : "text-white/65"
                        }`}
                      >
                        <span
                          className={`text-base font-normal transition ${
                            active ? "text-accent-from" : "text-white/30 group-hover:text-accent-from"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-semibold tracking-tight transition group-hover:text-white"
                          style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
                        >
                          {item.label}
                          {active && (
                            <span className="ml-2 inline-block size-2 rounded-pill bg-accent-from align-middle" aria-hidden />
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
