"use client";

import { useEffect, useState } from "react";

/** Returns false on the server and first client render, true after mount. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
