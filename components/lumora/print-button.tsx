"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-pill border border-line bg-surface-elevated px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent"
    >
      Download / Print PDF
    </button>
  );
}
