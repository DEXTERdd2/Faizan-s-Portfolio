"use client";

import Image from "next/image";

/** Displays admin/dashboard screenshots in a browser frame — no cropping */
export function ProjectPreviewFrame({
  src,
  alt,
  url = "pearly.store/admin",
  priority = false,
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
}) {
  return (
    <div className="flex h-full min-h-[280px] flex-col bg-gradient-to-br from-[#0c1018] via-[#0a0e16] to-[#141820] p-4 lg:min-h-[420px] lg:p-6">
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#faf8f5] shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-black/5 bg-[#f3f0eb] px-4 py-2.5">
          <span className="size-2.5 rounded-pill bg-[#ff5f57]" />
          <span className="size-2.5 rounded-pill bg-[#febc2e]" />
          <span className="size-2.5 rounded-pill bg-[#28c840]" />
          <div className="mx-auto max-w-[60%] flex-1 truncate rounded-md bg-white/80 px-3 py-1 text-center text-[0.65rem] text-black/40">
            {url}
          </div>
        </div>
        <div className="relative flex-1 bg-[#faf8f5]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            unoptimized
            className="object-contain object-left-top p-1"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
