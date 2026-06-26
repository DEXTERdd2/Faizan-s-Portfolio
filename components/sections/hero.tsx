"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/lumora";
import { heroBadges, heroBio, heroTechBadges, siteConfig, socialLinks } from "@/data/site-data";
import { useApp } from "@/components/lumora/app-context";
import { Reveal, LineReveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { MagneticWrap } from "@/components/lumora/magnetic-wrap";
import { SocialIcon } from "@/components/lumora/social-icon";
import { HeroGradientBg } from "@/components/sections/hero-gradient-bg";
import { HeroRoleGraph, HeroSocialGraph } from "@/components/sections/hero-node-graph";
import { HeroFloatingWidgets, HeroStatsStrip } from "@/components/sections/hero-widgets";

const PORTRAIT_WIDTH = 656;
const PORTRAIT_HEIGHT = 1024;

export function Hero() {
  const { introReady, openModal } = useApp();

  return (
    <section
      id="home"
      className="relative isolate min-h-lvh overflow-hidden rounded-b-card bg-[#020617] text-white"
    >
      <HeroGradientBg />

      <div className="shell relative z-10 flex min-h-lvh flex-col justify-center pb-16 pt-28 lg:pb-20 lg:pt-32">
        <Reveal requireIntro delay={150} y={8}>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {heroBadges.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-2 rounded-pill border px-3 py-1.5 text-xs font-medium backdrop-blur-sm ${
                  badge.tone === "green"
                    ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                    : badge.tone === "accent"
                      ? "border-accent/30 bg-accent/10 text-accent-from"
                      : "border-white/15 bg-white/5 text-white/60"
                }`}
              >
                {badge.tone === "green" && <span className="size-1.5 animate-pulse rounded-pill bg-emerald-400" />}
                {badge.label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-6 xl:gap-8">
          {/* Left — Hello + roles */}
          <div className="relative z-20 order-2 lg:order-1 lg:col-span-3">
            <Reveal requireIntro delay={200} y={16}>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
                Hello,
              </h1>
            </Reveal>

            <Reveal requireIntro delay={350} y={12}>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60 sm:text-base">
                I build <strong className="font-medium text-white/90">enterprise-grade software</strong> — scalable APIs, cloud systems, and AI-powered automation for global clients.
              </p>
            </Reveal>

            <Reveal requireIntro delay={450}>
              <HeroRoleGraph visible={introReady} />
            </Reveal>

            <Reveal requireIntro delay={550} y={10}>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticWrap>
                  <HoverSpring scale={1.04}>
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={openModal}
                      className="rounded-pill bg-gradient-to-r from-[#7c3aed] via-[#b15f2c] to-[#db2777] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/25 transition hover:brightness-110"
                    >
                      Hire Me
                    </button>
                  </HoverSpring>
                </MagneticWrap>
                <HoverSpring scale={1.04}>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => scrollToSection("works")}
                    className="rounded-pill border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white/85 backdrop-blur-sm transition hover:bg-white/10"
                  >
                    View Projects
                  </button>
                </HoverSpring>
                <HoverSpring scale={1.04}>
                  <a
                    href={siteConfig.resumeUrl}
                    className="inline-block rounded-pill border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 backdrop-blur-sm transition hover:bg-white/10"
                  >
                    Resume
                  </a>
                </HoverSpring>
                <HoverSpring scale={1.04}>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-pill border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-300 backdrop-blur-sm transition hover:bg-emerald-500/20"
                  >
                    WhatsApp
                  </a>
                </HoverSpring>
              </div>
            </Reveal>

            <div className="mt-6 flex flex-wrap gap-2 lg:hidden">
              {["Full Stack Developer", "ASP.NET Core", "Backend Architect"].map((role) => (
                <span
                  key={role}
                  className="rounded-pill border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                >
                  {role}
                </span>
              ))}
            </div>

            <Reveal requireIntro delay={650} y={10} className="mt-8 hidden lg:block">
              <HeroStatsStrip visible={introReady} />
            </Reveal>
          </div>

          {/* Center — Portrait + scoped widgets */}
          <div className="relative z-10 order-1 lg:order-2 lg:col-span-5 xl:col-span-5">
            <HeroFloatingWidgets visible={introReady} />
            <motion.div
              className="relative mx-auto w-fit max-w-full"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={introReady ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div
                  className="pointer-events-none absolute -inset-x-12 bottom-[5%] top-[10%] rounded-full opacity-70 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(177,95,44,.45) 0%, rgba(124,58,237,.15) 45%, transparent 72%)",
                  }}
                />
                <div className="relative mx-auto w-fit rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-1.5 shadow-2xl shadow-black/40">
                  <div
                    className="relative overflow-hidden rounded-[1.5rem]"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 88%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to bottom, black 88%, transparent 100%)",
                    }}
                  >
                    <Image
                      src="/hero-portrait.png"
                      alt={siteConfig.name}
                      width={PORTRAIT_WIDTH}
                      height={PORTRAIT_HEIGHT}
                      priority
                      quality={100}
                      unoptimized
                      className="h-[min(62vh,680px)] w-auto max-w-[min(88vw,360px)] object-cover object-[center_8%] sm:max-w-[min(82vw,400px)] lg:max-w-none lg:h-[min(70vh,720px)]"
                      sizes="(max-width: 1024px) 420px, 656px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,6,23,.5)_100%)]" />
                  </div>
                  <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.2em] text-accent-from/70">
                    dev · engineer · builder
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right — Name + bio + social */}
          <div className="relative z-20 order-3 lg:col-span-4">
            <div className="mx-auto w-full max-w-lg lg:ml-auto lg:max-w-none lg:pl-2 lg:text-right">
              <LineReveal
                requireIntro
                delay={300}
                stagger={100}
                className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl xl:text-[3.25rem]"
                lines={["I am", "Faizan Shahid"]}
              />

              <Reveal requireIntro delay={500} y={10}>
                <p className="mt-4 text-sm text-white/55">
                  Senior Software Engineer · {siteConfig.location}
                </p>
              </Reveal>

              <Reveal requireIntro delay={550} y={10}>
                <div className="mt-5 max-h-[220px] overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-sm lg:ml-auto lg:max-h-[260px] lg:max-w-[22rem] lg:text-left [scrollbar-width:thin] [scrollbar-color:rgba(207,128,71,0.4)_transparent]">
                  <p className="text-xs leading-relaxed text-white/60 sm:text-sm">
                    {heroBio}
                  </p>
                </div>
              </Reveal>

              <Reveal requireIntro delay={600}>
                <HeroSocialGraph visible={introReady}>
                  {socialLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.12 }}
                    >
                      <HoverSpring scale={1.08}>
                        <SocialIcon
                          link={link}
                          className="grid size-10 place-items-center rounded-pill border border-white/20 bg-white/10 text-white/80 backdrop-blur-sm transition hover:border-accent/50 hover:bg-white/15 hover:text-white sm:size-11"
                        />
                      </HoverSpring>
                    </motion.div>
                  ))}
                </HeroSocialGraph>
              </Reveal>

              <Reveal requireIntro delay={700} y={10}>
                <div className="mt-6 flex flex-wrap gap-2 lg:justify-end">
                  {heroTechBadges.slice(0, 4).map((badge) => (
                    <span
                      key={badge}
                      className="rounded-pill border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/55"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal requireIntro delay={750} y={10}>
                <div className="mt-5 lg:text-right">
                  <a
                    href={siteConfig.resumeUrl}
                    className="text-sm font-medium text-white/50 underline-offset-4 transition hover:text-accent-from hover:underline"
                  >
                    Download Resume →
                  </a>
                </div>
              </Reveal>

              <Reveal requireIntro delay={650} y={10} className="mt-8 lg:hidden">
                <HeroStatsStrip visible={introReady} />
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal requireIntro delay={900} y={0} className="mt-12 lg:mt-16">
          <div className="flex items-center justify-between gap-3 border-t border-white/10 py-5 text-xs font-medium uppercase tracking-wide text-white/45">
            <span>5+ years experience</span>
            <span className="hidden sm:inline">50+ projects · 100+ APIs built</span>
            <span className="inline-flex items-center gap-2">
              Scroll to explore <span>↓</span>
            </span>
          </div>
        </Reveal>
      </div>

      {/* Smooth curve into dark sections */}
      <div className="pointer-events-none absolute -bottom-px left-0 right-0 z-20 h-20 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
