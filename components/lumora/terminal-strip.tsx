"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  { cmd: "npm run build", out: "✓ compiled successfully", tone: "emerald" as const },
  { cmd: "dotnet test", out: "142 passed · 0 failed", tone: "emerald" as const },
  { cmd: "git push origin main", out: "deployed to Azure", tone: "sky" as const },
  { cmd: "npx prisma migrate", out: "database synced", tone: "emerald" as const },
  { cmd: "curl /api/health", out: "200 OK · 42ms", tone: "emerald" as const },
];

const toneClass = {
  emerald: "text-emerald-400/90",
  sky: "text-sky-400/90",
  amber: "text-amber-400/90",
};

export function TerminalStrip() {
  const [line, setLine] = useState(0);
  const [cursor, setCursor] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLine((l) => (l + 1) % lines.length);
      setProgress(0);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setProgress(0);
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 100 : p + 4)), 80);
    return () => clearInterval(id);
  }, [line]);

  const current = lines[line];
  const prev = lines[(line - 1 + lines.length) % lines.length];

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-accent/20 via-transparent to-purple-500/20 opacity-60 blur-sm" />
      <div className="relative overflow-hidden rounded-2xl border border-line/80 bg-[#0a0e16]/95 font-mono text-xs shadow-xl shadow-black/30 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 border-b border-line/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-pill bg-red-400/90 shadow-[0_0_6px_rgba(248,113,113,0.5)]" />
            <span className="size-2 rounded-pill bg-amber-400/90 shadow-[0_0_6px_rgba(251,191,36,0.4)]" />
            <span className="size-2 rounded-pill bg-emerald-400/90 shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
            <span className="ml-1 hidden text-[0.65rem] uppercase tracking-wider text-foreground/35 sm:inline">
              faizan@dev — portfolio
            </span>
          </div>
          <span className="rounded-pill border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[0.6rem] text-emerald-400/90">
            ● live
          </span>
        </div>

        <div className="space-y-1 px-4 py-3">
          <p className="text-[0.65rem] text-foreground/25">
            $ {prev.cmd}{" "}
            <span className={toneClass[prev.tone]}>— {prev.out}</span>
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              className="flex flex-wrap items-center gap-x-1 gap-y-0.5"
            >
              <span className="text-accent-from/90">$</span>
              <span className="text-foreground/80">{current.cmd}</span>
              <span className="text-foreground/30">—</span>
              <span className={`code-glow ${toneClass[current.tone]}`}>{current.out}</span>
              <span className={`inline-block w-2 ${cursor ? "opacity-100" : "opacity-0"}`}>▋</span>
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="border-t border-line/40 px-4 py-2">
          <div className="flex items-center justify-between text-[0.6rem] text-foreground/30">
            <span>running pipeline…</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-pill bg-white/5">
            <motion.div
              className="h-full rounded-pill bg-gradient-to-r from-accent-from to-accent"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
