"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/site-data";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container-custom">
          <nav
            className={cn(
              "flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500",
              isScrolled
                ? "glass-strong shadow-card"
                : "bg-transparent"
            )}
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#hero");
              }}
              className="group flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-105">
                <span className="text-sm font-bold text-white">FS</span>
              </div>
              <span className="hidden sm:block text-sm font-semibold text-foreground">
                Faizan Shahid
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg",
                    activeSection === item.href.slice(1)
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden lg:block">
              <button
                onClick={() => handleNavClick("#contact")}
                className="px-5 py-2.5 text-sm font-medium bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
              >
                Hire Me
              </button>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-50 lg:hidden"
          >
            <div className="glass-strong rounded-2xl p-6 shadow-card">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-medium rounded-xl transition-colors",
                      activeSection === item.href.slice(1)
                        ? "bg-white/10 text-foreground"
                        : "text-muted hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="mt-2 px-4 py-3 text-sm font-medium bg-accent text-white rounded-xl text-center"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
