/** Thin glowing separator — no extra vertical gap */
export function SectionDivider() {
  return (
    <div className="shell py-0" aria-hidden>
      <div className="relative h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
        <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-pill bg-accent-from shadow-[0_0_12px_rgba(207,128,71,0.6)]" />
      </div>
    </div>
  );
}
