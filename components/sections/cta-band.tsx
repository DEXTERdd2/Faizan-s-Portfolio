"use client";

import { useApp } from "@/components/lumora/app-context";
import { PillButton } from "@/components/lumora/pill-button";
import { MagneticWrap } from "@/components/lumora/magnetic-wrap";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { siteConfig } from "@/data/site-data";

export function CtaBand() {
  const { openModal } = useApp();

  return (
    <section className="relative section-bg py-12 lg:py-16">
      <div className="shell">
        <Reveal y={20}>
          <div className="relative overflow-hidden rounded-card border border-line bg-ink p-10 text-white sm:p-14 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-white/5 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <LineReveal
                  requireIntro={false}
                  className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
                  lines={["Ready to build", "something exceptional?"]}
                />
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                  Available for freelance, contract, and long-term engagements. Let&apos;s discuss your next enterprise project or AI automation initiative.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <MagneticWrap>
                  <PillButton variant="light" arrow="up-right" onClick={openModal}>
                    Start a Project
                  </PillButton>
                </MagneticWrap>
                <PillButton variant="outline" className="!border-white/25 !text-white" href={siteConfig.calendlyUrl}>
                  Book a Call
                </PillButton>
                <PillButton variant="outline" className="!border-white/25 !text-white" href={siteConfig.resumeUrl}>
                  Download Resume
                </PillButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
