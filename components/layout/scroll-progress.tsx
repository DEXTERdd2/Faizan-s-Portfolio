"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed left-0 top-0 z-[100] h-[2px] w-full">
      <div
        className="h-full origin-left bg-gradient-to-r from-accent-from via-accent to-[#7c3aed] shadow-[0_0_12px_rgba(207,128,71,0.5)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
