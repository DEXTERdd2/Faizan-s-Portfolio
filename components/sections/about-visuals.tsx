"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROCESS = ["Discover", "Architect", "Build", "Ship"];

const REGIONS = ["USA", "UK", "UAE", "PK", "AU", "CA"];

const STACK = [
  { label: "Frontend", items: "React · Next.js" },
  { label: "Backend", items: "ASP.NET Core" },
  { label: "Data", items: "SQL · Redis" },
  { label: "Cloud", items: "Azure · Docker" },
];

const SIGNALS = [
  "Enterprise APIs · production-ready",
  "Remote delivery · 12+ countries",
  "Clean architecture · scalable systems",
];

function Panel({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`about-panel group ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Left-column bento: process + reach + stack in one cohesive block */
export function AboutShowcase() {
  const [step, setStep] = useState(0);
  const [signal, setSignal] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % PROCESS.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSignal((s) => (s + 1) % SIGNALS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {/* Process — horizontal minimal timeline */}
      <Panel className="sm:col-span-2" delay={0.05}>
        <p className="about-label">How I work</p>
        <div className="mt-4 flex items-start gap-2 sm:gap-3">
          {PROCESS.map((label, i) => (
            <div key={label} className="relative flex flex-1 flex-col gap-2">
              <div className="relative h-0.5 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent/70"
                  animate={{ width: i <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span
                className={`text-center text-[0.65rem] font-medium transition-colors duration-500 ${
                  i === step ? "text-accent" : i < step ? "text-foreground/55" : "text-foreground/30"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      {/* Global reach — elegant dot row */}
      <Panel delay={0.1}>
        <p className="about-label">Global reach</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {REGIONS.map((r, i) => (
            <motion.span
              key={r}
              className="about-chip"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.05 }}
              whileHover={{ y: -1 }}
            >
              <span className="size-1 rounded-full bg-accent/80" />
              {r}
            </motion.span>
          ))}
        </div>
        <p className="mt-3 text-xs text-foreground/45">Serving clients across time zones</p>
      </Panel>

      {/* Stack — clean list */}
      <Panel delay={0.15}>
        <p className="about-label">Core stack</p>
        <ul className="mt-3 space-y-2.5">
          {STACK.map((row, i) => (
            <li key={row.label} className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-medium text-foreground/70">{row.label}</span>
              <span className="text-foreground/40">{row.items}</span>
            </li>
          ))}
        </ul>
      </Panel>

      {/* Signal line — replaces busy live ticker */}
      <Panel className="sm:col-span-2" delay={0.2}>
        <div className="flex items-center gap-3">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute size-full animate-pulse rounded-full bg-emerald-500/40" />
            <span className="relative size-2 rounded-full bg-emerald-500" />
          </span>
          <div className="min-h-[1.125rem] flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={signal}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="text-xs text-foreground/55"
              >
                {SIGNALS[signal]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/** Subtle tech strip — slow, understated */
export function AboutTechStrip() {
  const items = ["ASP.NET Core", "Azure", "React", "OpenAI", "Microservices", "Docker"];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line/60 py-4"
    >
      <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-foreground/35">
        Focus
      </span>
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className="text-sm text-foreground/50 transition-colors hover:text-accent"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}
