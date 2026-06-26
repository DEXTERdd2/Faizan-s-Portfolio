import { experiences, siteConfig, skillCategories, socialLinks } from "@/data/site-data";
import { PrintButton } from "@/components/lumora/print-button";
import Link from "next/link";

export const metadata = {
  title: `Resume | ${siteConfig.name}`,
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <div className="shell max-w-3xl py-16 print:py-8">
        <div className="mb-8 flex items-center justify-between print:hidden">
          <Link href="/" className="text-sm text-foreground/60 hover:text-foreground">
            ← Back to portfolio
          </Link>
          <PrintButton />
        </div>

        <header className="border-b border-line pb-8">
          <h1 className="text-4xl font-bold tracking-tight">{siteConfig.name}</h1>
          <p className="mt-2 text-lg text-foreground/70">{siteConfig.title}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-foreground/60">
            <span>{siteConfig.email}</span>
            <span>{siteConfig.phone}</span>
            <span>{siteConfig.location}</span>
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-accent hover:underline">
                {link.name}
              </a>
            ))}
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">Summary</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">{siteConfig.description}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">Experience</h2>
          <div className="mt-4 space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <span className="text-sm text-foreground/50">{exp.period}</span>
                </div>
                <p className="text-sm font-medium text-foreground/70">{exp.role}</p>
                <p className="mt-2 text-sm text-foreground/60">{exp.description}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/70">
                  {exp.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-foreground/50">
                  {exp.technologies.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">Skills</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {skillCategories.map((cat) => (
              <div key={cat.name}>
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="mt-1 text-sm text-foreground/70">{cat.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
