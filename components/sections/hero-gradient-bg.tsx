"use client";

import { motion } from "framer-motion";

export function HeroGradientBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#020617]" />
      <motion.div
        className="absolute -left-[10%] top-[10%] h-[55%] w-[55%] rounded-full opacity-60 blur-[100px]"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[5%] top-[20%] h-[50%] w-[50%] rounded-full opacity-50 blur-[110px]"
        style={{ background: "radial-gradient(circle, #b15f2c 0%, transparent 70%)" }}
        animate={{ x: [0, -35, 25, 0], y: [0, 25, -15, 0], scale: [1, 0.92, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[25%] h-[45%] w-[45%] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, #db2777 0%, transparent 70%)" }}
        animate={{ x: [0, 30, -25, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]/80" />
    </div>
  );
}
