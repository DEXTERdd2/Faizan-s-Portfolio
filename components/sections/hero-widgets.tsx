"use client";

import { motion } from "framer-motion";
import { heroStats } from "@/data/site-data";
import { useCountUp } from "@/hooks/use-mouse";

function parseStatValue(value: string) {
  const num = parseInt(value, 10);
  return Number.isNaN(num) ? 0 : num;
}

function HeroStatCard({
  value,
  suffix,
  label,
  index,
}: {
  value: string;
  suffix: string;
  label: string;
  index: number;
}) {
  const end = parseStatValue(value);
  const { count, ref } = useCountUp(end, 1800);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4, borderColor: "rgba(124,58,237,0.35)", boxShadow: "0 0 28px rgba(124,58,237,0.12)" }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 backdrop-blur-md transition-all duration-300"
    >
      <p className="text-base font-bold text-white sm:text-lg">
        {count}
        <span className="bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] bg-clip-text text-transparent">
          {suffix}
        </span>
      </p>
      <p className="mt-0.5 text-[0.65rem] leading-snug text-white/45 sm:text-xs">{label}</p>
    </motion.div>
  );
}

/** Glass stat cards for hero left column */
export function HeroStatsGrid({ visible }: { visible: boolean }) {
  if (!visible) return null;

  const stats = heroStats.slice(0, 4);

  return (
    <div className="grid grid-cols-2 gap-1.5 xs:gap-2 sm:grid-cols-4">
      {stats.map((s, i) => (
        <HeroStatCard
          key={s.label}
          value={s.value}
          suffix={s.suffix}
          label={s.label}
          index={i}
        />
      ))}
    </div>
  );
}
