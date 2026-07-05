"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/lumora/text-reveal";
import { CreateBandFlow } from "@/components/sections/create-band-flow";
import { TerminalStrip } from "@/components/lumora/terminal-strip";
import { devTips, heroStats } from "@/data/site-data";

const metrics = heroStats.slice(0, 4);

export function CreateBand() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTipIndex((i) => (i + 1) % devTips.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden section-bg border-y border-line/60">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 size-64 rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 size-56 rounded-full bg-purple-600/8 blur-[90px]" />
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(207,128,71,0.8) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "36px 36px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
      </div>

      <div className="shell relative py-10 lg:py-14">
        <Reveal y={16}>
          <TerminalStrip />
        </Reveal>

        <Reveal y={20} className="mt-8 sm:mt-10">
          <CreateBandFlow />
        </Reveal>

        <Reveal delay={200} y={16} className="mt-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3, borderColor: "rgba(207,128,71,0.35)" }}
                className="rounded-2xl border border-line/60 bg-surface/40 px-4 py-3 text-center backdrop-blur-sm transition-colors"
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
