"use client";

import type { ReactNode } from "react";

/** Soft rounded glow wrapper — optional scan shimmer, no square brackets */
export function DevCardFrame({
  children,
  className = "",
  scan = false,
}: {
  children: ReactNode;
  className?: string;
  scan?: boolean;
}) {
  return (
    <div className={`dev-card-frame relative rounded-[inherit] ${className}`}>
      {scan && <span className="dev-scanline rounded-[inherit]" aria-hidden />}
      {children}
    </div>
  );
}
