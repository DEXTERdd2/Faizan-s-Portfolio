"use client";

import { useEffect, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedMetric } from "@/components/sections/hero-animated-metric";
import { useBreakpoint } from "@/hooks/use-breakpoint";

type Accent = "violet" | "blue" | "cyan" | "emerald" | "pink";

function svgId(base: string, uid: string) {
  return `${base}-${uid.replace(/:/g, "")}`;
}

function OrbitCard({
  label,
  accent = "violet",
  children,
  icon,
  entranceDelay = 0,
}: {
  label: string;
  accent?: Accent;
  children: React.ReactNode;
  icon: React.ReactNode;
  entranceDelay?: number;
}) {
  const { reduceMotion } = useBreakpoint();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.9, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 110, damping: 18, delay: entranceDelay }}
      whileHover={reduceMotion ? {} : { scale: 1.045, y: -3 }}
      className={`hero-orbit-card hero-orbit-accent-${accent}`}
    >
      <div className="hero-orbit-card-inner">
        <div className="hero-orbit-card-shine" aria-hidden />
        <div className="hero-orbit-widget-scanline" aria-hidden />
        <span className="hero-orbit-corner hero-orbit-corner-tl" aria-hidden />
        <span className="hero-orbit-corner hero-orbit-corner-br" aria-hidden />

        <div className="relative mb-2 flex items-center gap-2">
          <motion.span
            className="hero-orbit-icon"
            animate={
              reduceMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 0 rgba(124,58,237,0)",
                      "0 0 14px rgba(124,58,237,0.45)",
                      "0 0 0 rgba(124,58,237,0)",
                    ],
                  }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.span>
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/42">
            {label}
          </span>
          <motion.span
            className="ml-auto size-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 10px rgba(52,211,153,0.85)" }}
          />
        </div>
        <div className="relative z-[1]">{children}</div>
      </div>
    </motion.div>
  );
}

function TypingCommand({ commands, intervalMs = 4200 }: { commands: string[]; intervalMs?: number }) {
  const [cmdIdx, setCmdIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const id = setInterval(() => setCmdIdx((c) => (c + 1) % commands.length), intervalMs);
    return () => clearInterval(id);
  }, [commands.length, intervalMs]);

  useEffect(() => {
    const line = commands[cmdIdx];
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [cmdIdx, commands]);

  return (
    <p className="mb-2 flex min-h-[1rem] items-center truncate font-mono text-[0.54rem] text-emerald-300/70">
      <span className="mr-1 text-violet-400/80">$</span>
      {typed}
      <motion.span
        className="ml-0.5 inline-block h-3 w-0.5 bg-emerald-400/80"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.75, repeat: Infinity }}
      />
    </p>
  );
}

function LiveSparkline({ bars = 14, color = "cyan" }: { bars?: number; color?: "cyan" | "violet" | "pink" }) {
  const uid = useId();
  const gradId = svgId(`spark-${color}`, uid);
  const fills = {
    cyan: ["#34d399", "#22d3ee"],
    violet: ["#a78bfa", "#60a5fa"],
    pink: ["#f472b6", "#c084fc"],
  };
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <svg viewBox={`0 0 ${bars * 6} 18`} className="mt-1.5 h-3.5 w-full" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={fills[color][0]} />
          <stop offset="100%" stopColor={fills[color][1]} />
        </linearGradient>
      </defs>
      {Array.from({ length: bars }).map((_, i) => {
        const h = 4 + ((i * 5 + tick * 3) % 12);
        return (
          <motion.rect
            key={`${i}-${tick}`}
            x={i * 6}
            y={18 - h}
            width={4}
            height={h}
            rx={1}
            fill={`url(#${gradId})`}
            initial={{ opacity: 0.35 }}
            animate={{ opacity: [0.35, 1, 0.45] }}
            transition={{ duration: 1.2, delay: i * 0.05, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </svg>
  );
}

/* ─── Pipeline ─── */
const pipelineStages = [
  { id: "code", label: "Code", icon: "◈" },
  { id: "build", label: "Build", icon: "⚙" },
  { id: "test", label: "Test", icon: "✓" },
  { id: "ship", label: "Ship", icon: "↑" },
];

const pipelineCmds = [
  "git pull origin main",
  "dotnet build -c Release",
  "docker compose up -d",
  "az webapp deploy --slot production",
];

export function HeroTerminalPanel() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % pipelineStages.length), 1800);
    return () => clearInterval(id);
  }, []);

  const progress = (stage + 1) / pipelineStages.length;

  return (
    <OrbitCard label="Pipeline" accent="violet" icon="⤳" entranceDelay={0.05}>
      <TypingCommand commands={pipelineCmds} />
      <div className="relative flex items-center justify-between">
        {pipelineStages.map((s, i) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-1">
            <motion.div
              className={`grid size-6 place-items-center rounded-lg text-[0.55rem] ${
                i <= stage
                  ? "bg-gradient-to-br from-violet-600/80 to-indigo-600/60 text-white shadow-[0_0_14px_rgba(124,58,237,0.5)]"
                  : "border border-white/[0.08] bg-white/[0.03] text-white/25"
              }`}
              animate={
                i === stage
                  ? { scale: [1, 1.12, 1], boxShadow: ["0 0 8px rgba(124,58,237,0.3)", "0 0 18px rgba(124,58,237,0.65)", "0 0 8px rgba(124,58,237,0.3)"] }
                  : i < stage
                    ? { scale: 1 }
                    : {}
              }
              transition={{ duration: 0.7, repeat: i === stage ? Infinity : 0, repeatDelay: 0.5 }}
            >
              {s.icon}
            </motion.div>
            <span className={`text-[0.46rem] ${i <= stage ? "text-white/60" : "text-white/22"}`}>
              {s.label}
            </span>
          </div>
        ))}
        <div className="absolute left-[10%] right-[10%] top-[12px] h-px overflow-hidden rounded-full bg-white/[0.06]" aria-hidden>
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <motion.div
          className="absolute top-[9px] size-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"
          animate={{ left: `${8 + stage * 25}%` }}
          transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />
      </div>
    </OrbitCard>
  );
}

/* ─── API Health ─── */
export function HeroApiPanel() {
  const uid = useId();
  const ringGradId = svgId("api-ring-grad", uid);
  const [m, setM] = useState({ success: 99.97, latency: 118, rps: 412, cpu: 31, mem: 58 });

  useEffect(() => {
    const id = setInterval(() => {
      setM({
        success: 99.94 + Math.random() * 0.05,
        latency: 105 + Math.floor(Math.random() * 30),
        rps: 380 + Math.floor(Math.random() * 90),
        cpu: 26 + Math.floor(Math.random() * 18),
        mem: 52 + Math.floor(Math.random() * 14),
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const pct = Math.min(m.success, 100);
  const circumference = 2 * Math.PI * 18;

  return (
    <OrbitCard label="API Health" accent="emerald" icon="◉" entranceDelay={0.08}>
      <div className="flex items-center gap-3">
        <div className="relative size-11 shrink-0">
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ["0 0 0 rgba(52,211,153,0)", "0 0 16px rgba(52,211,153,0.35)", "0 0 0 rgba(52,211,153,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <svg viewBox="0 0 44 44" className="relative size-full -rotate-90">
            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <motion.circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke={`url(#${ringGradId})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: circumference * (1 - pct / 100) }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
            />
            <defs>
              <linearGradient id={ringGradId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[0.52rem] font-bold text-emerald-300">
            <AnimatedMetric value={m.success} decimals={1} suffix="%" />
          </span>
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          {[
            { label: "Latency", value: m.latency, suffix: "ms" },
            { label: "Throughput", value: m.rps, suffix: "/s" },
            { label: "CPU", value: m.cpu, suffix: "%" },
            { label: "RAM", value: m.mem, suffix: "%" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-2 text-[0.52rem]">
              <span className="text-white/35">{row.label}</span>
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-8 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    animate={{ width: `${Math.min(row.value, 100)}%` }}
                    transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="w-10 text-right font-mono text-white/65">
                  <AnimatedMetric value={row.value} suffix={row.suffix} />
                </span>
              </div>
            </div>
          ))}
          <LiveSparkline color="cyan" />
        </div>
      </div>
    </OrbitCard>
  );
}

/* ─── Data Layer ─── */
const dataRows = [
  { table: "Users", action: "SELECT", count: "1.2k", ms: 11 },
  { table: "Orders", action: "JOIN", count: "856", ms: 17 },
  { table: "Products", action: "UPDATE", count: "42", ms: 7 },
  { table: "Logs", action: "INSERT", count: "1", ms: 3 },
];

export function HeroDatabasePanel() {
  const [ri, setRi] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRi((n) => (n + 1) % dataRows.length), 2400);
    return () => clearInterval(id);
  }, []);

  const row = dataRows[ri];

  return (
    <OrbitCard label="Data Layer" accent="cyan" icon="⬡" entranceDelay={0.18}>
      <AnimatePresence mode="wait">
        <motion.div
          key={ri}
          initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 8, filter: "blur(4px)" }}
          transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1.5"
        >
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-8 bg-gradient-to-r from-cyan-400/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <div className="relative flex items-center gap-2">
            <motion.span
              className="rounded-md bg-cyan-500/15 px-1.5 py-0.5 font-mono text-[0.48rem] text-cyan-300"
              animate={{ boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 10px rgba(34,211,238,0.5)", "0 0 0 rgba(34,211,238,0)"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {row.action}
            </motion.span>
            <span className="truncate font-mono text-[0.54rem] text-white/55">{row.table}</span>
            <span className="ml-auto shrink-0 font-mono text-[0.48rem] text-emerald-400/80">
              {row.ms}ms
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-2 flex gap-1">
        {["SQL", "Redis", "PG"].map((db, i) => (
          <motion.span
            key={db}
            className={`flex-1 rounded-md py-1 text-center text-[0.46rem] ${
              i === ri % 3 ? "text-cyan-300" : "text-white/38"
            }`}
            animate={{
              backgroundColor:
                i === ri % 3
                  ? ["rgba(34,211,238,0.1)", "rgba(34,211,238,0.22)", "rgba(34,211,238,0.1)"]
                  : "rgba(255,255,255,0.02)",
              scale: i === ri % 3 ? [1, 1.04, 1] : 1,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {db}
          </motion.span>
        ))}
      </div>
      <LiveSparkline bars={10} color="cyan" />
    </OrbitCard>
  );
}

/* ─── Activity ─── */
export function HeroGitHubPanel() {
  const events = [
    { tag: "merge", text: "PR #42 → main" },
    { tag: "commit", text: "feat: auth middleware" },
    { tag: "deploy", text: "v2.4 → production" },
  ];
  const [ei, setEi] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setEi((n) => (n + 1) % events.length), 2800);
    return () => clearInterval(id);
  }, [events.length]);

  const tagColors: Record<string, string> = {
    merge: "text-emerald-400 bg-emerald-500/12 border-emerald-500/25",
    commit: "text-violet-300 bg-violet-500/12 border-violet-500/25",
    deploy: "text-sky-300 bg-sky-500/12 border-sky-500/25",
  };

  return (
    <OrbitCard label="Activity" accent="blue" icon="⎇" entranceDelay={0.14}>
      <AnimatePresence mode="wait">
        <motion.div
          key={ei}
          initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2"
        >
          <motion.span
            className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[0.46rem] font-medium uppercase ${tagColors[events[ei].tag]}`}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 0.6 }}
          >
            {events[ei].tag}
          </motion.span>
          <span className="truncate font-mono text-[0.54rem] text-white/58">{events[ei].text}</span>
        </motion.div>
      </AnimatePresence>
      <div className="mt-2.5 flex items-end gap-[3px]">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            animate={{
              height: [4 + ((i * 5 + ei) % 9), 6 + ((i * 7 + ei * 2) % 12), 4 + ((i * 5 + ei) % 9)],
              opacity: [0.45, 1, 0.45],
            }}
            transition={{ duration: 1.8, delay: i * 0.05, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                i > 11
                  ? "linear-gradient(to top, #7C3AED, #60a5fa)"
                  : i > 5
                    ? "rgba(124,58,237,0.4)"
                    : "rgba(255,255,255,0.06)",
            }}
          />
        ))}
      </div>
    </OrbitCard>
  );
}

/* ─── Deploy ─── */
const launchSteps = ["Build", "Test", "Deploy", "Live"];

export function HeroDeployPanel() {
  const uid = useId();
  const deployGradId = svgId("deploy-grad", uid);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (launchSteps.length + 1)), 1400);
    return () => clearInterval(id);
  }, []);

  const active = Math.min(step, launchSteps.length - 1);
  const done = step >= launchSteps.length;
  const ringCirc = 2 * Math.PI * 16;

  return (
    <OrbitCard label="Deploy" accent="pink" icon="↑" entranceDelay={0.24}>
      <div className="flex items-center justify-center gap-3 py-1">
        <div className="relative size-10">
          {done && (
            <motion.span
              className="absolute inset-0 rounded-full border border-emerald-400/40"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            />
          )}
          <svg viewBox="0 0 40 40" className="size-full -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
            <motion.circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke={`url(#${deployGradId})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={ringCirc}
              animate={{
                strokeDashoffset: ringCirc * (1 - (done ? 1 : (active + 1) / launchSteps.length)),
              }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            />
            <defs>
              <linearGradient id={deployGradId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <motion.span
            className="absolute inset-0 grid place-items-center text-[0.65rem]"
            animate={done ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.8, repeat: done ? Infinity : 0 }}
          >
            {done ? "✓" : active + 1}
          </motion.span>
        </div>
        <div className="space-y-1">
          {launchSteps.map((s, i) => (
            <motion.div
              key={s}
              className="flex items-center gap-1.5 text-[0.48rem]"
              animate={{ opacity: i <= active || done ? 1 : 0.25, x: i === active && !done ? [0, 2, 0] : 0 }}
              transition={{ duration: 0.5, repeat: i === active && !done ? Infinity : 0, repeatDelay: 0.8 }}
            >
              <motion.span
                className={`size-1 rounded-full ${i <= active || done ? "bg-pink-400" : "bg-white/20"}`}
                animate={
                  i === active && !done
                    ? { boxShadow: ["0 0 0 rgba(236,72,153,0)", "0 0 8px rgba(236,72,153,0.9)", "0 0 0 rgba(236,72,153,0)"] }
                    : {}
                }
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className={i <= active || done ? "text-white/60" : "text-white/22"}>{s}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </OrbitCard>
  );
}

/* ─── Architecture ─── */
const archLayers = [
  { name: "Gateway", w: "100%" },
  { name: "Services", w: "82%" },
  { name: "Data", w: "64%" },
];

export function HeroBackendPanel() {
  return (
    <OrbitCard label="Architecture" accent="violet" icon="◎" entranceDelay={0.12}>
      <div className="space-y-1.5">
        {archLayers.map((layer, i) => (
          <div key={layer.name} className="relative flex items-center gap-2">
            <motion.div
              className="relative h-5 overflow-hidden rounded-md border border-violet-500/20 bg-gradient-to-r from-violet-600/25 to-indigo-600/10"
              style={{ width: layer.w }}
              animate={{
                borderColor: ["rgba(124,58,237,0.2)", "rgba(124,58,237,0.6)", "rgba(124,58,237,0.2)"],
              }}
              transition={{ duration: 2.8, delay: i * 0.35, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-y-0 w-6 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
                animate={{ left: ["-20%", "120%"] }}
                transition={{ duration: 1.8, delay: i * 0.4, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute right-1 top-1/2 size-1 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
              />
            </motion.div>
            <span className="shrink-0 text-[0.46rem] text-white/32">{layer.name}</span>
            {i < archLayers.length - 1 && (
              <motion.span
                className="pointer-events-none absolute left-[18%] top-[calc(100%+2px)] h-1.5 w-px bg-violet-400/30"
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {["API", "Auth", "Orders", "Events"].map((s, i) => (
          <motion.span
            key={s}
            className="rounded-md border border-white/[0.06] bg-white/[0.02] px-1.5 py-0.5 text-[0.44rem] text-white/40"
            animate={{
              borderColor: ["rgba(255,255,255,0.06)", "rgba(124,58,237,0.35)", "rgba(255,255,255,0.06)"],
              color: ["rgba(255,255,255,0.4)", "rgba(255,255,255,0.65)", "rgba(255,255,255,0.4)"],
            }}
            transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </OrbitCard>
  );
}

/* ─── Code beams ─── */
const codeLines = [
  { lang: "C#", code: "return Results.Ok(payload);", color: "from-sky-400 to-cyan-300" },
  { lang: "TS", code: "export async function handler()", color: "from-violet-400 to-fuchsia-300" },
  { lang: "SQL", code: "SELECT Id FROM Users WHERE Active", color: "from-emerald-400 to-teal-300" },
];

function CodeBeam({ variant }: { variant: 0 | 1 }) {
  const lines = variant === 0 ? codeLines.slice(0, 2) : codeLines.slice(1);
  const [li, setLi] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const id = setInterval(() => setLi((n) => (n + 1) % lines.length), 3800);
    return () => clearInterval(id);
  }, [lines.length]);

  useEffect(() => {
    const line = lines[li].code;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(line.slice(0, i));
      if (i >= line.length) clearInterval(id);
    }, 34);
    return () => clearInterval(id);
  }, [li, lines]);

  const current = lines[li];

  return (
    <OrbitCard
      label={variant === 0 ? "Backend" : "Frontend"}
      accent={variant === 0 ? "blue" : "cyan"}
      icon="{}"
      entranceDelay={variant === 0 ? 0.2 : 0.22}
    >
      <div className="relative overflow-hidden rounded-md border border-white/[0.05] bg-black/20 px-2 py-1.5">
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="relative flex items-start gap-2">
          <motion.span
            className="mt-0.5 shrink-0 rounded-md bg-white/[0.05] px-1.5 py-0.5 font-mono text-[0.46rem] text-white/35"
            animate={{ color: ["rgba(255,255,255,0.35)", "rgba(167,139,250,0.9)", "rgba(255,255,255,0.35)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {current.lang}
          </motion.span>
          <p className={`min-h-[2rem] bg-gradient-to-r ${current.color} bg-clip-text font-mono text-[0.54rem] leading-relaxed text-transparent`}>
            {typed}
            <motion.span
              className="inline-block h-3 w-0.5 translate-y-0.5 bg-cyan-400/80"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            />
          </p>
        </div>
      </div>
      <LiveSparkline bars={8} color={variant === 0 ? "violet" : "cyan"} />
    </OrbitCard>
  );
}

export function HeroCodePanel() {
  return <CodeBeam variant={0} />;
}

export function HeroCodePanelB() {
  return <CodeBeam variant={1} />;
}

/* ─── AI Engine ─── */
const aiSignals = [
  "Claude · GPT-4 · Gemini",
  "RAG · Vector search",
  "n8n workflow active",
  "AI agent orchestration",
  "Prompt engine · 38ms",
  "Knowledge base indexed",
];

const NEURAL_LINKS = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [4, 5],
  [2, 5],
  [1, 4],
];

export function HeroAiPanel() {
  const uid = useId();
  const neuralGradId = svgId("neural-node", uid);
  const [si, setSi] = useState(0);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSi((n) => (n + 1) % aiSignals.length), 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => p + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const nodes = [
    { x: 8, y: 6 },
    { x: 22, y: 4 },
    { x: 36, y: 8 },
    { x: 6, y: 20 },
    { x: 22, y: 18 },
    { x: 38, y: 22 },
  ];

  return (
    <OrbitCard label="AI Engine" accent="pink" icon="✦" entranceDelay={0.26}>
      <div className="flex items-center gap-3">
        <div className="relative size-11 shrink-0">
          <svg viewBox="0 0 44 28" className="size-full" aria-hidden>
            {NEURAL_LINKS.map(([a, b], i) => (
              <motion.line
                key={`${a}-${b}`}
                x1={nodes[a].x}
                y1={nodes[a].y}
                x2={nodes[b].x}
                y2={nodes[b].y}
                stroke="rgba(168,85,247,0.35)"
                strokeWidth="0.6"
                animate={{ opacity: [0.15, 0.65, 0.15] }}
                transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
              />
            ))}
            {nodes.map((n, i) => (
              <motion.circle
                key={i}
                cx={n.x}
                cy={n.y}
                r="1.8"
                fill={`url(#${neuralGradId})`}
                animate={{
                  r: [1.5, 2.2, 1.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 1.8, delay: (i + (pulse % 6)) * 0.08, repeat: Infinity }}
              />
            ))}
            <defs>
              <radialGradient id={neuralGradId}>
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={si}
            initial={{ opacity: 0, x: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -6 }}
            className="text-[0.52rem] leading-snug text-white/55"
          >
            {aiSignals[si]}
          </motion.p>
        </AnimatePresence>
      </div>
      <LiveSparkline bars={12} color="pink" />
    </OrbitCard>
  );
}

export function HeroTechChip({ label, index = 0 }: { label: string; index?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.3 + index * 0.04 }}
      whileHover={{ scale: 1.06, y: -2 }}
      className="hero-orbit-chip hero-orbit-chip-live cursor-default"
    >
      {label}
    </motion.span>
  );
}
