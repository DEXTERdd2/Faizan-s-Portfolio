"use client";

import Image from "next/image";
import { motion, useReducedMotion, type MotionValue } from "framer-motion";
import { siteConfig } from "@/data/site-data";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import {
  HeroPortraitDataStreams,
  HeroPortraitEffects,
  HeroPortraitShimmer,
} from "@/components/sections/hero-portrait-effects";

const PORTRAIT_W = 645;
const PORTRAIT_H = 882;

const AI_NODES = [
  { x: "12%", y: "28%", delay: 0 },
  { x: "88%", y: "32%", delay: 0.4 },
  { x: "8%", y: "62%", delay: 0.8 },
  { x: "92%", y: "58%", delay: 1.2 },
  { x: "50%", y: "8%", delay: 0.6 },
  { x: "22%", y: "82%", delay: 1.0 },
  { x: "78%", y: "84%", delay: 1.4 },
];

type Props = {
  visible: boolean;
  parallaxX?: number;
  parallaxY?: number;
  glowIntensity?: number;
  scrollScale?: MotionValue<number>;
};

export function HeroPortraitDisplay({
  visible,
  parallaxX = 0,
  parallaxY = 0,
  glowIntensity = 1,
  scrollScale,
}: Props) {
  const reduced = useReducedMotion();
  const { isMobile, reduceMotion } = useBreakpoint();
  const floatDistance = isMobile ? -5 : -7;
  const nodeCount = isMobile ? 5 : AI_NODES.length;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <HeroPortraitEffects visible={visible} glowIntensity={glowIntensity} />
      <HeroPortraitDataStreams visible={visible} />

      {/* Ambient blur plate */}
      <motion.div
        className="pointer-events-none absolute aspect-[3/4] w-[95%] max-w-[360px] rounded-[40%] blur-[60px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.35) 0%, rgba(59,130,246,0.15) 50%, transparent 75%)",
        }}
        animate={reduced ? {} : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: isMobile ? 5 : 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Primary radial glow — reacts to parallax intensity */}
      <motion.div
        className="pointer-events-none absolute aspect-square w-[120%] max-w-[440px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(59,130,246,0.22) 42%, rgba(34,211,238,0.08) 58%, transparent 72%)",
          filter: "blur(52px)",
          opacity: 0.65 + glowIntensity * 0.3,
        }}
        animate={reduced ? {} : { opacity: [0.55, 0.95, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: isMobile ? 4.5 : 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Rotating dotted ring */}
      {!reduced && (
        <motion.svg
          className="pointer-events-none absolute size-[min(95vw,400px)] max-w-[400px] opacity-25"
          viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{ duration: isMobile ? 56 : 48, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          <circle cx="100" cy="100" r="92" fill="none" stroke="url(#portrait-ring)" strokeWidth="0.6" strokeDasharray="3 8" />
          <defs>
            <linearGradient id="portrait-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </motion.svg>
      )}

      {/* Counter-rotating dashed ring */}
      {!reduced && (
        <motion.svg
          className="pointer-events-none absolute size-[min(88vw,360px)] max-w-[360px] opacity-[0.14]"
          viewBox="0 0 200 200"
          animate={{ rotate: -360 }}
          transition={{ duration: isMobile ? 40 : 32, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(34,211,238,0.6)" strokeWidth="0.4" strokeDasharray="1 5" />
        </motion.svg>
      )}

      {/* AI connection nodes with ping ripples */}
      {AI_NODES.slice(0, nodeCount).map((node, i) => (
        <span key={i} className="pointer-events-none absolute" style={{ left: node.x, top: node.y }} aria-hidden>
          <motion.span
            className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/70 shadow-[0_0_10px_rgba(124,58,237,0.8)]"
            animate={reduced ? {} : { opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: node.delay }}
          />
          {!reduceMotion && (
            <motion.span
              className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30"
              animate={{ opacity: [0.5, 0], scale: [0.5, 2.2] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: node.delay, ease: "easeOut" }}
            />
          )}
        </span>
      ))}

      {/* Floating particles */}
      {!reduced &&
        Array.from({ length: isMobile ? 8 : 6 }).map((_, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full bg-cyan-400/50"
            style={{
              left: `${15 + i * 10}%`,
              top: `${25 + (i % 4) * 14}%`,
              width: i % 2 === 0 ? 3 : 2,
              height: i % 2 === 0 ? 3 : 2,
            }}
            animate={{
              y: [0, isMobile ? -16 : -12, 0],
              x: [0, i % 2 === 0 ? 6 : -6, 0],
              opacity: [0.15, 0.65, 0.15],
            }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
            aria-hidden
          />
        ))}

      <motion.div
        className="relative z-10"
        style={{ x: parallaxX, y: parallaxY, scale: scrollScale ?? 1 }}
        initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
        animate={
          visible
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.92, filter: "blur(10px)" }
        }
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.08 }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, floatDistance, 0] }}
          transition={{ duration: isMobile ? 5.5 : 6.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={reduceMotion ? {} : { scale: 1.025, y: -4 }}
          className="group relative"
        >
          {/* Cursor / touch spotlight */}
          <div
            className="pointer-events-none absolute -inset-8 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(124,58,237,0.28) 0%, transparent 65%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <HeroPortraitShimmer active={visible} />
            <Image
              src="/hero-portrait.png"
              alt={siteConfig.name}
              width={PORTRAIT_W}
              height={PORTRAIT_H}
              priority
              quality={90}
              className="hero-portrait-img hero-portrait-premium mx-auto h-[clamp(220px,42vh,540px)] w-auto max-w-[min(100%,clamp(240px,72vw,340px))] object-contain object-bottom"
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 280px, 320px"
            />
          </div>

          <div
            className="pointer-events-none absolute -bottom-4 left-1/2 h-16 w-[85%] -translate-x-1/2 rounded-[100%] blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(124,58,237,0.45) 0%, rgba(59,130,246,0.18) 50%, transparent 78%)",
              opacity: 0.85,
            }}
            aria-hidden
          />

          {/* Ground reflection */}
          {!reduceMotion && (
            <motion.div
              className="pointer-events-none absolute -bottom-2 left-1/2 h-8 w-[70%] -translate-x-1/2 opacity-20"
              style={{
                background:
                  "linear-gradient(to top, rgba(124,58,237,0.4), transparent)",
                filter: "blur(8px)",
              }}
              animate={{ opacity: [0.12, 0.28, 0.12], scaleX: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
