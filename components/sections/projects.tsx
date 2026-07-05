"use client";

import { useRef, useState } from "react";
import { projects, projectCategories } from "@/data/site-data";
import { ArrowUpRight, LogoMark } from "@/components/lumora/icons";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { useTilt } from "@/hooks/use-mouse";
import { PillButton } from "@/components/lumora/pill-button";
import { ProjectCoverImage } from "@/components/lumora/project-preview-frame";
import { motion } from "framer-motion";

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  useTilt(cardRef, 5);

  return (
    <Reveal delay={index * 90} y={48}>
      <div ref={cardRef} className="preserve-3d transition-transform duration-300">
        <HoverSpring translateY={-8} scale={1.012}>
          <article
            className="group overflow-hidden rounded-card bg-ink text-white ring-1 ring-white/5"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="relative h-52 overflow-hidden sm:h-64">
              <ProjectCoverImage
                projectId={project.id}
                variant="cover"
                image={project.image}
                alt={project.title}
                className="absolute inset-0 transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

              <motion.div
                initial={false}
                animate={{ opacity: hovered && project.results ? 1 : 0 }}
                className="absolute inset-0 flex items-end bg-ink/70 p-6 backdrop-blur-sm"
              >
                {project.results && (
                  <p className="text-sm leading-relaxed text-white/85">
                    <span className="font-medium text-accent-from">Impact · </span>
                    {project.results}
                  </p>
                )}
              </motion.div>

              <span className="absolute left-4 top-4 rounded-pill bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {project.category}
              </span>
              {project.stats && (
                <span className="absolute right-4 top-4 rounded-pill bg-accent/90 px-3 py-1 text-xs font-medium text-white">
                  {project.stats}
                </span>
              )}
            </div>

            <div className="relative p-6 sm:p-8">
              <div className="flex justify-between text-xs uppercase tracking-wide text-white/45">
                <span>{project.role}</span>
                <span className="grid size-10 place-items-center rounded-pill bg-white/10 ring-1 ring-white/15 transition group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              <div className="pointer-events-none absolute right-8 top-8 opacity-10">
                <LogoMark className="size-16" />
              </div>

              <h3 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">{project.title}</h3>
              <p className="mt-2 text-sm text-white/55">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-white/50">
                <span className="rounded-control bg-white/5 px-2.5 py-1">{project.duration}</span>
                <span className="rounded-control bg-white/5 px-2.5 py-1">{project.clientType}</span>
              </div>

              {project.solution && (
                <p className="mt-4 text-xs leading-relaxed text-white/45">
                  <span className="text-accent-from">Solution · </span>{project.solution}
                </p>
              )}

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.features.slice(0, 3).map((f) => (
                  <li key={f} className="text-xs text-white/45">• {f}</li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tag) => (
                  <span key={tag} className="rounded-pill border border-white/25 px-3 py-1.5 text-xs">{tag}</span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <PillButton variant="light">Live Demo</PillButton>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <PillButton variant="outline" className="!text-white !border-white/25">GitHub</PillButton>
                  </a>
                )}
                <PillButton variant="outline" className="!text-white !border-white/25" href={project.caseStudyUrl ?? "#"}>
                  Case Study
                </PillButton>
              </div>
            </div>
          </article>
        </HoverSpring>
      </div>
    </Reveal>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const portfolio = projects.filter((p) => !p.featured);
  const filtered =
    activeFilter === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === activeFilter);

  return (
    <section id="works" className="relative section-bg">
      <div className="shell pb-14 pt-8 lg:pb-20">
        <div className="mb-8 flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow className="rounded-pill border border-line px-4 py-1.5">Portfolio</Eyebrow>
          </Reveal>
          <LineReveal
            delay={120}
            requireIntro={false}
            className="mt-4 w-fit text-4xl font-semibold tracking-tight sm:text-5xl"
            lines={["Selected Work"]}
          />
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {projectCategories.map((cat) => (
            <button
              type="button"
              suppressHydrationWarning
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-pill px-4 py-2 text-sm font-medium transition ${
                activeFilter === cat ? "bg-ink text-white" : "bg-surface text-foreground/60 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, i) => (
            <li key={project.id}>
              <ProjectCard project={project} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
