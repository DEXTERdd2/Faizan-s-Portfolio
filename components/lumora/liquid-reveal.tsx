"use client";

import { useEffect, useRef } from "react";
import { HERO_AFTER, HERO_BEFORE } from "@/lib/lumora";

const BRUSH_RADIUS = 143;
const DECAY = 0.016;

export function LiquidReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let radius = BRUSH_RADIUS * dpr;
    let coverCanvas: HTMLCanvasElement | null = null;
    let brushCanvas: HTMLCanvasElement | null = null;
    let afterImg: HTMLImageElement | null = null;
    let points: { x: number; y: number }[] = [];
    let last: { x: number; y: number } | null = null;
    let idle = 0;
    let raf = 0;
    let drawing = false;

    const setup = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width * dpr;
      height = rect.height * dpr;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      radius = BRUSH_RADIUS * dpr;

      coverCanvas = document.createElement("canvas");
      coverCanvas.width = width;
      coverCanvas.height = height;
      const coverCtx = coverCanvas.getContext("2d");
      if (coverCtx && afterImg?.complete) {
        const img = afterImg;
        const scale = Math.max(width / img.width, height / img.height);
        const sw = img.width * scale;
        const sh = img.height * scale;
        coverCtx.drawImage(img, (width - sw) / 2, (height - sh) / 2, sw, sh);
      }

      const diam = Math.ceil(radius * 2);
      brushCanvas = document.createElement("canvas");
      brushCanvas.width = diam;
      brushCanvas.height = diam;
    };

    afterImg = new Image();
    afterImg.crossOrigin = "anonymous";
    afterImg.src = HERO_AFTER;
    afterImg.onload = setup;

    const stamp = (x: number, y: number) => {
      if (!brushCanvas || !coverCanvas) return;
      const bctx = brushCanvas.getContext("2d");
      if (!bctx) return;
      const c = radius;
      const diam = c * 2;
      bctx.clearRect(0, 0, diam, diam);
      const grad = bctx.createRadialGradient(c, c, 0, c, c, c);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.55, "rgba(255,255,255,0.82)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      bctx.fillStyle = grad;
      bctx.fillRect(0, 0, diam, diam);
      bctx.globalCompositeOperation = "source-in";
      bctx.drawImage(coverCanvas, x - c, y - c, diam, diam, 0, 0, diam, diam);
      bctx.globalCompositeOperation = "source-over";
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(brushCanvas, x - c, y - c);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      if (x < -radius || y < -radius || x > width + radius || y > height + radius) {
        last = null;
        return;
      }
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const step = Math.max(radius * 0.3, 1);
        const n = Math.min(Math.ceil(dist / step), 60);
        for (let i = 1; i <= n; i++) {
          points.push({
            x: last.x + (dx * i) / n,
            y: last.y + (dy * i) / n,
          });
        }
      } else {
        points.push({ x, y });
      }
      last = { x, y };
      drawing = true;
    };

    const tick = () => {
      if (points.length) {
        idle = 0;
        drawing = true;
      } else {
        idle++;
        if (idle > 120) {
          ctx.clearRect(0, 0, width, height);
          drawing = false;
          raf = requestAnimationFrame(tick);
          return;
        }
      }

      const fade = drawing
        ? DECAY
        : Math.min(DECAY + idle * 0.004, 0.5);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      if (points.length) {
        for (const p of points) stamp(p.x, p.y);
        points = [];
        drawing = true;
      } else {
        drawing = false;
      }

      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(setup);
    ro.observe(container);
    window.addEventListener("pointermove", onPointerMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_BEFORE}
        alt=""
        className="absolute inset-0 size-full object-cover grayscale"
      />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 size-full" aria-hidden />
    </div>
  );
}
