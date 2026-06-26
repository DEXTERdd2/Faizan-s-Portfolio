"use client";

import { services } from "@/data/site-data";
import { ArrowUpRight } from "@/components/lumora/icons";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";

const groups = [
  {
    title: "Development",
    ids: ["fullstack", "frontend", "backend", "api", "enterprise", "database", "performance"],
  },
  {
    title: "AI & Automation",
    ids: ["ai-auto", "workflow", "chatbots", "biz-auto"],
  },
  {
    title: "Consulting & Cloud",
    ids: ["cloud", "consulting"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative section-bg">
      <div className="shell py-14 lg:py-20">
        <Reveal><Eyebrow>Services</Eyebrow></Reveal>
        <LineReveal
          delay={120}
          requireIntro={false}
          className="mb-3 mt-5 max-w-[16ch] text-4xl font-semibold tracking-tight sm:text-5xl"
          lines={["What I offer"]}
        />
        <Reveal delay={150} className="mb-10 max-w-xl text-sm text-foreground/60">
          End-to-end engineering for startups, agencies, and enterprise teams — from architecture to AI automation.
        </Reveal>

        <div className="space-y-12">
          {groups.map((group, gi) => {
            const items = services.filter((s) => group.ids.includes(s.id));
            if (!items.length) return null;

            return (
              <div key={group.title}>
                <Reveal delay={gi * 80}>
                  <h3 className="mb-5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    {"// "}{group.title}
                  </h3>
                </Reveal>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((service, i) => (
                    <Reveal key={service.id} delay={gi * 80 + i * 50} y={20}>
                      <li>
                        <HoverSpring translateY={-6} scale={1.01}>
                          <a
                            href="#contact"
                            className="group flex h-full flex-col rounded-2xl border border-line card-surface p-5 backdrop-blur-sm transition-colors duration-300"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="font-mono text-xs text-foreground/40">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="grid size-9 place-items-center rounded-pill bg-ink text-white transition group-hover:bg-accent group-hover:shadow-[0_0_16px_rgba(177,95,44,0.4)]">
                                <ArrowUpRight className="size-3.5" />
                              </span>
                            </div>
                            <h4 className="mt-3 text-lg font-semibold tracking-tight">{service.title}</h4>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/55">
                              {service.description}
                            </p>
                          </a>
                        </HoverSpring>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
