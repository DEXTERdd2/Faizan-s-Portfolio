"use client";

import { certifications } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { ArrowUpRight } from "@/components/lumora/icons";

export function Certifications() {
  return (
    <section id="certifications" className="relative section-bg">
      <div className="shell section-spacing">
        <div className="mb-10 text-center">
          <Reveal><Eyebrow className="rounded-pill border border-line px-4 py-1.5">Credentials</Eyebrow></Reveal>
          <LineReveal
            delay={120}
            requireIntro={false}
            className="mx-auto mt-4 w-fit text-4xl font-semibold tracking-tight sm:text-5xl"
            lines={["Certifications & Badges"]}
          />
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const inner = (
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-line card-surface p-5 backdrop-blur-sm">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-from/20 to-accent/10 font-mono text-lg font-bold text-accent">
                  {cert.badge}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold leading-snug">{cert.title}</h3>
                  <p className="mt-1 text-sm text-foreground/55">{cert.issuer}</p>
                  <p className="mt-2 text-xs font-medium text-accent">{cert.year}</p>
                </div>
                {cert.url && (
                  <span className="grid size-8 place-items-center rounded-pill bg-surface text-foreground/40 transition group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                )}
              </div>
            );

            return (
              <Reveal key={cert.id} delay={i * 80} y={20}>
                <li>
                  <HoverSpring translateY={-5}>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </HoverSpring>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
