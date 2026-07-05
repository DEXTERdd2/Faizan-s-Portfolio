"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STAGES = [
  {
    id: "discover",
    title: "Discover",
    desc: "Requirements & scope",
    icon: "◈",
    accent: "border-white/12 bg-white/[0.04]",
    glow: "rgba(255,255,255,0.08)",
  },
  {
    id: "architecture",
    title: "System Architecture",
    desc: "Scalable cloud design",
    icon: "◎",
    accent: "border-violet-500/25 bg-violet-500/[0.08]",
    glow: "rgba(124,58,237,0.35)",
  },
  {
    id: "development",
    title: "Full Stack Development",
    desc: "APIs, UI & integration",
    icon: "{}",
    accent: "border-accent/30 bg-accent/10",
    glow: "rgba(207,128,71,0.4)",
  },
  {
    id: "scale",
    title: "Deploy & Scale",
    desc: "Enterprise-ready systems",
    icon: "↑",
    accent: "border-emerald-500/25 bg-emerald-500/[0.08]",
    glow: "rgba(52,211,153,0.3)",
  },
];

const CODE_SNIPPETS = [
  "dotnet new webapi -n CoreService",
  "builder.Services.AddDbContext<AppDb>();",
  "app.MapGet('/api/health', () => Results.Ok());",
  "az webapp deploy --resource-group prod",
];

export function CreateBandFlow() {
  const [active, setActive] = useState(0);
  const [codeLine, setCodeLine] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const id = setInterval(() => setActive((s) => (s + 1) % STAGES.length), 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCodeLine((n) => (n + 1) % CODE_SNIPPETS.length), 4200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const line = CODE_SNIPPETS[codeLine];
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [codeLine]);

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line/50 bg-surface/25 p-4 backdrop-blur-sm sm:p-5 lg:p-6">
      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(207,128,71,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(207,128,71,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      {/* Live code strip */}
      <div className="relative mb-5 flex items-center gap-3 rounded-xl border border-line/40 bg-surface/80 px-3 py-2.5 sm:px-4">
        <span className="flex shrink-0 gap-1">
          <span className="size-2 rounded-full bg-red-400/70" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-emerald-400/70" />
        </span>
        <span className="shrink-0 font-mono text-[0.55rem] text-accent/70 sm:text-xs">~/ship</span>
        <p className="min-w-0 truncate font-mono text-[0.58rem] text-foreground/55 sm:text-xs">
          <span className="text-violet-400/80">&gt;</span> {typed}
          <motion.span
            className="inline-block h-3 w-0.5 translate-y-0.5 bg-accent/70"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
          />
        </p>
        <motion.span
          className="ml-auto hidden shrink-0 items-center gap-1 rounded-pill border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[0.5rem] text-emerald-400 sm:inline-flex"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="size-1 rounded-full bg-emerald-400" />
          live
        </motion.span>
      </div>

      {/* Connection beam */}
      <div className="relative mb-4 hidden sm:block">
        <div className="absolute left-[6%] right-[6%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <motion.div
          className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(207,128,71,0.9)]"
          animate={{ left: ["5%", "35%", "62%", "88%"] }}
          transition={{ duration: 9.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      </div>

      {/* Stage cards — equal width, no arrow gap */}
      <div className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {STAGES.map((stage, i) => {
          const isActive = i === active;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              animate={
                isActive
                  ? {
                      boxShadow: [
                        `0 0 0 1px ${stage.glow}, 0 8px 32px rgba(0,0,0,0.25)`,
                        `0 0 0 1px ${stage.glow}, 0 12px 40px rgba(0,0,0,0.35)`,
                        `0 0 0 1px ${stage.glow}, 0 8px 32px rgba(0,0,0,0.25)`,
                      ],
                    }
                  : { boxShadow: "0 0 0 1px transparent, 0 4px 16px rgba(0,0,0,0.15)" }
              }
              className={`relative overflow-hidden rounded-2xl border p-3.5 transition-colors sm:p-4 ${
                isActive ? stage.accent : "border-line/50 bg-surface/30"
              }`}
            >
              {isActive && (
                <motion.span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                />
              )}
              <div className="relative flex items-start justify-between gap-2">
                <motion.span
                  className={`grid size-8 place-items-center rounded-xl text-sm ${
                    isActive ? "bg-white/10 text-accent" : "bg-white/[0.04] text-foreground/40"
                  }`}
                  animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ duration: 1.2, repeat: isActive ? Infinity : 0, repeatDelay: 0.5 }}
                >
                  {stage.icon}
                </motion.span>
                <span className="font-mono text-[0.58rem] text-foreground/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                className={`relative mt-3 text-sm font-semibold leading-tight sm:text-[0.9375rem] ${
                  isActive ? "text-foreground" : "text-foreground/65"
                }`}
              >
                {stage.title}
              </h3>
              <p className="relative mt-1 text-[0.62rem] leading-snug text-foreground/45 sm:text-xs">
                {stage.desc}
              </p>
              {isActive && (
                <motion.div
                  className="relative mt-3 h-0.5 overflow-hidden rounded-full bg-white/[0.06]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent-from to-accent-to"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom metric pulse row */}
      <div className="relative mt-4 grid grid-cols-3 gap-2 border-t border-line/30 pt-4 sm:grid-cols-3">
        {[
          { label: "Stack", value: ".NET · React · Azure" },
          { label: "Pattern", value: "Clean · CQRS · API-first" },
          { label: "Delivery", value: "Agile · CI/CD · Remote" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="rounded-xl border border-line/30 bg-surface/20 px-2.5 py-2 text-center sm:px-3"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
          >
            <p className="text-[0.5rem] uppercase tracking-wider text-foreground/30">{item.label}</p>
            <p className="mt-0.5 truncate text-[0.6rem] font-medium text-foreground/55 sm:text-xs">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
