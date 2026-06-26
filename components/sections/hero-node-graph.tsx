"use client";

import { motion } from "framer-motion";

const roles = [
  "Full Stack Developer",
  "ASP.NET Core Engineer",
  "Backend Architect",
];

export function HeroRoleGraph({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="relative mt-8 hidden lg:block">
      <ul className="space-y-4">
        {roles.map((role, i) => (
          <motion.li
            key={role}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="size-2 shrink-0 rounded-pill bg-accent-from ring-2 ring-accent/30" />
            <span className="text-sm font-medium text-white/80">{role}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function HeroSocialGraph({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible: boolean;
}) {
  if (!visible) {
    return <div className="mt-8 flex flex-wrap gap-3">{children}</div>;
  }

  return (
    <div className="mt-8 flex flex-wrap justify-end gap-3 lg:mt-6">
      {children}
    </div>
  );
}
