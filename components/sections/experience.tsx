"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiences } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { ExperienceAmbient } from "@/components/sections/experience-ambient";
import { ExperienceCard } from "@/components/sections/experience-card";
import { ExperienceHeaderBand } from "@/components/sections/experience-header-band";

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.35"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative overflow-hidden section-bg">
      <ExperienceAmbient />

      <div className="shell relative py-14 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Experience</Eyebrow>
            </Reveal>
            <LineReveal
              delay={80}
              requireIntro={false}
              className="mt-4 max-w-[16ch] text-4xl font-semibold tracking-tight sm:text-5xl"
              lines={["Professional Journey"]}
            />
          </div>
          <Reveal delay={100} className="max-w-md text-sm text-foreground/50 lg:text-right">
            Leadership, enterprise delivery, and technical growth across global clients.
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-8">
          <ExperienceHeaderBand />
        </Reveal>

        {/* Full-width timeline — left rail, no center gap */}
        <div ref={listRef} className="relative mt-8">
          <div className="pointer-events-none absolute bottom-0 left-[7px] top-0 w-px sm:left-[9px]">
            <div className="absolute inset-0 bg-line/70" />
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-accent via-accent/50 to-transparent"
              style={{ scaleY: lineScale, height: "100%" }}
            />
          </div>

          <ul className="space-y-5 sm:space-y-6">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
