"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";

function SkillCard({ name, level }: { name: string; level: number }) {
  const [hover, setHover] = useState(false);

  return (
    <HoverSpring scale={1.02}>
      <div
        className="rounded-2xl border border-line/80 card-surface p-4 backdrop-blur-sm transition hover:border-accent/25"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-sm font-medium text-foreground/85">{name}</span>
          <span className="font-mono text-xs font-semibold text-accent">{level}%</span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-pill bg-surface">
          <motion.div
            className="h-full rounded-pill bg-gradient-to-r from-accent-from to-accent"
            initial={{ width: 0 }}
            animate={{ width: hover ? `${level}%` : `${Math.max(level - 15, 40)}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </HoverSpring>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const active = skillCategories[activeCategory];
  const isAI = active.name === "AI & Automation";

  return (
    <section id="skills" className="relative section-bg">
      <div className="shell section-spacing">
        <div className="mb-8 text-center">
          <Reveal><Eyebrow className="rounded-pill border border-line px-4 py-1.5">Tech Stack</Eyebrow></Reveal>
          <LineReveal
            delay={120}
            requireIntro={false}
            className="mx-auto mt-4 w-fit text-4xl font-semibold tracking-tight sm:text-5xl"
            lines={["Technical Arsenal"]}
          />
          <Reveal delay={200} className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-foreground/60">
            Enterprise-grade engineering across frontend, backend, cloud, architecture, and AI automation.
          </Reveal>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {skillCategories.map((category, index) => (
            <button
              type="button"
              suppressHydrationWarning
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`rounded-pill px-4 py-2 text-sm font-medium transition sm:px-5 sm:py-2.5 ${
                activeCategory === index
                  ? "bg-gradient-to-r from-accent-from to-accent text-white shadow-[0_0_16px_rgba(177,95,44,0.3)]"
                  : "border border-line bg-surface text-foreground/60 hover:text-foreground"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <Reveal key={activeCategory} y={20}>
          <div
            className={`mx-auto max-w-5xl rounded-[1.75rem] border p-6 backdrop-blur-sm sm:p-10 ${
              isAI
                ? "border-accent/25 bg-gradient-to-br from-accent/10 via-surface-elevated to-surface shadow-[0_0_40px_rgba(177,95,44,0.08)]"
                : "border-line card-surface"
            }`}
          >
            {isAI && (
              <p className="mb-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">
                AI & Automation · Premium Capability
              </p>
            )}
            <h3 className="mb-6 text-center text-2xl font-semibold">{active.name}</h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {active.skills.map((skill) => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {skillCategories.map((category, i) => (
            <Reveal key={category.name} delay={i * 60} y={16}>
              <div className="rounded-2xl border border-line card-surface p-3 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-accent">{category.skills.length}</div>
                <div className="mt-1 text-xs text-foreground/50">{category.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
