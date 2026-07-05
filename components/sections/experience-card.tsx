"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { achievementIcon, getExpMeta } from "@/components/sections/experience-meta";
import { HoverSpring } from "@/components/lumora/hover-spring";
import type { Experience } from "@/types";

type Tab = "achievements" | "stack" | "details";

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "muted";
}) {
  const tones = {
    default: "border-line bg-surface/60 text-foreground/60",
    accent: "border-accent/25 bg-accent/10 text-accent",
    muted: "border-line/60 bg-transparent text-foreground/45",
  };
  return (
    <span
      className={`inline-flex items-center rounded-pill border px-2 py-0.5 text-[0.58rem] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const meta = getExpMeta(exp);
  const [tab, setTab] = useState<Tab>("achievements");
  const [expanded, setExpanded] = useState(index === 0);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-10 sm:pl-12"
    >
      {/* Timeline node */}
      <motion.div
        className="absolute left-0 top-7 z-10 size-3.5 rounded-full border-2 border-accent bg-surface"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06, type: "spring", stiffness: 300 }}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-accent/50"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.25 }}
        />
      </motion.div>

      <article
        onMouseMove={onMove}
        className="exp-glass-card group relative w-full"
        style={
          {
            "--mouse-x": `${glow.x}%`,
            "--mouse-y": `${glow.y}%`,
          } as React.CSSProperties
        }
      >
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Left — identity */}
          <div className="lg:col-span-5">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-elevated text-sm font-bold text-accent">
                {exp.logo ?? exp.company.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap gap-1.5">
                  <Badge tone="accent">{exp.period}</Badge>
                  <Badge>{meta.employmentType}</Badge>
                  <Badge tone="muted">{exp.location}</Badge>
                </div>
                <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">{exp.company}</h3>
                <p className="mt-0.5 text-sm text-foreground/55">{exp.role}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {meta.industries.map((ind) => (
                <Badge key={ind}>{ind}</Badge>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">{exp.description}</p>
          </div>

          {/* Center — achievements */}
          <div className="lg:col-span-4">
            <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-wider text-foreground/38">
              Key impact
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {exp.achievements.slice(0, 4).map((a, i) => (
                <motion.div
                  key={a}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                  className="flex items-start gap-2 rounded-lg border border-line/50 bg-surface/40 px-2.5 py-2"
                >
                  <span className="text-[0.65rem] text-accent">{achievementIcon(a)}</span>
                  <span className="text-[0.68rem] leading-snug text-foreground/58">{a}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — stack & actions */}
          <div className="flex flex-col lg:col-span-3">
            <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-wider text-foreground/38">
              Technologies
            </p>
            <div className="flex flex-wrap gap-1.5 lg:flex-col lg:flex-wrap">
              {exp.technologies.slice(0, 8).map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ x: 2, borderColor: "rgba(207,128,71,0.4)" }}
                  className="w-fit rounded-md border border-line/70 bg-surface/50 px-2 py-0.5 text-[0.6rem] text-foreground/55 lg:w-full lg:text-center"
                >
                  {t}
                </motion.span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-4 lg:pt-6">
              <HoverSpring scale={1.03}>
                <a
                  href="#works"
                  className="rounded-pill border border-accent/30 bg-accent/10 px-3 py-1 text-[0.62rem] font-medium text-accent"
                >
                  Projects
                </a>
              </HoverSpring>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setExpanded((e) => !e)}
                className="rounded-pill border border-line px-3 py-1 text-[0.62rem] font-medium text-foreground/45 hover:text-accent"
              >
                {expanded ? "Less" : "More"}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable detail tabs */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-line/50 pt-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {(
                    [
                      ["achievements", "Achievements"],
                      ["stack", "Full Stack"],
                      ["details", "Details"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => setTab(id)}
                      className={`rounded-pill border px-2.5 py-0.5 text-[0.62rem] font-medium transition ${
                        tab === id
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-line text-foreground/40 hover:text-foreground/65"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {tab === "achievements" && (
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {exp.achievements.map((a) => (
                      <div key={a} className="flex gap-2 rounded-lg bg-accent/[0.06] px-3 py-2 text-xs text-foreground/60">
                        <span className="text-accent">{achievementIcon(a)}</span>
                        {a}
                      </div>
                    ))}
                  </div>
                )}
                {tab === "stack" && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((t) => (
                      <span key={t} className="rounded-pill border border-accent/20 bg-accent/5 px-2.5 py-0.5 text-xs text-accent">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {tab === "details" && (
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {exp.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2 text-sm text-foreground/58">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent/70" />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </motion.li>
  );
}
