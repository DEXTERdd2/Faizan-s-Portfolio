"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { isTouchDevice } from "@/lib/lumora";

interface HoverSpringProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  translateY?: number;
  translateX?: number;
  rotate?: number;
}

export function HoverSpring({
  children,
  className = "",
  scale = 1.04,
  translateY = 0,
  translateX = 0,
  rotate = 0,
}: HoverSpringProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isTouchDevice()) return;
    const el = ref.current?.parentElement;
    if (!el) return;

    const onEnter = () => setActive(true);
    const onLeave = () => setActive(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ${className}`}
      style={{
        transform: active
          ? `scale(${scale}) translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`
          : "scale(1) translate(0, 0) rotate(0deg)",
        transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {children}
    </span>
  );
}
