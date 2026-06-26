"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { heroStats } from "@/data/site-data";

const codeLines = [
  "const api = await fetch('/v1/orders');",
  "return res.status(200).json(data);",
  "await db.optimize({ index: true });",
];

const floatCards = [
  { title: "Backend Architecture", sub: "Microservices · CQRS", pos: "-left-4 top-[6%] xl:-left-8", delay: 1.1 },
  { title: "Cloud Deployment", sub: "Azure · CI/CD · Docker", pos: "-right-4 top-[6%] xl:-right-8", delay: 1.3 },
  { title: "Database Layer", sub: "SQL Server · PostgreSQL", pos: "-left-4 top-[28%] xl:-left-6", delay: 1.5 },
  { title: "AI Automation", sub: "OpenAI · RAG · Agents", pos: "-right-4 top-[28%] xl:-right-6", delay: 1.7 },
];

/** Widgets scoped to portrait column — never overlap name/social column */
export function HeroFloatingWidgets({ visible }: { visible: boolean }) {
  const [line, setLine] = useState(0);
  const [apiOk, setApiOk] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setLine((l) => (l + 1) % codeLines.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setApiOk((v) => !v), 4000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block">
      {floatCards.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: card.delay, duration: 0.6 },
            y: { delay: card.delay, duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className={`absolute w-36 rounded-2xl border border-white/10 bg-black/60 px-3 py-3 backdrop-blur-xl xl:w-40 ${card.pos}`}
        >
          <p className="text-[0.6rem] font-medium uppercase tracking-wider text-accent-from/80">
            {card.title}
          </p>
          <p className="mt-1 text-[0.7rem] leading-snug text-white/65">{card.sub}</p>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        className="absolute -right-2 bottom-[18%] w-36 rounded-2xl border border-white/10 bg-black/60 px-3 py-3 backdrop-blur-xl xl:-right-4 xl:w-40"
      >
        <p className="text-[0.6rem] font-medium uppercase tracking-wider text-white/45">
          Live API Status
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className={`size-2 shrink-0 rounded-pill ${apiOk ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`} />
          <span className="text-[0.7rem] font-medium text-white/85">{apiOk ? "Operational" : "Deploying…"}</span>
        </div>
        <p className="mt-1 font-mono text-[0.6rem] text-emerald-300/70">99.9% · 42ms avg</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute -left-2 bottom-[8%] w-44 rounded-2xl border border-emerald-500/20 bg-black/60 px-3 py-3 font-mono text-xs backdrop-blur-xl xl:-left-4 xl:w-48"
      >
        <p className="text-[0.6rem] uppercase tracking-wider text-accent-from">snippet.ts</p>
        <pre className="mt-1.5 overflow-hidden leading-relaxed">
          <motion.span
            key={line}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="code-glow block text-[0.65rem] text-emerald-300/90"
          >
            {codeLines[line]}
          </motion.span>
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="absolute -right-2 bottom-[4%] w-32 rounded-2xl border border-white/10 bg-black/60 px-3 py-3 backdrop-blur-xl xl:-right-4 xl:w-36"
      >
        <p className="text-[0.6rem] font-medium uppercase tracking-wider text-white/45">
          GitHub Activity
        </p>
        <div className="mt-1.5 flex gap-0.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="h-4 flex-1 rounded-sm"
              style={{
                backgroundColor:
                  i > 8 ? "#b15f2c" : i > 5 ? "rgba(177,95,44,.45)" : "rgba(255,255,255,.08)",
              }}
            />
          ))}
        </div>
        <p className="mt-1 text-[0.6rem] text-white/45">142 contributions</p>
      </motion.div>
    </div>
  );
}

export function HeroStatsStrip({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="relative z-20 grid grid-cols-2 gap-2 sm:grid-cols-3"
    >
      {heroStats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2.5 backdrop-blur-sm"
        >
          <p className="text-base font-semibold text-white sm:text-lg">
            {s.value}
            <span className="text-accent-from">{s.suffix}</span>
          </p>
          <p className="text-[0.65rem] text-white/45 sm:text-xs">{s.label}</p>
        </div>
      ))}
    </motion.div>
  );
}
