import { useLocation, matchPath } from "react-router-dom";

const PATH_LABELS: Record<string, string> = {
  "/overview": "Overview",
  "/overeview": "Overview",
  "/projects": "Projects",
  "/leads": "Leads",
  "/guests": "Guests",
  "/contacts": "Contacts",
};

const PATH_LABELS_2: Record<string, string> = {
    "/guests-insights": "Guests Insights",
}

function humanize(segment: string) {
  if (!segment) return "";
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function resolveLabel(pathname: string) {
  if (PATH_LABELS[pathname]) return PATH_LABELS[pathname];

  for (const key of Object.keys(PATH_LABELS)) {
    if (matchPath({ path: key, end: false }, pathname)) {
      return PATH_LABELS[key];
    }
  }

  const seg = pathname.split("/").filter(Boolean).pop() ?? "overview";
  return humanize(seg);
}

export default function DashboardBreadcrumb() {
  const { pathname } = useLocation();
  const label = resolveLabel(pathname);

  return (
    <div className="hidden items-center gap-2 md:flex text-sm">
      <svg width="14" height="14" viewBox="0 0 14 14" className="text-black/60 dark:text-white/60" fill="currentColor">
        <path d="M7 1.2 8.7 4.5l3.6.3-2.8 2.3.9 3.5L7 9.1 3.6 10.6l.9-3.5L1.7 4.8l3.6-.3L7 1.2Z" />
      </svg>
      <span className="text-black/60 dark:text-white/60">Dashboards</span>
      <span className="text-black/30 dark:text-white/25">/</span>
      <span className="text-black dark:text-white font-medium truncate">{label}</span>
      <span className="text-black/30 dark:text-white/25">/</span>
      <span className="text-black dark:text-white font-medium truncate">{PATH_LABELS_2[pathname] ?? ''}</span>

    </div>
  );
}
