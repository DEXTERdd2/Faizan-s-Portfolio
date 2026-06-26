"use client";

import { useEffect, useState } from "react";
import { useApp } from "./app-context";
import { LogoMark, XIcon } from "./icons";
import { PillButton } from "./pill-button";

export function RequestModal() {
  const { modalOpen, closeModal } = useApp();
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  useEffect(() => {
    if (!modalOpen) {
      const t = setTimeout(() => {
        setSuccess(false);
        setSending(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [modalOpen]);

  if (!modalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-foreground/30 p-4 backdrop-blur-xl sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-card bg-surface-elevated p-6 shadow-2xl ring-1 ring-line sm:p-8"
        onClick={(e) => e.stopPropagation()}
        style={{
          opacity: 1,
          transform: "translateY(0)",
          transition: "opacity 0.5s, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-pill bg-surface text-foreground/60 transition hover:bg-surface-2 hover:text-foreground"
          aria-label="Close"
        >
          <XIcon className="size-4" />
        </button>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="grid size-14 place-items-center rounded-pill bg-ink text-accent-from">
              <LogoMark className="size-6" />
            </div>
            <h2 className="text-2xl font-semibold">Request received</h2>
            <p className="max-w-xs text-sm text-foreground/60">
              Thanks for reaching out — we&apos;ll get back to you within one business day.
            </p>
            <PillButton variant="dark" onClick={closeModal}>
              Close
            </PillButton>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-1.5">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60">
                <span className="size-1.5 rounded-pill bg-accent" />
                Start a project
              </span>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Tell us what you&apos;re building.
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                { id: "email", label: "Email", type: "email", placeholder: "you@company.com" },
              ].map((field) => (
                <label key={field.id} className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">
                    {field.label}
                  </span>
                  <input
                    required
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full rounded-control border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent/40 focus:bg-surface-elevated"
                  />
                </label>
              ))}
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">
                  Project
                </span>
                <textarea
                  required
                  rows={4}
                  placeholder="A few words about your project, timeline, and budget."
                  className="w-full resize-none rounded-control border border-line bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent/40 focus:bg-surface-elevated"
                />
              </label>

              <div className="mt-2 flex items-center justify-between gap-4">
                <p className="text-xs text-foreground/45">
                  We reply within one business day.
                </p>
                <PillButton
                  type="submit"
                  variant="dark"
                  arrow="up-right"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send request"}
                </PillButton>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
