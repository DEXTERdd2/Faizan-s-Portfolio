"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "@/hooks/use-breakpoint";

const MOBILE_TECH = [
  { label: "React", angle: 20 },
  { label: ".NET", angle: 75 },
  { label: "Azure", angle: 130 },
  { label: "OpenAI", angle: 185 },
  { label: "Docker", angle: 240 },
  { label: "Next.js", angle: 295 },
];

const SPARKLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${12 + ((i * 17) % 76)}%`,
  top: `${18 + ((i * 23) % 62)}%`,
  delay: i * 0.35,
  size: i % 3 === 0 ? 2 : 1,
}));

type Props = {
  visible: boolean;
  glowIntensity?: number;
};

export function HeroPortraitEffects({ visible, glowIntensity = 1 }: Props) {
  const { isMobile, reduceMotion } = useBreakpoint();
  if (!visible || reduceMotion) return null;

  const pulseCount = isMobile ? 2 : 3;
  const sparkleCount = isMobile ? 6 : 10;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center" aria-hidden>
      {/* Rotating conic aura */}
      <motion.div
        className="absolute aspect-[3/4] w-[88%] max-w-[340px] rounded-[42%] opacity-40 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(124,58,237,0.35), rgba(59,130,246,0.2), rgba(34,211,238,0.15), rgba(236,72,153,0.12), rgba(124,58,237,0.35))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: isMobile ? 28 : 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Counter-rotating inner ring */}
      <motion.div
        className="absolute size-[min(78vw,340px)] max-w-[340px] rounded-full border border-violet-400/10"
        style={{
          boxShadow: `0 0 ${24 + glowIntensity * 20}px rgba(124,58,237,0.12), inset 0 0 40px rgba(59,130,246,0.06)`,
        }}
        animate={{ rotate: -360, scale: [1, 1.02, 1] }}
        transition={{
          rotate: { duration: isMobile ? 36 : 24, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Expanding pulse rings */}
      {Array.from({ length: pulseCount }).map((_, i) => (
        <motion.span
          key={i}
          className="hero-portrait-pulse-ring absolute aspect-square w-[min(70vw,300px)] max-w-[300px] rounded-full border border-cyan-400/20"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: [0, 0.45, 0],
            scale: [0.85, 1.15, 1.28],
          }}
          transition={{
            duration: isMobile ? 3.5 : 4,
            repeat: Infinity,
            delay: i * (isMobile ? 1.2 : 1.4),
            ease: "easeOut",
          }}
        />
      ))}

      {/* Radial light beams */}
      <motion.div
        className="absolute size-[min(90vw,380px)] max-w-[380px] opacity-30"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, transparent 0deg 28deg, rgba(124,58,237,0.08) 28deg 30deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: isMobile ? 40 : 32, repeat: Infinity, ease: "linear" }}
      />

      {/* Sparkle field */}
      {SPARKLES.slice(0, sparkleCount).map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 6px rgba(167,139,250,0.8)",
          }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.6, 1.2, 0.6] }}
          transition={{
            duration: 2.5 + (s.id % 3) * 0.5,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mobile tech halo — visible when side widgets are hidden */}
      {isMobile && (
        <motion.div
          className="absolute size-[min(92vw,360px)] max-w-[360px] lg:hidden"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        >
          {MOBILE_TECH.map((t) => {
            const rad = (t.angle * Math.PI) / 180;
            const x = 50 + 44 * Math.cos(rad);
            const y = 50 + 44 * Math.sin(rad);
            return (
              <motion.span
                key={t.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-violet-500/25 bg-[rgba(6,8,16,0.82)] px-1.5 py-0.5 text-[0.45rem] font-medium text-violet-200/70 shadow-[0_0_12px_rgba(124,58,237,0.25)] backdrop-blur-sm"
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={{ rotate: -360, opacity: [0.55, 1, 0.55] }}
                transition={{
                  rotate: { duration: 48, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {t.label}
              </motion.span>
            );
          })}
        </motion.div>
      )}

      {/* Entrance burst — plays once when visible */}
      <motion.div
        className="absolute aspect-square w-[min(80vw,320px)] max-w-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.35) 0%, rgba(59,130,246,0.12) 45%, transparent 70%)",
        }}
        initial={{ opacity: 0.8, scale: 0.6 }}
        animate={{ opacity: 0, scale: 1.35 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}

/** Holographic scan + edge glow clipped to portrait silhouette */
export function HeroPortraitShimmer({ active }: { active: boolean }) {
  const { reduceMotion, isMobile } = useBreakpoint();
  if (!active || reduceMotion) return null;

  return (
    <>
      <div className="hero-portrait-scan pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
        <div className="hero-portrait-scan-line" />
      </div>
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.14) 50%, transparent 58%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          aria-hidden
        />
      )}
    </>
  );
}

/** Mobile-only radial data streams toward portrait center */export function HeroPortraitDataStreams({ visible }: { visible: boolean }) {
  const { isMobile, reduceMotion } = useBreakpoint();
  if (!visible || !isMobile || reduceMotion) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-30"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 50 + 46 * Math.cos(rad);
        const y1 = 50 + 46 * Math.sin(rad);
        return (
          <g key={deg}>
            <motion.line
              x1={x1}
              y1={y1}
              x2="50"
              y2="48"
              stroke="url(#stream-grad)"
              strokeWidth="0.15"
              strokeDasharray="1 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.2, 0.55, 0.2], strokeDashoffset: [0, -6] }}
              transition={{
                pathLength: { duration: 0.8, delay: i * 0.05 },
                opacity: { duration: 2.5, repeat: Infinity, delay: i * 0.12 },
                strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
              }}
            />
            <motion.circle
              r="0.35"
              fill="#22d3ee"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
            >
              <animateMotion
                dur={`${2.5 + (i % 3) * 0.4}s`}
                repeatCount="indefinite"
                path={`M ${x1} ${y1} L 50 48`}
              />
            </motion.circle>
          </g>
        );
      })}
      <defs>
        <linearGradient id="stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
