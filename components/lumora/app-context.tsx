"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { applyAdaptiveGrid } from "@/lib/lumora";

interface AppContextValue {
  introReady: boolean;
  setIntroReady: (v: boolean) => void;
  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
  stopScroll: () => void;
  startScroll: () => void;
  openModal: () => void;
  closeModal: () => void;
  openNav: () => void;
  closeNav: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [introReady, setIntroReady] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.style.position = "relative";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
  }, []);

  const startScroll = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.style.removeProperty("position");
    document.documentElement.style.removeProperty("overflow");
    document.documentElement.style.removeProperty("height");
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
    stopScroll();
  }, [stopScroll]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (!navOpen) startScroll();
  }, [navOpen, startScroll]);

  const openNav = useCallback(() => {
    setNavOpen(true);
    stopScroll();
  }, [stopScroll]);

  const closeNav = useCallback(() => {
    setNavOpen(false);
    if (!modalOpen) startScroll();
  }, [modalOpen, startScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
    applyAdaptiveGrid();
    const onResize = () => applyAdaptiveGrid();
    window.addEventListener("resize", onResize);

    const lenis = new Lenis({ smoothWheel: true });
    lenisRef.current = lenis;
    lenis.stop();

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      import("gsap").then(({ gsap }) => {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);
      });
    });

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        introReady,
        setIntroReady,
        navOpen,
        setNavOpen,
        modalOpen,
        setModalOpen,
        stopScroll,
        startScroll,
        openModal,
        closeModal,
        openNav,
        closeNav,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
