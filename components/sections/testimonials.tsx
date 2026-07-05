"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { Star } from "@/components/lumora/icons";

function Avatar({ t }: { t: (typeof testimonials)[0] }) {
  const gradient = t.accent ?? "from-accent-from to-accent-to";
  return (
    <div className={`relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-pill bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-md ring-2 ring-white`}>
      {t.avatar}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

function TestimonialCard({
  t,
  compact = false,
}: {
  t: (typeof testimonials)[0];
  compact?: boolean;
}) {
  return (
    <>
      <div className="flex justify-center gap-1 text-accent">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="size-4" />
        ))}
      </div>
      <blockquote
        className={`mt-4 text-center leading-relaxed text-foreground/80 ${
          compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
        }`}
      >
        &ldquo;{t.content}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Avatar t={t} />
        <div className="min-w-0 text-left">
          <p className="font-semibold">{t.name}</p>
          <p className="text-sm text-foreground/50">{t.role}, {t.company}</p>
          <p className="text-xs text-foreground/40">{t.country}</p>
        </div>
      </div>
    </>
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const t = testimonials[current];
  const nextIndex = (current + 1) % testimonials.length;
  const prevIndex = (current - 1 + testimonials.length) % testimonials.length;

  const goPrev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setCurrent((c) => (c + 1) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, [paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <section id="testimonials" className="relative section-bg">
      <div className="shell section-spacing">
        <div className="mb-12 text-center">
          <Reveal><Eyebrow className="rounded-pill border border-line px-4 py-1.5">Testimonials</Eyebrow></Reveal>
          <LineReveal
            delay={120}
            requireIntro={false}
            className="text-fluid-section mx-auto mt-4 w-fit font-semibold tracking-tight"
            lines={["Client Voices"]}
          />
        </div>

        <Reveal y={24}>
          <div
            className="relative mx-auto max-w-5xl touch-pan-y"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="absolute -inset-4 rounded-card bg-gradient-to-br from-accent/10 via-transparent to-accent/5 blur-2xl" />

            {/* Desktop — carousel with side peeks */}
            <div className="relative hidden gap-4 lg:grid lg:grid-cols-[1fr_2fr_1fr] lg:items-center">
              <div className="opacity-40">
                <div className="rounded-card-sm border border-line/60 card-surface p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <Avatar t={testimonials[prevIndex]} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{testimonials[prevIndex].name}</p>
                      <p className="truncate text-xs text-foreground/50">{testimonials[prevIndex].company}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-card border border-white/60 card-surface p-6 shadow-sm backdrop-blur-xl sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                    transition={{ duration: 0.45 }}
                  >
                    <TestimonialCard t={t} />
                  </motion.div>
                </AnimatePresence>
                <CarouselControls current={current} onPrev={goPrev} onNext={goNext} onSelect={setCurrent} />
              </div>

              <div className="opacity-40">
                <div className="rounded-card-sm border border-line/60 card-surface p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <Avatar t={testimonials[nextIndex]} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{testimonials[nextIndex].name}</p>
                      <p className="truncate text-xs text-foreground/50">{testimonials[nextIndex].company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet — two cards */}
            <div className="relative hidden gap-4 md:grid md:grid-cols-2 lg:hidden">
              {[t, testimonials[nextIndex]].map((item, i) => (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-card border card-surface p-6 backdrop-blur-xl sm:p-8 ${
                    i === 0 ? "border-white/60 shadow-sm" : "border-line/70 opacity-90"
                  }`}
                >
                  <TestimonialCard t={item} compact />
                </div>
              ))}
              <div className="col-span-2">
                <CarouselControls current={current} onPrev={goPrev} onNext={goNext} onSelect={setCurrent} />
              </div>
            </div>

            {/* Mobile — single card */}
            <div className="relative overflow-hidden rounded-card border border-white/60 card-surface p-6 shadow-sm backdrop-blur-xl sm:p-8 md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <TestimonialCard t={t} />
                </motion.div>
              </AnimatePresence>
              <CarouselControls current={current} onPrev={goPrev} onNext={goNext} onSelect={setCurrent} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CarouselControls({
  current,
  onPrev,
  onNext,
  onSelect,
}: {
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <button
        type="button"
        onClick={onPrev}
        suppressHydrationWarning
        className="rounded-pill border border-line px-4 py-2 text-sm text-foreground/60 hover:text-foreground"
        aria-label="Previous testimonial"
      >
        Prev
      </button>
      <div className="flex gap-2">
        {testimonials.map((_, i) => (
          <button
            type="button"
            suppressHydrationWarning
            key={i}
            onClick={() => onSelect(i)}
            className={`h-1.5 rounded-pill transition-all ${
              i === current ? "w-6 bg-accent" : "w-1.5 bg-foreground/20"
            }`}
            aria-label={`Testimonial ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onNext}
        suppressHydrationWarning
        className="rounded-pill border border-line px-4 py-2 text-sm text-foreground/60 hover:text-foreground"
        aria-label="Next testimonial"
      >
        Next
      </button>
    </div>
  );
}
