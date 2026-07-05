"use client";

import { motion } from "framer-motion";
import { CAREER_PATH, EXPERIENCE_STATS } from "@/components/sections/experience-meta";
import { useCountUp } from "@/hooks/use-mouse";

function StatCounter({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const { count, ref } = useCountUp(value, 1800);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="exp-stat-pill"
    >
      <p className="text-lg font-semibold text-accent">
        {count}
        {suffix}
      </p>
      <p className="mt-0.5 text-[0.6rem] leading-snug text-foreground/45">{label}</p>
    </motion.div>
  );
}

function SidebarWidget({
  label,
  value,
  icon,
  delay = 0,
}: {
  label: string;
  value: string;
  icon: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45 }}
      whileHover={{ y: -2, borderColor: "rgba(207,128,71,0.3)" }}
      className="exp-widget"
    >
      <span className="exp-widget-icon">{icon}</span>
      <div>
        <p className="text-[0.6rem] uppercase tracking-wider text-foreground/38">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-foreground/75">{value}</p>
      </div>
    </motion.div>
  );
}

export function ExperienceSidebar() {
  return (
    <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-1">
      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="exp-panel"
      >
        <p className="exp-panel-label">Impact at a glance</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {EXPERIENCE_STATS.map((s, i) => (
            <StatCounter key={s.label} {...s} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Career progression */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
        className="exp-panel"
      >
        <p className="exp-panel-label">Career progression</p>
        <ol className="mt-4 space-y-0">
          {CAREER_PATH.map((step, i) => (
            <li key={step.title} className="relative flex gap-3 pb-4 last:pb-0">
              {i < CAREER_PATH.length - 1 && (
                <span className="absolute left-[7px] top-5 h-[calc(100%-4px)] w-px bg-gradient-to-b from-accent/50 to-line" />
              )}
              <motion.span
                className={`relative z-10 mt-0.5 size-3.5 shrink-0 rounded-full border-2 ${
                  i === CAREER_PATH.length - 1
                    ? "border-accent bg-accent shadow-[0_0_12px_var(--glow)]"
                    : "border-accent/40 bg-surface"
                }`}
                animate={i === CAREER_PATH.length - 1 ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div>
                <p className="text-sm font-medium text-foreground/80">{step.title}</p>
                <p className="text-[0.65rem] text-foreground/40">{step.period}</p>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Floating widgets */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <SidebarWidget label="Current role" value="Senior Engineer · Team Lead" icon="◈" delay={0.1} />
        <SidebarWidget label="Availability" value="Open for freelance & contracts" icon="◉" delay={0.14} />
        <SidebarWidget label="Tech focus" value="AI · Cloud · Backend Systems" icon="◎" delay={0.18} />
        <SidebarWidget label="Latest stack" value="ASP.NET Core · React · Azure" icon="{}" delay={0.22} />
      </div>
    </aside>
  );
}
