"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { HeroCodeAmbient } from "@/components/sections/hero-code-ambient";

function Particles({ mouseX = 0.5, mouseY = 0.5 }: { mouseX?: number; mouseY?: number }) {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${(i * 11 + 3) % 100}%`,
        top: `${(i * 17 + 5) % 100}%`,
        size: 1 + (i % 2),
        delay: (i % 12) * 0.35,
        duration: 5 + (i % 7) * 1.2,
        depth: 0.25 + (i % 5) * 0.12,
      })),
    [],
  );

  const ox = (mouseX - 0.5) * 24;
  const oy = (mouseY - 0.5) * 24;

  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/25"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            x: ox * p.depth,
            y: oy * p.depth,
          }}
          animate={{ opacity: [0.04, 0.3, 0.04], y: [0, -14, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function ArchitectureNodes({ mouseX = 0.5, mouseY = 0.5 }: { mouseX?: number; mouseY?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const ox = (mouseX - 0.5) * 12;
  const oy = (mouseY - 0.5) * 12;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      style={{ transform: `translate(${ox}px, ${oy}px)` }}
      aria-hidden
    >
      {[
        [55, 25, 72, 35],
        [72, 35, 68, 55],
        [45, 40, 55, 25],
        [68, 55, 58, 70],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={`${x1}%`}
          y1={`${y1}%`}
          x2={`${x2}%`}
          y2={`${y2}%`}
          stroke="rgba(124,58,237,0.6)"
          strokeWidth="0.5"
          strokeDasharray="4 6"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {[55, 72, 45, 68, 58].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={`${cx}%`}
          cy={`${25 + i * 10}%`}
          r="2"
          fill="rgba(59,130,246,0.5)"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

export function HeroGradientBg({
  mouseX = 0.5,
  mouseY = 0.5,
}: {
  mouseX?: number;
  mouseY?: number;
}) {
  const reduced = useReducedMotion();
  const lx = (mouseX - 0.5) * 30;
  const ly = (mouseY - 0.5) * 20;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030712]"
    >
      {/* Layer 1 — animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 80% at 58% 42%, black 10%, transparent 100%)",
          x: lx * 0.3,
          y: ly * 0.3,
        }}
        animate={reduced ? {} : { backgroundPosition: ["0px 0px", "56px 56px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 2 — noise */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      {/* Layer 3 — moving gradients */}
      <motion.div
        className="absolute -left-[10%] top-[0%] h-[65%] w-[58%] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.45) 0%, transparent 65%)",
          x: lx,
          y: ly,
        }}
        animate={reduced ? {} : { opacity: [0.32, 0.48, 0.32], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[8%] top-[10%] h-[58%] w-[52%] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.38) 0%, transparent 65%)",
          x: -lx * 0.8,
          y: ly * 0.6,
        }}
        animate={reduced ? {} : { opacity: [0.28, 0.42, 0.28], scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[38%] h-[38%] w-[38%] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)",
          x: lx * 0.5,
        }}
        animate={reduced ? {} : { x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 4 — particles */}
      <Particles mouseX={mouseX} mouseY={mouseY} />

      {/* Layer 5 & 6 — connections + architecture */}
      <ArchitectureNodes mouseX={mouseX} mouseY={mouseY} />

      {/* Layer 7 — code snippets */}
      <HeroCodeAmbient />

      {/* Light rays */}
      {!reduced && (
        <motion.div
          className="absolute left-[30%] top-0 h-full w-32 bg-gradient-to-b from-violet-500/8 via-transparent to-transparent blur-2xl"
          animate={{ opacity: [0.3, 0.55, 0.3], x: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          aria-hidden
        />
      )}

      <motion.div
        className="absolute left-[18%] top-0 h-full w-px bg-gradient-to-b from-transparent via-violet-500/15 to-transparent"
        animate={reduced ? {} : { opacity: [0.15, 0.35, 0.15], x: [0, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/55 via-transparent to-[#030712]/25" />
    </motion.div>
  );
}
