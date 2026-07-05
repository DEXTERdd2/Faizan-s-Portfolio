"use client";

import { motion } from "framer-motion";
import { PillButton } from "@/components/lumora/pill-button";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { Reveal, WordReveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { SocialIcon } from "@/components/lumora/social-icon";
import { AboutAmbient } from "@/components/sections/about-ambient";
import { AboutShowcase, AboutTechStrip } from "@/components/sections/about-visuals";
import { aboutHighlights, socialLinks } from "@/data/site-data";
import { useCountUp } from "@/hooks/use-mouse";

const highlights = [
  {
    title: "System Architecture",
    desc: "Scalable design, microservices, and enterprise cloud architecture",
  },
  {
    title: "Full Stack Development",
    desc: "End-to-end with ASP.NET Core, React, and modern web stacks",
  },
  {
    title: "Clean Architecture",
    desc: "SOLID principles, CQRS, and maintainable codebases",
  },
  {
    title: "AI Integration",
    desc: "LLM workflows, RAG pipelines, and intelligent automation",
    featured: true,
  },
];

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const { num, suffix } = parseStat(value);
  const { count, ref } = useCountUp(num, 1600);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className="about-stat"
    >
      <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
        <span className="text-accent">{count}{suffix}</span>
      </p>
      <p className="mt-1 text-[0.7rem] text-foreground/45">{label}</p>
    </motion.div>
  );
}

function ExpertiseCard({
  item,
  index,
}: {
  item: (typeof highlights)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={`group about-expertise ${item.featured ? "about-expertise-featured" : ""}`}
    >
      <span className="about-expertise-num">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground/55">{item.desc}</p>
      <span className="mt-4 block h-px w-8 bg-accent/40 transition-all duration-300 group-hover:w-full" />
    </motion.article>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden section-bg">
      <AboutAmbient />

      <div className="shell relative section-spacing">
        <AboutTechStrip />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left — story + showcase */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div>
              <Reveal>
                <Eyebrow>About Me</Eyebrow>
              </Reveal>
              <Reveal y={10} className="mt-5">
                <p className="text-sm leading-[1.75] text-foreground/65 sm:text-base">
                  I&apos;m a{" "}
                  <strong className="font-medium text-foreground">
                    Senior Full Stack Software Engineer
                  </strong>{" "}
                  with 5+ years building enterprise applications — ASP.NET Core, Azure, and
                  AI-powered systems for international clients.
                </p>
              </Reveal>
            </div>

            <AboutShowcase />

            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/60 sm:grid-cols-4">
                {aboutHighlights.map((s, i) => (
                  <StatItem key={s.label} value={s.value} label={s.label} index={i} />
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — headline + expertise */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            <WordReveal
              className="text-[1.65rem] font-medium leading-snug tracking-tight sm:text-3xl lg:text-[2.125rem]"
              text="I partner with ambitious teams to ship"
              mutedText="enterprise software, scalable APIs, and intelligent systems that drive growth."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item, i) => (
                <ExpertiseCard key={item.title} item={item} index={i} />
              ))}
            </div>

            <Reveal delay={200}>
              <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line/50 bg-surface/30 px-6 py-6 backdrop-blur-sm sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-medium tracking-wide text-foreground/40">
                    Connect
                  </p>
                  <div className="mt-3 flex gap-2">
                    {socialLinks.map((link) => (
                      <SocialIcon
                        key={link.name}
                        link={link}
                        className="grid size-10 place-items-center rounded-full border border-line bg-surface text-foreground/60 transition hover:border-accent/30 hover:text-accent"
                      />
                    ))}
                  </div>
                </div>
                <HoverSpring scale={1.03}>
                  <PillButton variant="outline" arrow="right" href="#experience">
                    View Experience
                  </PillButton>
                </HoverSpring>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
