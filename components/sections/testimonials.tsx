"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { Star } from "@/components/lumora/icons";

function Avatar({ t }: { t: (typeof testimonials)[0] }) {
  const gradient = t.accent ?? "from-accent-from to-accent-to";
  return (
    <div className={`relative grid size-14 place-items-center overflow-hidden rounded-pill bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-md ring-2 ring-white`}>
      {t.avatar}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[current];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="testimonials" className="relative section-bg">
      <div className="shell py-14 lg:py-20">
        <div className="mb-12 text-center">
          <Reveal><Eyebrow className="rounded-pill border border-line px-4 py-1.5">Testimonials</Eyebrow></Reveal>
          <LineReveal
            delay={120}
            requireIntro={false}
            className="mx-auto mt-4 w-fit text-4xl font-semibold tracking-tight sm:text-5xl"
            lines={["Client Voices"]}
          />
        </div>

        <Reveal y={24}>
          <div
            className="relative mx-auto max-w-4xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="absolute -inset-4 rounded-card bg-gradient-to-br from-accent/10 via-transparent to-accent/5 blur-2xl" />

            <div className="relative grid gap-4 lg:grid-cols-[1fr_2fr_1fr] lg:items-center">
              {/* Side peek — prev */}
              <div className="hidden opacity-40 lg:block">
                {(() => {
                  const prev = testimonials[(current - 1 + testimonials.length) % testimonials.length];
                  return (
                    <div className="rounded-card-sm border border-line/60 card-surface p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <Avatar t={prev} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{prev.name}</p>
                          <p className="truncate text-xs text-foreground/50">{prev.company}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Main card */}
              <div className="relative overflow-hidden rounded-card border border-white/60 card-surface p-8 shadow-sm backdrop-blur-xl sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="flex justify-center gap-1 text-accent">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="size-4" />
                      ))}
                    </div>
                    <blockquote className="mt-6 text-center text-lg leading-relaxed text-foreground/80 sm:text-xl">
                      &ldquo;{t.content}&rdquo;
                    </blockquote>
                    <div className="mt-8 flex items-center justify-center gap-4">
                      <Avatar t={t} />
                      <div className="text-left">
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-sm text-foreground/50">{t.role}, {t.company}</p>
                        <p className="text-xs text-foreground/40">{t.country}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
                    suppressHydrationWarning
                    className="rounded-pill border border-line px-4 py-2 text-sm text-foreground/60 hover:text-foreground"
                  >
                    Prev
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        type="button"
                        suppressHydrationWarning
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-pill transition-all ${
                          i === current ? "w-6 bg-accent" : "w-1.5 bg-foreground/20"
                        }`}
                        aria-label={`Testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
                    className="rounded-pill border border-line px-4 py-2 text-sm text-foreground/60 hover:text-foreground"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Side peek — next */}
              <div className="hidden opacity-40 lg:block">
                {(() => {
                  const next = testimonials[(current + 1) % testimonials.length];
                  return (
                    <div className="rounded-card-sm border border-line/60 card-surface p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <Avatar t={next} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{next.name}</p>
                          <p className="truncate text-xs text-foreground/50">{next.company}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
