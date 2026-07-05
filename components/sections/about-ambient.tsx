"use client";

import { motion } from "framer-motion";

/** Soft gradient wash — minimal, theme-aware */
export function AboutAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-32 top-0 h-[50%] w-[45%] rounded-full bg-accent/[0.04] blur-[120px]" />
      <div className="absolute -right-24 bottom-0 h-[40%] w-[40%] rounded-full bg-accent-from/[0.03] blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--foreground) 0.5px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
