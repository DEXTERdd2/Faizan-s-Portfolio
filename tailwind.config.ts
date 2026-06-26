import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: "#0a0a0a",
        muted: "var(--muted)",
        subtle: "#b6b6b6",
        line: "var(--line)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        card: "var(--card)",
        section: "var(--section)",
        accent: {
          DEFAULT: "#b15f2c",
          from: "#cf8047",
          to: "#97501f",
        },
        hero: {
          from: "#ecebe9",
          to: "#c9c9c9",
        },
      },
      fontFamily: {
        sans: ["Onest", "system-ui", "sans-serif"],
      },
      maxWidth: {
        shell: "88rem",
      },
      borderRadius: {
        card: "2rem",
        "card-sm": "1.25rem",
        control: "0.875rem",
        pill: "9999px",
      },
      fontSize: {
        watermark: "13rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
