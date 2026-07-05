"use client";

import { siteConfig, socialLinks } from "@/data/site-data";
import { useApp } from "@/components/lumora/app-context";
import { LogoMark } from "@/components/lumora/icons";
import { PillButton } from "@/components/lumora/pill-button";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { MagneticWrap } from "@/components/lumora/magnetic-wrap";
import { SocialIcon } from "@/components/lumora/social-icon";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#works" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const { openModal } = useApp();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer-surface relative mt-auto overflow-hidden border-t border-line">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        aria-hidden
      />

      <div className="shell relative z-10 py-12 lg:py-14">
        {/* CTA row */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-accent">Let&apos;s collaborate</p>
            <h2 className="mt-1 max-w-md text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Have a project in mind? Let&apos;s get to work.
            </h2>
          </div>
          <MagneticWrap>
            <HoverSpring scale={1.04}>
              <PillButton variant="dark" arrow="up-right" onClick={openModal}>
                Hire Me
              </PillButton>
            </HoverSpring>
          </MagneticWrap>
        </div>

        <div className="my-10 h-px bg-line" />

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <span className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <LogoMark className="size-5 text-accent-from" />
              Faizan
            </span>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/55">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex justify-center gap-2 md:justify-start">
              {socialLinks.map((link) => (
                <SocialIcon
                  key={link.name}
                  link={link}
                  className="grid size-9 place-items-center rounded-pill border border-line bg-surface text-foreground/65 transition hover:border-accent/35 hover:text-accent"
                />
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/40">
              Navigation
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-foreground/60 transition hover:text-accent">
                    <HoverSpring translateX={3}>
                      <span className="inline-block">{link.label}</span>
                    </HoverSpring>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/40">
              Get in touch
            </p>
            <ul className="mt-4 space-y-3 text-sm text-foreground/60">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition hover:text-accent">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.location}</li>
              <li>
                <a
                  href={siteConfig.resumeUrl}
                  className="inline-flex items-center gap-1.5 text-accent transition hover:underline"
                >
                  Download Resume →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-foreground/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={scrollTop}
            suppressHydrationWarning
            className="rounded-pill border border-line px-4 py-2 text-foreground/60 transition hover:border-accent/40 hover:text-accent"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
