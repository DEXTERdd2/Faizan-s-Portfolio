import { experiences, heroBio, siteConfig, skillCategories, socialLinks } from "@/data/site-data";
import { PrintButton } from "@/components/lumora/print-button";
import { ThemeToggle } from "@/components/lumora/theme-toggle";
import Link from "next/link";

export const metadata = {
  title: `Resume | ${siteConfig.name}`,
};

export default function ResumePage() {
  return (
    <div className="resume-page min-h-screen bg-background text-foreground print:bg-white print:text-black">
      <div className="shell max-w-3xl py-10 lg:py-16 print:max-w-none print:py-8">
        <div className="mb-8 flex items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="text-sm text-foreground/60 transition hover:text-accent"
          >
            ← Back to portfolio
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <PrintButton />
          </div>
        </div>

        <article className="card-surface rounded-card border p-8 sm:p-10 print:border-0 print:bg-white print:p-0 print:shadow-none">
          <header className="border-b border-line pb-8 print:border-black/20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent print:text-black/70">
              Curriculum Vitae
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">{siteConfig.name}</h1>
            <p className="mt-2 text-lg text-foreground/70 print:text-black/80">
              {siteConfig.title}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/60 print:text-black/70">
              <span>{siteConfig.email}</span>
              <span>{siteConfig.phone}</span>
              <span>{siteConfig.location}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-accent hover:underline print:text-black print:no-underline"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </header>

          <section className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-accent print:text-black/80">
              Summary
            </h2>
            <p className="mt-3 leading-relaxed text-foreground/80 print:text-black/90">
              {heroBio}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-accent print:text-black/80">
              Experience
            </h2>
            <div className="mt-4 space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{exp.company}</h3>
                    <span className="text-sm text-foreground/50 print:text-black/60">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground/70 print:text-black/80">
                    {exp.role}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </p>
                  <p className="mt-2 text-sm text-foreground/60 print:text-black/75">
                    {exp.description}
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/70 print:text-black/85">
                    {exp.achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-foreground/50 print:text-black/60">
                    {exp.technologies.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-accent print:text-black/80">
              Skills
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {skillCategories.map((cat) => (
                <div key={cat.name}>
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="mt-1 text-sm text-foreground/70 print:text-black/85">
                    {cat.skills.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
