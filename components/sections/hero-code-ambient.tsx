"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SNIPPETS = [
  { lang: "C#", code: "return Results.Ok(await _svc.GetAsync(id));" },
  { lang: "TS", code: "export async function handler(req: Request)" },
  { lang: "SQL", code: "SELECT Id FROM Users WHERE Active = 1" },
  { lang: "YAML", code: "services:\n  api:\n    build: ." },
  { lang: "Py", code: "@app.get('/health')\ndef health():" },
];

export function HeroCodeAmbient() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIdx((n) => (n + 1) % SNIPPETS.length), 5000);
    return () => clearInterval(id);
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute left-[4%] top-[22%] hidden max-w-[200px] font-mono text-[0.55rem] leading-relaxed text-violet-300/80 lg:block"
        >
          <span className="text-white/30">{`// ${SNIPPETS[idx].lang}`}</span>
          <br />
          {SNIPPETS[idx].code}
        </motion.div>
      </AnimatePresence>
      <motion.div
        className="pointer-events-none absolute bottom-[18%] right-[6%] hidden max-w-[180px] font-mono text-[0.5rem] text-cyan-300/60 lg:block"
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        az webapp deploy --slot production
      </motion.div>
    </>
  );
}
