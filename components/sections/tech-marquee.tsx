"use client";

import { techLogos } from "@/data/site-data";
import { HoverSpring } from "@/components/lumora/hover-spring";

function MarqueeRow({ logos, reverse = false }: { logos: typeof techLogos; reverse?: boolean }) {
  const items = [...logos, ...logos];
  return (
    <div className="relative flex overflow-hidden py-3">
      <div
        className={`flex items-center gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {items.map((logo, i) => (
          <HoverSpring key={`${logo.name}-${i}`} scale={1.04}>
            <div className="group flex items-center gap-3 whitespace-nowrap rounded-control border border-line bg-surface/50 px-5 py-2.5 transition-colors duration-300 hover:border-accent/30 hover:bg-surface-elevated">
              <span
                className="size-2 rounded-pill bg-foreground/20 transition-colors duration-300 group-hover:bg-[var(--logo-color)]"
                style={{ "--logo-color": logo.color } as React.CSSProperties}
              />
              <span className="text-sm font-medium text-foreground/40 transition-colors duration-300 group-hover:text-foreground">
                {logo.name}
              </span>
            </div>
          </HoverSpring>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  const first = techLogos.slice(0, 6);
  const second = techLogos.slice(6);

  return (
    <section className="overflow-hidden border-y border-line section-bg py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-foreground/45">
        Technologies I work with
      </p>
      <MarqueeRow logos={first} />
      <MarqueeRow logos={second} reverse />
    </section>
  );
}
