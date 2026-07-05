"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TITLES = [
  "Senior Software Engineer",
  "Full Stack Developer",
  "Backend Architect",
  "Cloud Engineer",
  "AI Automation Engineer",
  "Technical Team Lead",
];

export function HeroCyclingTitle() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const title = TITLES[index];
    let i = deleting ? title.length : 0;
    const id = setInterval(() => {
      if (!deleting) {
        i++;
        setTyped(title.slice(0, i));
        if (i >= title.length) {
          clearInterval(id);
          setTimeout(() => setDeleting(true), 2200);
        }
      } else {
        i--;
        setTyped(title.slice(0, i));
        if (i <= 0) {
          clearInterval(id);
          setDeleting(false);
          setIndex((n) => (n + 1) % TITLES.length);
        }
      }
    }, deleting ? 28 : 42);
    return () => clearInterval(id);
  }, [index, deleting, reduced]);

  if (reduced) {
    return <p className="text-sm text-white/45">{TITLES[0]}</p>;
  }

  return (
    <p className="flex min-h-[1.25rem] items-center text-sm text-white/45">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="font-medium text-white/55"
        >
          {typed}
          <motion.span
            className="ml-0.5 inline-block w-0.5 bg-violet-400/80"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.75, repeat: Infinity }}
          />
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
