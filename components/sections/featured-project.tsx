"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { featuredProject } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { PillButton } from "@/components/lumora/pill-button";
import { MagneticWrap } from "@/components/lumora/magnetic-wrap";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { ArrowUpRight } from "@/components/lumora/icons";
import { ProjectPreviewFrame } from "@/components/lumora/project-preview-frame";
import { ProjectDashboardArt } from "@/components/projects/project-dashboard-art";

export function FeaturedProject() {
  const p = featuredProject;
  const gallery = p.gallery ?? [
    {
      variant: "cover" as const,
      label: p.category,
      subtitle: p.clientType,
      isCover: true,
    },
  ];
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = gallery[slide];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % gallery.length), 5000);
    return () => clearInterval(id);
  }, [paused, gallery.length]);

  return (
    <section id="featured" className="relative section-bg">
      <div className="shell pb-8 pt-2 lg:pb-12">
        <Reveal>
          <Eyebrow className="rounded-pill border border-line px-4 py-1.5">Recommended Project</Eyebrow>
        </Reveal>
        <LineReveal
          delay={120}
          requireIntro={false}
          className="mt-4 max-w-[24ch] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          lines={["Flagship full-stack build"]}
        />

        <Reveal y={32} className="mt-10">
          <div
            className="group overflow-hidden rounded-card border border-line bg-ink text-white shadow-lg shadow-ink/10 ring-1 ring-white/5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden lg:min-h-[420px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    {current.isCover ? (
                      <div className="relative h-full w-full">
                        <ProjectDashboardArt
                          projectId={p.id}
                          variant={current.variant}
                          showChrome
                          className="h-full w-full"
                          aria-label={`${p.title} — ${current.label}`}
                        />
                      </div>
                    ) : (
                      <ProjectPreviewFrame
                        projectId={p.id}
                        variant={current.variant}
                        alt={`${p.title} — ${current.label}`}
                        url={current.frameUrl ?? "pearly.store/admin"}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink/40" />
                <span className="absolute left-5 top-5 rounded-pill bg-accent/90 px-3 py-1 text-xs font-semibold">
                  {p.category}
                </span>
                {p.stats && (
                  <span className="absolute right-5 top-5 rounded-pill bg-white/10 px-3 py-1 text-xs backdrop-blur-sm">
                    {p.stats}
                  </span>
                )}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-sm font-semibold text-white">{current.label}</p>
                  <p className="mt-0.5 text-xs text-white/55">{current.subtitle}</p>
                  <div className="mt-3 flex gap-2">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setSlide(i)}
                        className={`h-1.5 rounded-pill transition-all ${
                          i === slide ? "w-6 bg-accent-from" : "w-1.5 bg-white/40"
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-widest text-white/45">
                    {p.duration} · {p.role}
                  </span>
                  <span className="grid size-10 place-items-center rounded-pill bg-white/10 transition group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
                  {p.title}
                </h3>
                {p.tagline && (
                  <p className="mt-3 text-sm font-medium text-accent-from/90">{p.tagline}</p>
                )}
                <p className="mt-4 text-sm leading-relaxed text-white/60">{p.description}</p>

                <ul className="mt-5 space-y-2">
                  {p.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex gap-2 text-xs text-white/55">
                      <span className="text-accent-from">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Challenge", text: p.challenge },
                    { label: "Solution", text: p.solution },
                    { label: "Impact", text: p.results },
                  ].map((block) => (
                    <div
                      key={block.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
                    >
                      <p className="text-[0.65rem] font-medium uppercase tracking-wider text-accent-from">
                        {block.label}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/55">{block.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.technologies.map((t) => (
                    <span key={t} className="rounded-pill border border-white/20 px-3 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticWrap>
                    <HoverSpring scale={1.03}>
                      <PillButton variant="light" href={p.liveUrl ?? "#"}>
                        Live Demo
                      </PillButton>
                    </HoverSpring>
                  </MagneticWrap>
                  <PillButton variant="outline" className="!border-white/25 !text-white" href={p.githubUrl ?? "#"}>
                    GitHub
                  </PillButton>
                  <PillButton variant="outline" className="!border-white/25 !text-white" href="#works">
                    View All Projects
                  </PillButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
