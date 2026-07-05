"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useSpring } from "framer-motion";

export function AnimatedMetric({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const spring = useSpring(value, { stiffness: 65, damping: 22, mass: 0.8 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useMotionValueEvent(spring, "change", (v) => {
    if (!ref.current) return;
    ref.current.textContent =
      (decimals > 0 ? v.toFixed(decimals) : String(Math.round(v))) + suffix;
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent =
        (decimals > 0 ? value.toFixed(decimals) : String(Math.round(value))) + suffix;
    }
  }, [value, decimals, suffix]);

  return <span ref={ref} />;
}
