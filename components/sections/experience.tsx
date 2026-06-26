"use client";

import { useState } from "react";
import { experiences } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { motion } from "framer-motion";

function CompanyLogo({ abbr }: { abbr: string }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-control border border-line bg-surface-elevated text-sm font-bold text-accent shadow-sm">
      {abbr}
    </span>
  );
}

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id ?? null);

  return (
    <section id="experience" className="relative section-bg">
      <div className="shell py-14 lg:py-20">
        <Reveal><Eyebrow>Experience</Eyebrow></Reveal>
        <LineReveal
          delay={120}
          requireIntro={false}
          className="mb-12 mt-5 max-w-[16ch] text-4xl font-semibold tracking-tight sm:text-5xl"
          lines={["Professional Journey"]}
        />

        <div className="relative max-w-4xl">
          <motion.div
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-accent/50 via-line to-transparent md:left-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <ul className="space-y-6">
            {experiences.map((exp, i) => {
              const isExpanded = expandedId === exp.id;
              const isLeft = i % 2 === 0;

              return (
                <Reveal key={exp.id} delay={i * 80} y={24}>
                  <li
                    className={`relative flex ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                    onMouseEnter={() => setExpandedId(exp.id)}
                    onClick={() => setExpandedId(exp.id)}
                  >
                    <motion.div
                      className="absolute left-4 z-10 size-3 -translate-x-1/2 rounded-pill bg-accent ring-4 ring-white md:left-1/2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 260 }}
                    />

                    <article
                      className={`ml-10 w-full cursor-pointer rounded-card-sm border border-line card-surface p-6 backdrop-blur-sm transition-all duration-500 hover:bg-surface hover:shadow-sm md:ml-0 md:w-[calc(50%-2rem)] ${
                        isExpanded ? "bg-surface shadow-sm ring-1 ring-accent/20" : ""
                      }`}
                    >
                      <div className="flex flex-wrap items-start gap-4">
                        {exp.logo && <CompanyLogo abbr={exp.logo} />}
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-medium uppercase tracking-wider text-accent">{exp.period}</span>
                          <h3 className="mt-1 text-xl font-semibold">{exp.company}</h3>
                          <p className="text-sm text-foreground/60">{exp.role}</p>
                        </div>
                        <span className="text-xs text-foreground/45">{exp.location}</span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-foreground/70">{exp.description}</p>

                      <div
                        className="grid transition-all duration-500"
                        style={{
                          gridTemplateRows: isExpanded ? "1fr" : "0fr",
                          opacity: isExpanded ? 1 : 0,
                        }}
                      >
                        <div className="overflow-hidden">
                          <div className="mt-4 border-t border-line pt-4">
                            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground/45">
                              Responsibilities
                            </p>
                            <ul className="space-y-2">
                              {exp.responsibilities.map((r) => (
                                <li key={r} className="flex gap-2 text-sm text-foreground/60">
                                  <span className="mt-2 size-1.5 shrink-0 rounded-pill bg-foreground/30" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <ul className="mt-4 space-y-2 border-t border-line pt-4">
                            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground/45">
                              Major Achievements
                            </p>
                            {exp.achievements.map((a) => (
                              <li key={a} className="flex gap-2 text-sm text-foreground/60">
                                <span className="mt-2 size-1.5 shrink-0 rounded-pill bg-accent" />
                                {a}
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span key={tech} className="rounded-control bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {!isExpanded && (
                        <p className="mt-3 text-xs text-foreground/40">Click to expand details</p>
                      )}
                    </article>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
