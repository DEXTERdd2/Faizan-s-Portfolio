"use client";

import {
  getPreviewConfig,
  resolveVariant,
  type ProjectPreviewVariant,
} from "@/lib/project-preview-config";

const lightStatusClass: Record<
  "green" | "amber" | "blue" | "violet" | "rose" | "slate",
  string
> = {
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-700",
  violet: "bg-violet-100 text-violet-700",
  rose: "bg-rose-100 text-rose-700",
  slate: "bg-gray-100 text-gray-600",
};

type Props = {
  projectId: string;
  variant?: ProjectPreviewVariant;
  compact?: boolean;
  showChrome?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function ProjectDashboardArt({
  projectId,
  variant,
  compact = false,
  showChrome = false,
  className = "",
  "aria-label": ariaLabel,
}: Props) {
  const v = resolveVariant(projectId, variant);
  const config = getPreviewConfig(projectId, v);
  const isGrid = Boolean(config.gridItems?.length);

  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden bg-[#0a0c12] text-white ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      {showChrome && (
        <div className="flex shrink-0 items-center gap-2 border-b border-white/5 bg-[#12151c] px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <div className="mx-auto truncate rounded-md bg-white/5 px-3 py-0.5 text-[0.55rem] text-white/40">
            {config.appName.toLowerCase().replace(/\s/g, "")}.app/admin
          </div>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <aside
          className={`hidden shrink-0 flex-col border-r border-white/5 sm:flex ${compact ? "w-[72px]" : "w-[88px] md:w-[100px]"}`}
          style={{ background: config.sidebarBg }}
        >
          <div
            className={`border-b border-white/5 font-semibold ${compact ? "px-2 py-2 text-[0.45rem]" : "px-2 py-2.5 text-[0.5rem] md:text-[0.55rem]"}`}
            style={{ color: config.accent }}
          >
            {compact ? config.appName.slice(0, 1) : config.appName.split(" ")[0]}
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 p-1.5">
            {config.nav.map((item, i) => (
              <div
                key={item}
                className={`truncate rounded-md px-1.5 py-1 text-[0.45rem] md:text-[0.5rem] ${
                  i === config.activeNav
                    ? "font-medium text-white"
                    : "text-white/35"
                }`}
                style={
                  i === config.activeNav
                    ? { background: config.accentSoft, color: config.accent }
                    : undefined
                }
                title={item}
              >
                {compact ? item.slice(0, 3) : item}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex min-w-0 flex-1 flex-col bg-[#f4f5f7] text-[#111827]">
          <header className="flex shrink-0 items-center justify-between gap-2 border-b border-black/5 bg-white px-2 py-1.5 sm:px-3 sm:py-2">
            <div className="min-w-0">
              <p className="truncate text-[0.55rem] font-semibold sm:text-[0.65rem] md:text-xs">
                {config.pageTitle}
              </p>
            </div>
            {config.pageAction && (
              <span
                className="shrink-0 rounded-md px-1.5 py-0.5 text-[0.45rem] font-medium text-white sm:text-[0.5rem]"
                style={{ background: config.accent }}
              >
                {compact ? "+" : config.pageAction}
              </span>
            )}
          </header>

          {/* Stats */}
          <div className="grid shrink-0 grid-cols-3 gap-1 border-b border-black/5 bg-white p-1.5 sm:gap-1.5 sm:p-2">
            {config.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-black/5 bg-[#fafafa] px-1.5 py-1 sm:px-2 sm:py-1.5"
              >
                <p className="truncate text-[0.4rem] text-black/45 sm:text-[0.48rem]">{stat.label}</p>
                <p className="truncate text-[0.55rem] font-semibold sm:text-[0.65rem] md:text-xs">
                  {stat.value}
                </p>
                {stat.delta && (
                  <p className="truncate text-[0.38rem] text-emerald-600 sm:text-[0.45rem]">{stat.delta}</p>
                )}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="min-h-0 flex-1 overflow-hidden p-1.5 sm:p-2">
            {isGrid ? (
              <div className="grid h-full grid-cols-3 gap-1 sm:gap-1.5">
                {config.gridItems!.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col justify-end overflow-hidden rounded-md border border-black/5 p-1"
                    style={{
                      background: `linear-gradient(145deg, ${item.tone}33, ${item.tone}88)`,
                    }}
                  >
                    <span className="truncate text-[0.38rem] text-white/90 sm:text-[0.45rem]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col overflow-hidden rounded-md border border-black/5 bg-white">
                <div
                  className="grid shrink-0 gap-1 border-b border-black/5 px-1.5 py-1 text-[0.4rem] font-medium uppercase tracking-wide text-black/40 sm:px-2 sm:text-[0.48rem]"
                  style={{ gridTemplateColumns: `repeat(${config.columns.length}, minmax(0, 1fr))` }}
                >
                  {config.columns.map((col) => (
                    <span key={col} className="truncate">
                      {col}
                    </span>
                  ))}
                </div>
                <div className="min-h-0 flex-1 overflow-hidden">
                  {config.rows.map((row, i) => (
                    <div
                      key={`${row.primary}-${i}`}
                      className="grid items-center gap-1 border-b border-black/[0.04] px-1.5 py-1 sm:px-2 sm:py-1.5"
                      style={{ gridTemplateColumns: `repeat(${config.columns.length}, minmax(0, 1fr))` }}
                    >
                      <div className="flex min-w-0 items-center gap-1">
                        <span
                          className="grid size-4 shrink-0 place-items-center rounded-full text-[0.35rem] font-bold text-white sm:size-5 sm:text-[0.4rem]"
                          style={{ background: config.accent }}
                        >
                          {row.avatar ?? row.primary.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="truncate text-[0.45rem] font-medium sm:text-[0.52rem] md:text-[0.58rem]">
                          {row.primary}
                        </span>
                      </div>
                      <span className="truncate text-[0.42rem] text-black/55 sm:text-[0.48rem]">
                        {row.secondary}
                      </span>
                      <span className="truncate text-[0.42rem] text-black/45 sm:text-[0.48rem]">
                        {row.meta}
                      </span>
                      <span
                        className={`inline-flex w-fit truncate rounded-full px-1 py-0.5 text-[0.38rem] font-medium sm:text-[0.42rem] ${lightStatusClass[row.statusTone ?? "slate"]}`}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export function ProjectCoverPreview({
  projectId,
  className = "",
}: {
  projectId: string;
  className?: string;
}) {
  return (
    <ProjectDashboardArt
      projectId={projectId}
      variant="cover"
      compact
      className={className}
    />
  );
}
