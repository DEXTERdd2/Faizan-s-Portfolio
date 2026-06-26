"use client";

import { useRef, type ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-mouse";

export function MagneticWrap({
  children,
  className = "",
  strength = 0.15,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useMagnetic(ref);

  return (
    <div ref={ref} className={`inline-block transition-transform duration-200 ${className}`}>
      {children}
    </div>
  );
}
