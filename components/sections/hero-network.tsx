"use client";

import { motion } from "framer-motion";

export const NETWORK_NODES = {
  portrait: { x: 50, y: 48 },
  terminal: { x: 18, y: 18 },
  api: { x: 82, y: 16 },
  database: { x: 16, y: 72 },
  github: { x: 84, y: 38 },
  deploy: { x: 18, y: 88 },
  ai: { x: 82, y: 78 },
  backend: { x: 20, y: 42 },
  code: { x: 80, y: 58 },
} as const;

type NodeKey = keyof typeof NETWORK_NODES;

const EDGES: [NodeKey, NodeKey][] = [
  ["terminal", "portrait"],
  ["api", "portrait"],
  ["database", "portrait"],
  ["github", "portrait"],
  ["deploy", "portrait"],
  ["ai", "portrait"],
  ["backend", "portrait"],
  ["code", "portrait"],
];

function toCoord(x: number, y: number, w: number, h: number) {
  return { cx: (x / 100) * w, cy: (y / 100) * h };
}

export function HeroNetworkMesh({
  width,
  height,
  visible,
}: {
  width: number;
  height: number;
  visible: boolean;
}) {
  if (!visible || width === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.08" />
        </linearGradient>
        <filter id="hero-glow">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {EDGES.map(([a, b], i) => {
        const na = toCoord(NETWORK_NODES[a].x, NETWORK_NODES[a].y, width, height);
        const nb = toCoord(NETWORK_NODES[b].x, NETWORK_NODES[b].y, width, height);
        const d = `M ${na.cx} ${na.cy} L ${nb.cx} ${nb.cy}`;

        return (
          <g key={`${a}-${b}`}>
            <motion.path
              d={d}
              fill="none"
              stroke="url(#hero-circuit-grad)"
              strokeWidth="0.75"
              strokeDasharray="2 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5, strokeDashoffset: [0, -16] }}
              transition={{
                pathLength: { duration: 0.8, delay: 0.1 + i * 0.04 },
                opacity: { duration: 0.4 },
                strokeDashoffset: { duration: 3 + (i % 4) * 0.4, repeat: Infinity, ease: "linear" },
              }}
            />
            <motion.circle
              r="1.4"
              fill="#22d3ee"
              filter="url(#hero-glow)"
              animate={{ opacity: [0.4, 1, 0.4], r: [1.1, 1.6, 1.1] }}
              transition={{ duration: 2, delay: i * 0.12, repeat: Infinity }}
            >
              <animateMotion dur={`${3.5 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={d} />
            </motion.circle>
          </g>
        );
      })}

      {(Object.entries(NETWORK_NODES) as [NodeKey, { x: number; y: number }][]).map(
        ([key, node], i) => {
          const { cx, cy } = toCoord(node.x, node.y, width, height);
          if (key === "portrait") return null;
          return (
            <motion.circle
              key={key}
              cx={cx}
              cy={cy}
              r="1.5"
              fill="rgba(124,58,237,0.5)"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3, delay: i * 0.22, repeat: Infinity }}
            />
          );
        },
      )}
    </svg>
  );
}
