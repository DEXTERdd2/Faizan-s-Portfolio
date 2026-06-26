"use client";

import { motion } from "framer-motion";
import { Globe } from "@/components/lumora/icons";
import { PillButton } from "@/components/lumora/pill-button";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { Reveal, WordReveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { SocialIcon } from "@/components/lumora/social-icon";
import { aboutHighlights, socialLinks } from "@/data/site-data";
import { useCountUp } from "@/hooks/use-mouse";

const highlights = [
  {
    title: "Backend Specialist",
    desc: "ASP.NET Core expert with deep API architecture knowledge",
    icon: "⚙",
  },
  {
    title: "Team Lead",
    desc: "Led cross-functional teams delivering enterprise solutions",
    icon: "◆",
  },
  {
    title: "Clean Architecture",
    desc: "SOLID principles, CQRS, and microservices patterns",
    icon: "◇",
  },
  {
    title: "AI Integration",
    desc: "LLM workflows, RAG pipelines, and intelligent automation",
    icon: "✦",
    accent: true,
  },
];

const expertise = [
  "ASP.NET Core",
  "Azure",
  "REST APIs",
  "Microservices",
  "OpenAI",
  "Next.js",
];

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const { num, suffix } = parseStat(value);
  const { count, ref } = useCountUp(num, 1800);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4, borderColor: "rgba(207,128,71,0.35)" }}
      className="group relative overflow-hidden rounded-2xl border border-line card-surface px-3 py-4 text-center backdrop-blur-sm"
    >
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />
      <p className="relative text-xl font-bold text-accent sm:text-2xl">
        {count}
        {suffix}
      </p>
      <p className="relative mt-1 text-xs text-foreground/50">{label}</p>
    </motion.div>
  );
}

function HighlightCard({
  item,
  index,
}: {
  item: (typeof highlights)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`group relative h-full overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-colors ${
        item.accent
          ? "border-accent/25 bg-gradient-to-br from-accent/10 via-surface/40 to-surface/20"
          : "border-line card-surface hover:border-accent/25"
      }`}
    >
      {item.accent && (
        <motion.span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      )}
      <div className="relative flex items-start justify-between gap-2">
        <span className="font-mono text-xs text-accent/70">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-sm text-accent/60">{item.icon}</span>
      </div>
      <h3 className="relative mt-3 font-semibold text-foreground">{item.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-foreground/60">{item.desc}</p>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden section-bg">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-20 top-1/4 size-72 rounded-full bg-accent/6 blur-[100px]" />
        <div className="absolute -right-16 bottom-1/4 size-64 rounded-full bg-purple-600/5 blur-[90px]" />
      </div>

      <div className="shell relative py-14 lg:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div className="relative">
            <div className="relative z-10 flex flex-col gap-8">
              <div>
                <Reveal>
                  <Eyebrow>About Me</Eyebrow>
                </Reveal>
                <Reveal y={12} className="mt-6">
                  <p className="max-w-md text-sm leading-relaxed text-foreground/70 sm:text-base">
                    I&apos;m a{" "}
                    <strong className="font-medium text-foreground">
                      Senior Full Stack Software Engineer
                    </strong>{" "}
                    with 5+ years building enterprise-grade applications. I specialize in ASP.NET
                    Core, Azure cloud architecture, and AI-powered automation for international
                    clients.
                  </p>
                </Reveal>
              </div>

              <div className="relative">
                <motion.div
                  className="pointer-events-none absolute -right-4 bottom-0 z-0 hidden opacity-[0.035] sm:block lg:-right-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                  aria-hidden
                >
                  <Globe className="size-40 lg:size-48" />
                </motion.div>

                <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {aboutHighlights.map((s, i) => (
                    <StatCard key={s.label} value={s.value} label={s.label} index={i} />
                  ))}
                </div>
              </div>

              <Reveal delay={160} y={12}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center gap-3 rounded-2xl border border-line/60 bg-surface/40 px-4 py-3.5 text-sm text-foreground/70 backdrop-blur-sm"
                >
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-pill bg-emerald-400/60" />
                    <span className="relative inline-flex size-2 rounded-pill bg-emerald-400" />
                  </span>
                  <Globe className="size-4 shrink-0 text-accent/70" />
                  <span>Remote-first engineer serving international clients worldwide.</span>
                </motion.div>
              </Reveal>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-8">
            <WordReveal
              className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl lg:text-[2rem]"
              text="I partner with ambitious teams to ship"
              mutedText="enterprise applications, scalable APIs, and intelligent systems that drive business growth."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item, i) => (
                <HighlightCard key={item.title} item={item} index={i} />
              ))}
            </div>

            <Reveal delay={200} y={12}>
              <div className="flex flex-wrap gap-2">
                {expertise.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{
                      scale: 1.06,
                      borderColor: "rgba(207,128,71,0.5)",
                      boxShadow: "0 0 20px rgba(177,95,44,0.15)",
                    }}
                    className="cursor-default rounded-pill border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300} y={12}>
              <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line/60 bg-surface/30 px-5 py-5 backdrop-blur-sm">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                    Find me online
                  </p>
                  <div className="mt-3 flex gap-2">
                    {socialLinks.map((link, i) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                        whileHover={{ y: -3 }}
                      >
                        <SocialIcon
                          link={link}
                          className="grid size-10 place-items-center rounded-pill border border-line bg-surface-elevated text-foreground/70 transition hover:border-accent/40 hover:text-accent hover:shadow-[0_0_16px_rgba(177,95,44,0.2)]"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
                <HoverSpring scale={1.04}>
                  <PillButton variant="outline" arrow="right" href="#experience">
                    View Experience
                  </PillButton>
                </HoverSpring>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
