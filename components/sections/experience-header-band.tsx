"use client";

import { useEffect, useState } from "react";
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
  const { count, ref } = useCountUp(value, 1600);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="exp-stat-inline"
    >
      <p className="text-xl font-semibold tabular-nums text-accent sm:text-2xl">
        {count}
        {suffix}
      </p>
      <p className="mt-0.5 text-[0.62rem] text-foreground/45">{label}</p>
    </motion.div>
  );
}

export function ExperienceHeaderBand() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveStep((s) => (s + 1) % CAREER_PATH.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="exp-header-band"
    >
      <div className="grid grid-cols-2 gap-px bg-line/60 sm:grid-cols-3 lg:grid-cols-6">
        {EXPERIENCE_STATS.map((s, i) => (
          <StatCounter key={s.label} {...s} index={i} />
        ))}
      </div>

      <div className="border-t border-line/60 px-4 py-4 sm:px-5">
        <p className="exp-panel-label mb-3">Career progression</p>
        <div className="relative flex items-start justify-between gap-1 overflow-x-auto pb-1 [scrollbar-width:none]">
          <div className="pointer-events-none absolute left-0 right-0 top-[11px] hidden h-px bg-line sm:block" />
          <motion.div
            className="pointer-events-none absolute left-0 top-[9px] hidden h-0.5 rounded-full bg-accent/70 sm:block"
            animate={{ width: `${((activeStep + 1) / CAREER_PATH.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {CAREER_PATH.map((step, i) => (
            <div
              key={step.title}
              className="relative z-10 flex min-w-[88px] flex-1 flex-col items-center gap-2 text-center"
            >
              <motion.span
                className={`size-3 rounded-full border-2 ${
                  i <= activeStep
                    ? "border-accent bg-accent shadow-[0_0_10px_var(--glow)]"
                    : "border-line bg-surface"
                }`}
                animate={i === activeStep ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, repeat: i === activeStep ? Infinity : 0, repeatDelay: 1 }}
              />
              <div>
                <p
                  className={`text-[0.62rem] font-medium leading-tight sm:text-xs ${
                    i === activeStep ? "text-accent" : "text-foreground/55"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[0.55rem] text-foreground/35">{step.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line/60 px-4 py-3 sm:px-5">
        {[
          { icon: "◈", text: "Senior Engineer · Team Lead" },
          { icon: "◉", text: "Open for freelance" },
          { icon: "◎", text: "AI · Cloud · Backend" },
          { icon: "{}", text: ".NET · React · Azure" },
        ].map((item, i) => (
          <motion.span
            key={item.text}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.05 }}
            whileHover={{ y: -1, borderColor: "rgba(207,128,71,0.35)" }}
            className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface/60 px-3 py-1.5 text-[0.65rem] text-foreground/55"
          >
            <span className="text-accent/80">{item.icon}</span>
            {item.text}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
