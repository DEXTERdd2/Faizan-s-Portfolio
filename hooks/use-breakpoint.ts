"use client";

import { useEffect, useState } from "react";

export type BreakpointState = {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  reduceMotion: boolean;
};

const DEFAULT: BreakpointState = {
  width: 1280,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isWide: false,
  reduceMotion: false,
};

export function useBreakpoint(): BreakpointState {
  const [state, setState] = useState<BreakpointState>(DEFAULT);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const w = window.innerWidth;
      setState({
        width: w,
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024,
        isDesktop: w >= 1024,
        isWide: w >= 1920,
        reduceMotion: mqReduce.matches,
      });
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    mqReduce.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      mqReduce.removeEventListener("change", update);
    };
  }, []);

  return state;
}
