"use client";

import { useEffect, useState } from "react";
import { easeInOutCubic } from "@/lib/lumora";
import { LogoMark } from "./icons";
import { useApp } from "./app-context";

const FILL_MS = 1300;

export function PageLoader() {
  const { stopScroll, startScroll, setIntroReady } = useApp();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    stopScroll();
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / FILL_MS, 1);
      const eased = easeInOutCubic(t);
      const val = Math.round(eased * 100);
      setProgress(val);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(() => {
          setIntroReady(true);
          startScroll();
          setRemoved(true);
        }, 700);
      }
    };

    requestAnimationFrame(tick);
  }, [stopScroll, startScroll, setIntroReady]);

  if (removed) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-8 rounded-b-card bg-ink text-white"
      style={{
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        className="flex flex-col items-center gap-5 text-center"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? "translateY(-12px)" : "translateY(0)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div className="flex items-center gap-2 text-2xl font-semibold sm:text-3xl">
          <LogoMark className="size-[1.875rem] text-accent-from" />
          Faizan
        </div>
        <p className="max-w-[24ch] text-sm text-white/55">
          Bold ideas, shipped with quiet precision.
        </p>
      </div>

      <div className="flex w-[min(22rem,72vw)] flex-col gap-3">
        <div className="h-px bg-white/15">
          <div
            className="h-full bg-accent-from transition-[width] duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-white/45">
          <span>Loading</span>
          <span className="tabular-nums text-white/80">
            {progress.toString().padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
