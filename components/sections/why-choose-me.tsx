"use client";

import { useEffect, useRef, useState } from "react";
import { stats, whyChooseCards } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { motion } from "framer-motion";

function StatNumber({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;
      const end = vh / 2;
      const progress = Math.min(
        Math.max((start - rect.top) / (start - end), 0),
        1
      );
      setCount(Math.round(progress * value));
    };

    const onScroll = (t: number) => {
      if (t - last > 30) {
        update();
        last = t;
      }
      raf = requestAnimationFrame(onScroll);
    };
    raf = requestAnimationFrame(onScroll);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <Reveal delay={index * 90} y={20} className="contents">
      <li ref={ref}>
        <div className="text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-semibold tracking-tight">
          {count}
          {suffix}
        </div>
        <p className="mt-2 text-sm text-white/55">{label}</p>
      </li>
    </Reveal>
  );
}

export function WhyChooseMe() {
  return (
    <section id="why-me" className="relative section-bg">
      <div className="shell pb-14 lg:pb-20">
        <Reveal y={40}>
          <div className="rounded-[1.75rem] border border-white/10 bg-ink p-8 text-white sm:p-12 md:px-16">
            <Eyebrow tone="light">By the numbers</Eyebrow>
            <LineReveal
              delay={120}
              requireIntro={false}
              className="mt-4 max-w-[20ch] text-3xl font-medium tracking-tight md:text-4xl"
              lines={["Proof in the work, not the words."]}
            />

            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-5">
              {stats.map((stat, i) => (
                <StatNumber
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  index={i}
                />
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-12">
          <Reveal className="text-center">
            <Eyebrow className="rounded-pill border border-line px-4 py-1.5">Why Hire Me</Eyebrow>
          </Reveal>
          <LineReveal
            delay={120}
            requireIntro={false}
            className="mx-auto mt-4 w-fit text-3xl font-semibold tracking-tight sm:text-4xl"
            lines={["Built for premium delivery"]}
          />

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {whyChooseCards.map((card, i) => (
              <li key={card.id}>
                <Reveal delay={i * 50} y={16}>
                  <HoverSpring translateY={-4}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="h-full rounded-2xl border border-line card-surface p-5 backdrop-blur-sm"
                    >
                      <span className="inline-flex size-8 items-center justify-center rounded-pill bg-accent/10 font-mono text-xs font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-base font-semibold">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/60">{card.description}</p>
                    </motion.div>
                  </HoverSpring>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
