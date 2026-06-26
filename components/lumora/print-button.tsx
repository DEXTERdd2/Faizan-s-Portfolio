"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-control bg-ink px-5 py-2.5 text-sm font-medium text-white"
    >
      Download / Print PDF
    </button>
  );
}
