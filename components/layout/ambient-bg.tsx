"use client";

/** Global atmosphere — grid, noise, floating orbs; adapts to light/dark via CSS */
export function AmbientBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-background" />
      <div
        className="ambient-grid absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(207,128,71,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(207,128,71,.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="code-rain absolute inset-0 opacity-[0.03]" />
      <div className="ambient-orb absolute -left-32 top-[15%] size-[28rem] rounded-full bg-accent/10 blur-[100px]" />
      <div className="ambient-orb absolute -right-24 top-[50%] size-[24rem] rounded-full bg-accent-from/8 blur-[90px]" />
      <div className="ambient-orb absolute bottom-[8%] left-[25%] size-72 rounded-full bg-[#1a1040]/40 blur-[80px]" />
    </div>
  );
}
