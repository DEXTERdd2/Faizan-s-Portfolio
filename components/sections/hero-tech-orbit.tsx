"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useBreakpoint } from "@/hooks/use-breakpoint";

const ORBIT_TECH = [
  { label: "React", angle: 0 },
  { label: "Next.js", angle: 30 },
  { label: ".NET", angle: 60 },
  { label: "Azure", angle: 90 },
  { label: "Docker", angle: 120 },
  { label: "Node", angle: 150 },
  { label: "OpenAI", angle: 180 },
  { label: "SQL", angle: 210 },
  { label: "GitHub", angle: 240 },
  { label: "TS", angle: 270 },
  { label: "n8n", angle: 300 },
  { label: "FastAPI", angle: 330 },
];

const RADIUS = 168;

export function HeroTechOrbit({ visible }: { visible: boolean }) {
  const reduced = useReducedMotion();
  const { isMobile } = useBreakpoint();
  if (!visible) return null;

  const outerDuration = isMobile ? 100 : 90;
  const innerDuration = isMobile ? 72 : 120;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      {/* Outer dotted orbit ring */}
      <motion.svg
        className="absolute size-[min(82vw,380px)] max-w-[380px] opacity-[0.18] max-md:opacity-[0.14]"
        viewBox="0 0 200 200"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: outerDuration, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="rgba(124,58,237,0.5)"
          strokeWidth="0.5"
          strokeDasharray="2 6"
        />
      </motion.svg>

      {/* Middle ring — counter rotation */}
      <motion.svg
        className="absolute size-[min(76vw,340px)] max-w-[340px] opacity-[0.12]"
        viewBox="0 0 200 200"
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: innerDuration, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="82"
          fill="none"
          stroke="rgba(34,211,238,0.45)"
          strokeWidth="0.35"
          strokeDasharray="4 8"
        />
      </motion.svg>

      {/* Inner glow ring */}
      <motion.div
        className="absolute size-[min(72vw,320px)] max-w-[320px] rounded-full border border-white/[0.06]"
        style={{ boxShadow: "inset 0 0 30px rgba(124,58,237,0.08)" }}
        animate={reduced ? {} : { opacity: [0.15, 0.5, 0.15], scale: [1, 1.03, 1] }}
        transition={{ duration: isMobile ? 4 : 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Desktop / tablet tech labels on orbit */}
      <motion.div
        className="absolute size-[min(88vw,380px)] max-w-[380px] max-sm:hidden"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: innerDuration, repeat: Infinity, ease: "linear" }}
      >
        {ORBIT_TECH.map((t) => {
          const rad = (t.angle * Math.PI) / 180;
          const x = 50 + (RADIUS / 3.8) * Math.cos(rad);
          const y = 50 + (RADIUS / 3.8) * Math.sin(rad);
          return (
            <motion.span
              key={t.label}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/[0.08] bg-[rgba(6,8,16,0.75)] px-1.5 py-0.5 text-[0.48rem] font-medium text-white/45 backdrop-blur-sm transition hover:border-violet-500/40 hover:text-white hover:shadow-[0_0_12px_rgba(124,58,237,0.35)]"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={reduced ? {} : { rotate: -360 }}
              transition={{ duration: innerDuration, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.12 }}
            >
              {t.label}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
