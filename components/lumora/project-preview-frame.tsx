"use client";

import Image from "next/image";
import { ProjectDashboardArt } from "@/components/projects/project-dashboard-art";
import type { ProjectPreviewVariant } from "@/types";

/** Displays admin/dashboard previews in a browser frame */
export function ProjectPreviewFrame({
  projectId,
  variant = "dashboard",
  alt,
  url = "app.example/admin",
}: {
  projectId: string;
  variant?: ProjectPreviewVariant;
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
        <div className="relative min-h-[220px] flex-1 bg-[#faf8f5]">
          <ProjectDashboardArt
            projectId={projectId}
            variant={variant}
            className="absolute inset-0"
            aria-label={alt}
          />
        </div>
      </div>
    </div>
  );
}

/** Card / thumbnail cover — dashboard mockup or legacy image URL */
export function ProjectCoverImage({
  projectId,
  variant = "cover",
  image,
  alt,
  className = "",
}: {
  projectId: string;
  variant?: ProjectPreviewVariant;
  image?: string;
  alt: string;
  className?: string;
}) {
  if (image && image.startsWith("http")) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        loading="lazy"
        className={`object-cover ${className}`}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    );
  }

  return (
    <ProjectDashboardArt
      projectId={projectId}
      variant={variant}
      compact
      className={className}
      aria-label={alt}
    />
  );
}
