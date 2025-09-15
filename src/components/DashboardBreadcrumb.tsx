import { useLocation, Link } from "react-router-dom";

const PATH_LABELS: Record<string, string> = {
  "/overview": "Overview",
  "/projects": "Projects",
  "/leads": "Leads",
  "/guests": "Guest",

};

function humanize(segment: string) {
  if (!segment) return "";
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DashboardBreadcrumb() {
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, idx) => {
    const to = "/" + segments.slice(0, idx + 1).join("/");
    const label = PATH_LABELS[to] ?? humanize(seg);
    return { to, label };
  });

  return (
    <div className="hidden items-center gap-2 md:flex text-sm">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className="text-black/60 dark:text-white/60"
        fill="currentColor"
      >
        <path d="M7 1.2 8.7 4.5l3.6.3-2.8 2.3.9 3.5L7 9.1 3.6 10.6l.9-3.5L1.7 4.8l3.6-.3L7 1.2Z" />
      </svg>

      <span className="text-black/60 dark:text-white/60">Dashboards</span>

      {crumbs.map((c, idx) => (
        <div key={c.to} className="flex items-center gap-2">
          <span className="text-black/30 dark:text-white/25">/</span>
          {idx === crumbs.length - 1 ? (
            <span className="text-black dark:text-white font-medium truncate">
              {c.label}
            </span>
          ) : (
            <Link
              to={c.to}
              className="text-black/60 dark:text-white/60 hover:underline"
            >
              {c.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
