import { useLocation, Link } from "react-router-dom";

const PATH_LABELS: Record<string, string> = {
  "/overview": "Overview",
  "/projects": "Projects",
  "/leads": "Leads",
  "/guests": "Guest",
};

// daftar route yang termasuk flow setup campaign
const SETUP_FLOW_PREFIXES = [
  "/campaign/setup",
  "/campaign/create-template",
  "/campaign/email-template",
  "/campaign/customize-template",
  "/campaign/review",
  "/campaign/schedule",
];

function humanize(segment: string) {
  if (!segment) return "";
  return segment.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DashboardBreadcrumb() {
  const { pathname } = useLocation();

  // Apakah sedang berada di flow setup?
  const inSetupFlow = SETUP_FLOW_PREFIXES.some((p) => pathname.startsWith(p));

  if (inSetupFlow) {
    // breadcrumb tetap selama berada di flow setup
    const fixed = [
      { to: "/overview", label: "Dashboards" },
      { to: "/campaign", label: "Campaign" },
      { to: "/campaign/setup", label: "Create New Campaign" },
    ];

    return (
      <div className="hidden items-center gap-2 md:flex text-sm">
        {/* icon rumah-mu yang lama */}
        <svg className="text-black/60 dark:text-black" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.6875 6.60063...Z" fill="#050505" />
        </svg>

        {fixed.map((c, i) => (
          <div key={c.to} className="flex items-center gap-2">
            {i > 0 && (
              <svg width="5" height="13" viewBox="0 0 5 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.6733 0.340908L1.39205 12.5312H0.318182L3.59943 0.340908H4.6733Z" fill="#1B1B1B" />
              </svg>
            )}
            {i < fixed.length - 1 ? (
              <Link to={c.to} className="text-black/60 dark:text-black hover:underline">{c.label}</Link>
            ) : (
              <span className="text-black dark:text-black font-medium truncate">{c.label}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Default: breadcrumb dinamis seperti sebelumnya
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, idx) => {
    const to = "/" + segments.slice(0, idx + 1).join("/");
    const label = PATH_LABELS[to] ?? humanize(seg);
    return { to, label };
  });

  return (
    <div className="hidden items-center gap-2 md:flex text-sm">
      <svg className="text-black/60 dark:text-black" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.6875 6.60063...Z" fill="#050505" />
      </svg>
      {crumbs.map((c, idx) => (
        <div key={c.to} className="flex items-center gap-2">
          <svg width="5" height="13" viewBox="0 0 5 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6733 0.340908L1.39205 12.5312H0.318182L3.59943 0.340908H4.6733Z" fill="#1B1B1B" />
          </svg>
          {idx === crumbs.length - 1 ? (
            <span className="text-black dark:text-black font-medium truncate">{c.label}</span>
          ) : (
            <Link to={c.to} className="text-black/60 dark:text-black hover:underline">{c.label}</Link>
          )}
        </div>
      ))}
    </div>
  );
}
