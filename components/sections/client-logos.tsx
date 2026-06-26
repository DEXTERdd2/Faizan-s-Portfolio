"use client";

import { clientLogos } from "@/data/site-data";
import { Reveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";

function LogoStrip({ reverse = false }: { reverse?: boolean }) {
  const items = [...clientLogos, ...clientLogos];

  return (
    <div className="relative flex overflow-hidden py-2">
      <div
        className={`flex items-center gap-8 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {items.map((logo, i) => (
          <HoverSpring key={`${logo.name}-${i}`} scale={1.04} translateY={-2}>
            <div className="group flex items-center gap-3 whitespace-nowrap rounded-control border border-line bg-surface/40 px-6 py-3 transition-colors duration-300 hover:border-accent/30 hover:bg-surface-elevated">
              <span className="grid size-9 place-items-center rounded-control bg-foreground/8 text-xs font-bold text-foreground/35 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-accent-from group-hover:to-accent-to group-hover:text-white">
                {logo.abbr}
              </span>
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

export function ClientLogos() {
  return (
    <section id="clients" className="overflow-hidden border-y border-line section-bg py-12">
      <Reveal className="shell mb-8 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-foreground/45">
          Trusted by teams worldwide
        </p>
      </Reveal>
      <LogoStrip />
      <LogoStrip reverse />
    </section>
  );
}
