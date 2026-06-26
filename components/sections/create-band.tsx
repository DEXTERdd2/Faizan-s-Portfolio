"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "@/components/lumora/icons";
import { Reveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { TerminalStrip } from "@/components/lumora/terminal-strip";
import { devTips, heroStats } from "@/data/site-data";

const steps = [
  {
    id: "ideate",
    label: "Ideate",
    sub: "Architecture & scope",
    variant: "light" as const,
  },
  {
    id: "build",
    label: "Build",
    sub: "Clean, tested code",
    variant: "accent" as const,
  },
  {
    id: "arrow",
    label: "arrow",
    sub: "",
    variant: "dark" as const,
  },
  {
    id: "scale",
    label: "Scale",
    sub: "Enterprise-ready",
    variant: "ghost" as const,
  },
];

const styles = {
  light:
    "border border-line bg-surface-elevated/80 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
  accent:
    "border border-accent/40 bg-gradient-to-br from-accent-from to-accent-to text-white shadow-[0_0_32px_rgba(177,95,44,0.35)]",
  dark: "border border-white/10 bg-ink text-white",
  ghost: "border border-line/60 bg-surface/30 text-foreground/50",
};

const metrics = heroStats.slice(0, 4);

function PipelineConnector() {
  return (
    <svg
      className="pointer-events-none absolute left-[8%] right-[8%] top-1/2 hidden h-px w-[84%] -translate-y-1/2 sm:block"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.line
        x1="0%"
        y1="0"
        x2="100%"
        y2="0"
        stroke="url(#pipe-gradient)"
        strokeWidth="1"
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <defs>
        <linearGradient id="pipe-gradient" x1="0%" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="rgba(207,128,71,0.1)" />
          <stop offset="50%" stopColor="rgba(207,128,71,0.6)" />
          <stop offset="100%" stopColor="rgba(207,128,71,0.1)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CreateBand() {
  const [tipIndex, setTipIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTipIndex((i) => (i + 1) % devTips.length), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveStep((s) => (s + 1) % 3), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden section-bg border-y border-line/60">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 size-64 rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 size-56 rounded-full bg-purple-600/8 blur-[90px]" />
      </div>

      <div className="shell relative py-10 lg:py-14">
        <Reveal y={16}>
          <TerminalStrip />
        </Reveal>

        {/* Pipeline: Ideate → Build → Scale */}
        <div className="relative mt-8 sm:mt-10">
          <PipelineConnector />
          <ul className="relative grid grid-cols-2 gap-3 sm:flex sm:gap-3">
            {steps.map((step, i) => (
              <Reveal key={step.id} delay={i * 100} y={24} className="flex-1 list-none">
                <HoverSpring scale={1.04} translateY={-4}>
                  <motion.div
                    animate={
                      step.variant === "accent"
                        ? {
                            boxShadow: [
                              "0 0 24px rgba(177,95,44,0.2)",
                              "0 0 40px rgba(177,95,44,0.45)",
                              "0 0 24px rgba(177,95,44,0.2)",
                            ],
                          }
                        : undefined
                    }
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className={`relative grid h-24 place-items-center overflow-hidden rounded-[1.75rem] sm:h-28 ${styles[step.variant]} ${
                      step.id === "ideate" && activeStep === 0 ? "ring-1 ring-accent/30" : ""
                    } ${step.id === "scale" && activeStep === 2 ? "ring-1 ring-accent/25" : ""}`}
                  >
                    {step.variant === "accent" && (
                      <motion.span
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                      />
                    )}
                    {step.label === "arrow" ? (
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="size-7 sm:size-8" />
                      </motion.span>
                    ) : (
                      <div className="relative text-center">
                        <span className="block text-xl font-semibold sm:text-2xl">{step.label}</span>
                        {step.sub && (
                          <span className="mt-0.5 block text-[0.65rem] font-normal opacity-60 sm:text-xs">
                            {step.sub}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                </HoverSpring>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Live metrics strip */}
        <Reveal delay={200} y={16} className="mt-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-line/60 bg-surface/40 px-4 py-3 text-center backdrop-blur-sm"
              >
                <p className="text-xl font-bold text-accent sm:text-2xl">
                  {m.value}
                  <span className="text-accent-from">{m.suffix}</span>
                </p>
                <p className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-foreground/45">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Developer principle card */}
        <Reveal delay={280} y={16} className="mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-line/60 bg-surface/30 px-6 py-5 text-center backdrop-blur-sm sm:px-10">
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(207,128,71,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(207,128,71,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <p className="relative font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent/80">
              {"// developer principle"}
            </p>
            <div className="relative mt-3 min-h-[1.75rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.45 }}
                  className="text-sm font-medium text-foreground/70 sm:text-base"
                >
                  &ldquo;{devTips[tipIndex]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="relative mt-4 flex justify-center gap-1.5">
              {devTips.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setTipIndex(i)}
                  className={`h-1 rounded-pill transition-all ${
                    i === tipIndex ? "w-5 bg-accent-from" : "w-1.5 bg-foreground/20"
                  }`}
                  aria-label={`Tip ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
