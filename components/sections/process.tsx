"use client";

import { processSteps } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";

export function Process() {
  return (
    <section id="process" className="relative section-bg">
      <div className="shell py-14 lg:py-20">
        <div className="mb-10 text-center">
          <Reveal><Eyebrow className="rounded-pill border border-line px-4 py-1.5">How I Work</Eyebrow></Reveal>
          <LineReveal
            delay={120}
            requireIntro={false}
            className="mx-auto mt-4 w-fit text-4xl font-semibold tracking-tight sm:text-5xl"
            lines={["From discovery to deployment"]}
          />
          <Reveal delay={200} className="mx-auto mt-3 max-w-xl text-sm text-foreground/60">
            A proven engineering process built for enterprise clients — transparent, iterative, and delivery-focused.
          </Reveal>
        </div>

        <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent xl:block" />
          {processSteps.map((step, i) => (
            <Reveal key={step.id} delay={i * 70} y={20}>
              <li>
                <HoverSpring translateY={-4}>
                  <div className="group relative h-full rounded-2xl border border-line/80 card-surface p-4 backdrop-blur-sm">
                    <span className="inline-flex size-8 items-center justify-center rounded-pill bg-surface font-mono text-xs font-bold text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-sm font-semibold">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/55">{step.description}</p>
                  </div>
                </HoverSpring>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
