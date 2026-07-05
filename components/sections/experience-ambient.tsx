"use client";

import { motion } from "framer-motion";

export function ExperienceAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        className="absolute -left-20 top-[10%] size-96 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(207,128,71,0.1) 0%, transparent 70%)" }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 bottom-[15%] size-80 rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }}
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Subtle architecture wireframe */}
      <svg
        className="absolute right-[8%] top-[18%] hidden h-40 w-40 opacity-[0.04] lg:block"
        viewBox="0 0 100 100"
      >
        {[20, 40, 60, 80].map((y) => (
          <rect key={y} x="10" y={y} width="80" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
        ))}
      </svg>
      <svg
        className="absolute bottom-[20%] left-[6%] hidden h-32 w-32 opacity-[0.035] lg:block"
        viewBox="0 0 100 60"
      >
        <path d="M10 30 L30 10 L70 10 L90 30 L70 50 L30 50 Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="50" cy="30" r="4" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}
