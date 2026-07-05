"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site-data";

const PORTRAIT_WIDTH = 657;
const PORTRAIT_HEIGHT = 1024;

export function HeroPortrait({ visible }: { visible: boolean }) {
  return (
    <div className="relative flex h-full w-full items-end justify-center pt-6 lg:items-start lg:pt-10 xl:pt-12">
      {/* Abstract blurred shapes */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[18%] size-48 -translate-x-1/2 rounded-full opacity-30 blur-[80px]"
        style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-[30%] top-[35%] size-36 rounded-full opacity-25 blur-[70px]"
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
        animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute right-[25%] top-[45%] size-32 rounded-full opacity-20 blur-[60px]"
        style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
        animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Radial glow behind person */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[22%] h-[420px] w-[320px] -translate-x-1/2 sm:h-[480px] sm:w-[360px] lg:top-[20%] lg:h-[520px] lg:w-[400px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 50% 45%, rgba(124,58,237,0.45) 0%, rgba(59,130,246,0.22) 40%, transparent 72%)",
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Portrait — no frame, no container */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02 }}
        className="group relative z-10 mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[380px]"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/hero-portrait.png"
            alt={siteConfig.name}
            width={PORTRAIT_WIDTH}
            height={PORTRAIT_HEIGHT}
            priority
            quality={100}
            unoptimized
            className="h-[min(52vh,480px)] w-full object-contain object-top sm:h-[min(58vh,520px)] lg:h-[560px] xl:h-[580px]"
            style={{
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.55)) drop-shadow(0 8px 24px rgba(59,130,246,0.15))",
            }}
            sizes="(max-width: 1024px) 38vw, 380px"
          />
        </motion.div>

        {/* Soft ground shadow */}
        <div
          className="pointer-events-none absolute -bottom-2 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[100%] opacity-60 blur-xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(124,58,237,0.35) 0%, rgba(59,130,246,0.12) 50%, transparent 75%)",
          }}
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
