"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroScrollIndicator() {
  const reduced = useReducedMotion();

  return (
    <div className="flex items-center gap-4">
      <span className="hidden text-[0.65rem] font-medium uppercase tracking-widest text-white/28 sm:inline">
        5+ years · 50+ projects
      </span>
      <span className="hidden flex-1 text-center text-[0.65rem] font-medium uppercase tracking-widest text-white/28 md:inline">
        Enterprise · Cloud · AI · DevOps
      </span>
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden h-8 w-5 rounded-full border border-white/20 sm:block">
          <motion.div
            className="absolute left-1/2 top-1.5 size-1 -translate-x-1/2 rounded-full bg-white/60"
            animate={reduced ? {} : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="relative flex items-center gap-2">
          <motion.div
            className="h-px w-8 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
            animate={reduced ? {} : { opacity: [0.3, 0.8, 0.3], scaleX: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <span className="text-[0.65rem] font-medium uppercase tracking-widest text-white/35">
            Scroll
          </span>
          <motion.span
            className="text-white/40"
            animate={reduced ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </div>
      </div>
    </div>
  );
}
