"use client";

import { useState } from "react";
import { siteConfig, socialLinks } from "@/data/site-data";
import { Eyebrow } from "@/components/lumora/eyebrow";
import { LineReveal, Reveal } from "@/components/lumora/text-reveal";
import { PillButton } from "@/components/lumora/pill-button";
import { LogoMark } from "@/components/lumora/icons";
import { HoverSpring } from "@/components/lumora/hover-spring";
import { MagneticWrap } from "@/components/lumora/magnetic-wrap";
import type { ContactFormData } from "@/types";

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Partial<ContactFormData> = {};
    if (!formData.name.trim()) e.name = "Required";
    if (!formData.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.subject.trim()) e.subject = "Required";
    if (!formData.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("fail");
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setErrors({ message: "Failed to send. Please try again." });
    } finally {
      setSending(false);
    }
  };

  const github = socialLinks.find((l) => l.name === "GitHub");
  const linkedin = socialLinks.find((l) => l.name === "LinkedIn");

  const contactInfo = [
    { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { label: "WhatsApp", value: "Message on WhatsApp", href: `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}` },
    { label: "Location", value: siteConfig.location, href: null },
    { label: "LinkedIn", value: "Connect", href: linkedin?.href },
    { label: "GitHub", value: "View profile", href: github?.href },
  ];

  return (
    <section id="contact" className="relative section-bg">
      <div className="shell section-spacing">
        <Reveal><Eyebrow>Contact</Eyebrow></Reveal>
        <LineReveal
          delay={120}
          requireIntro={false}
          className="mb-12 mt-5 max-w-[16ch] text-4xl font-semibold tracking-tight sm:text-5xl"
          lines={["Let's build something great"]}
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal y={20} className="lg:col-span-2">
            <div className="relative rounded-card border border-line bg-surface/30 p-6 pt-14 sm:p-8 sm:pt-16">
              <div className="absolute left-4 right-4 top-4 flex justify-end sm:left-auto sm:right-4">
                <span className="inline-flex max-w-full items-center gap-2 rounded-pill border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                  <span className="size-2 animate-pulse rounded-pill bg-emerald-500" />
                  Available for new projects
                </span>
              </div>

              <h3 className="text-lg font-semibold">Get in touch</h3>
              <p className="mt-2 text-sm text-foreground/60">
                Open to freelance, contract, and full-time opportunities with international clients.
              </p>

              <div className="mt-6 space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground/45">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-sm font-medium hover:text-accent"
                        target={item.label !== "Email" ? "_blank" : undefined}
                        rel="noreferrer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <MagneticWrap>
                  <HoverSpring scale={1.03}>
                    <PillButton variant="dark" href={siteConfig.calendlyUrl} arrow="up-right">
                      Book a Call
                    </PillButton>
                  </HoverSpring>
                </MagneticWrap>
                <HoverSpring scale={1.03}>
                  <PillButton variant="outline" href={siteConfig.resumeUrl}>
                    Download Resume
                  </PillButton>
                </HoverSpring>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} y={20} className="lg:col-span-3">
            {success ? (
              <div className="flex flex-col items-center gap-4 rounded-card border border-line bg-surface/40 py-16 text-center">
                <div className="grid size-14 place-items-center rounded-pill bg-ink text-accent-from">
                  <LogoMark className="size-6" />
                </div>
                <h3 className="text-xl font-semibold">Message sent!</h3>
                <p className="text-sm text-foreground/60">I&apos;ll get back to you within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-card border border-line card-surface p-6 shadow-sm backdrop-blur-xl sm:p-8"
                autoComplete="off"
                data-form-type="other"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {(["name", "email"] as const).map((field) => (
                    <label key={field} className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">{field}</span>
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        className="rounded-control border border-line bg-surface-elevated px-4 py-3 text-sm outline-none transition focus:border-accent/40"
                        placeholder={field === "email" ? "you@company.com" : "Your name"}
                        autoComplete="off"
                        data-lpignore="true"
                        data-1p-ignore="true"
                        suppressHydrationWarning
                      />
                      {errors[field] && <span className="text-xs text-red-500">{errors[field]}</span>}
                    </label>
                  ))}
                </div>
                <label className="mt-4 flex flex-col gap-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">Subject</span>
                  <input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="rounded-control border border-line bg-surface-elevated px-4 py-3 text-sm outline-none transition focus:border-accent/40"
                    placeholder="Project inquiry"
                    autoComplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    suppressHydrationWarning
                  />
                  {errors.subject && <span className="text-xs text-red-500">{errors.subject}</span>}
                </label>
                <label className="mt-4 flex flex-col gap-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">Message</span>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="resize-none rounded-control border border-line bg-surface-elevated px-4 py-3 text-sm outline-none transition focus:border-accent/40"
                    placeholder="Tell me about your project..."
                    autoComplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    suppressHydrationWarning
                  />
                  {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
                </label>
                <div className="mt-6">
                  <PillButton type="submit" variant="dark" arrow="up-right" disabled={sending}>
                    {sending ? "Sending…" : "Send Message"}
                  </PillButton>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
