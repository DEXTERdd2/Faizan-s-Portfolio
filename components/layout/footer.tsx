"use client";

import { siteConfig, socialLinks, skillCategories, services } from "@/data/site-data";
import { useApp } from "@/components/lumora/app-context";
import { LogoMark } from "@/components/lumora/icons";
import { PillButton } from "@/components/lumora/pill-button";
import { LineReveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { MagneticWrap } from "@/components/lumora/magnetic-wrap";
import { SocialIcon } from "@/components/lumora/social-icon";

const quickLinks = [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#works" },
      { label: "Process", href: "#process" },
      { label: "Services", href: "#services" },
      { label: "Certifications", href: "#certifications" },
      { label: "Contact", href: "#contact" },
];

const serviceLinks = services.slice(0, 6).map((s) => ({
  label: s.title,
  href: "#services",
}));

const techLinks = skillCategories.flatMap((c) =>
  c.skills.slice(0, 2).map((skill) => ({ label: skill.name, href: "#skills" }))
).slice(0, 8);

export function Footer() {
  const { openModal } = useApp();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const columns = [
    { title: "Quick Links", links: quickLinks },
    { title: "Services", links: serviceLinks },
    { title: "Technologies", links: techLinks },
    {
      title: "Social",
      links: socialLinks.map((l) => ({ label: l.name, href: l.href })),
    },
  ];

  return (
    <footer className="relative overflow-hidden rounded-t-card bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-1/4 top-0 size-[32rem] animate-pulse rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 size-[28rem] animate-pulse rounded-full bg-white/5 blur-3xl" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="shell relative z-10 pb-10 pt-20 lg:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            requireIntro={false}
            stagger={100}
            className="max-w-[16ch] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
            lines={["Have a project in mind?", "Let's get to work."]}
          />
          <MagneticWrap>
            <HoverSpring scale={1.04}>
              <PillButton variant="light" arrow="up-right" onClick={openModal}>
                Hire Me
              </PillButton>
            </HoverSpring>
          </MagneticWrap>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <LogoMark className="size-5 text-accent-from" />
              Faizan
            </span>
            <p className="mt-4 max-w-xs text-sm text-white/55">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex gap-2">
              {socialLinks.map((link) => (
                <SocialIcon
                  key={link.name}
                  link={link}
                  className="grid size-9 place-items-center rounded-pill bg-white/10 text-white/80 transition hover:bg-white/20"
                />
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-wider text-white/40">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <a
                      href={link.href}
                      className="text-sm text-white/65"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      <HoverSpring translateX={4}>
                        <span className="inline-block">{link.label}</span>
                      </HoverSpring>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <button
            type="button"
            onClick={scrollTop}
            suppressHydrationWarning
            className="rounded-pill border border-white/15 px-4 py-2 text-white/70 transition hover:border-white/40 hover:text-white"
          >
            Back to top ↑
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-6 select-none text-center text-watermark font-bold leading-none text-white/[0.05]">
        FAIZAN
      </div>
    </footer>
  );
}
