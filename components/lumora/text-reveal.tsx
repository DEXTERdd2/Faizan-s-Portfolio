"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useApp } from "./app-context";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  requireIntro?: boolean;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 20,
  requireIntro = false,
}: RevealProps) {
  const { introReady } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (requireIntro && !introReady) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [introReady, requireIntro]);

  const show = requireIntro ? introReady && visible : visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface LineRevealProps {
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
  requireIntro?: boolean;
}

export function LineReveal({
  lines,
  className = "",
  delay = 0,
  stagger = 120,
  requireIntro = true,
}: LineRevealProps) {
  const { introReady } = useApp();
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (requireIntro && !introReady) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [introReady, requireIntro]);

  const show = requireIntro ? introReady && visible : visible;

  return (
    <h2 ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span
            className="block"
            style={{
              transform: show ? "translateY(0)" : "translateY(100%)",
              opacity: show ? 1 : 0,
              transition: `transform 0.9s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay + i * stagger}ms, opacity 0.9s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay + i * stagger}ms`,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}

interface WordRevealProps {
  text: string;
  mutedText?: string;
  className?: string;
  mutedClassName?: string;
}

export function WordReveal({
  text,
  mutedText,
  className = "",
  mutedClassName = "text-muted",
}: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transform: visible ? "translateY(0)" : "translateY(24px)",
            opacity: visible ? 1 : 0,
            transition: `transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) ${i * 35}ms, opacity 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) ${i * 35}ms`,
          }}
        >
          {word}&nbsp;
        </span>
      ))}
      {mutedText && (
        <span className={mutedClassName}>
          {mutedText.split(" ").map((word, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                transform: visible ? "translateY(0)" : "translateY(24px)",
                opacity: visible ? 1 : 0,
                transition: `transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) ${(words.length + i) * 35}ms, opacity 0.7s cubic-bezier(0.165, 0.84, 0.44, 1) ${(words.length + i) * 35}ms`,
              }}
            >
              {word}&nbsp;
            </span>
          ))}
        </span>
      )}
    </p>
  );
}
