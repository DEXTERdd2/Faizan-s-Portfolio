export const ASSET_BASE =
  "https://api.getlayers.ai/storage/v1/object/public/public/assets/lumora-e8b711fc68";

/** Dark developer workstation — grayscale base layer */
export const HERO_BEFORE =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa90?w=1920&q=85&auto=format&fit=crop&sat=-100";
/** Warm code reveal layer — painted on cursor trail */
export const HERO_AFTER =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=85&auto=format&fit=crop";

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function applyAdaptiveGrid(): void {
  const FONT_BASE = 16;
  const baseWidth = 1920;
  const coef = 0.6666;
  const w = window.innerWidth;
  const widthReduction = ((baseWidth - w) / baseWidth) * 100;
  const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
  if (size > FONT_BASE) {
    document.documentElement.style.fontSize = `${size}px`;
  } else {
    document.documentElement.style.removeProperty("font-size");
  }
}

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function formatClockTime(date: Date): string {
  const h = date.getHours() % 12 || 12;
  const m = date.getMinutes().toString().padStart(2, "0");
  const mer = date.getHours() >= 12 ? "pm" : "am";
  return `${h}:${m}${mer}`;
}

export function formatClockDate(date: Date): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export interface SpringConfig {
  tension: number;
  friction: number;
}

export function createSpring(
  config: SpringConfig,
  onUpdate: (value: number) => void
) {
  let x = 0;
  let v = 0;
  let target = 0;
  let raf = 0;

  const step = () => {
    const accel = config.tension * (target - x) - config.friction * v;
    v += accel * (1 / 60);
    x += v * (1 / 60);
    onUpdate(x);
    if (Math.abs(target - x) > 0.001 || Math.abs(v) > 0.001) {
      raf = requestAnimationFrame(step);
    }
  };

  return {
    set(v: number) {
      target = v;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    },
    get() {
      return x;
    },
    destroy() {
      cancelAnimationFrame(raf);
    },
  };
}
