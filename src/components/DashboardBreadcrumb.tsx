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
      <svg className="text-black/60 dark:text-black" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.6875 6.60063C17.6118 6.36733 17.4692 6.16146 17.2773 6.00865C17.0855 5.85584 16.8529 5.76285 16.6086 5.74125L11.9688 5.34125L10.15 1.01625C10.0553 0.78931 9.8956 0.595459 9.69097 0.459108C9.48633 0.322756 9.24592 0.25 9.00002 0.25C8.75411 0.25 8.51371 0.322756 8.30907 0.459108C8.10443 0.595459 7.94471 0.78931 7.85002 1.01625L6.03674 5.34125L1.39142 5.74359C1.14614 5.76421 0.912399 5.85678 0.719516 6.0097C0.526633 6.16262 0.383193 6.36909 0.307183 6.60321C0.231173 6.83733 0.225978 7.08868 0.292249 7.32574C0.358519 7.5628 0.493305 7.77502 0.679705 7.93578L4.20392 11.0155L3.14767 15.5889C3.09182 15.8282 3.10776 16.0787 3.19349 16.309C3.27923 16.5394 3.43095 16.7393 3.6297 16.8839C3.82845 17.0284 4.0654 17.1112 4.31093 17.1218C4.55647 17.1324 4.79968 17.0704 5.01017 16.9436L8.99455 14.5217L12.9875 16.9436C13.198 17.0704 13.4412 17.1324 13.6868 17.1218C13.9323 17.1112 14.1692 17.0284 14.368 16.8839C14.5667 16.7393 14.7185 16.5394 14.8042 16.309C14.8899 16.0787 14.9059 15.8282 14.85 15.5889L13.7945 11.0108L17.318 7.93578C17.5044 7.77446 17.6389 7.56164 17.7046 7.32408C17.7704 7.08651 17.7644 6.83481 17.6875 6.60063ZM16.4985 6.99125L12.975 10.0662C12.8035 10.2154 12.676 10.4085 12.606 10.6248C12.5361 10.841 12.5265 11.0723 12.5781 11.2936L13.6367 15.8748L9.64689 13.453C9.45223 13.3344 9.22871 13.2717 9.0008 13.2717C8.77288 13.2717 8.54936 13.3344 8.3547 13.453L4.37033 15.8748L5.42189 11.2967C5.47357 11.0754 5.46393 10.8442 5.394 10.6279C5.32407 10.4116 5.1965 10.2185 5.02502 10.0694L1.50002 6.99594C1.49973 6.9936 1.49973 6.99124 1.50002 6.98891L6.14377 6.58734C6.37049 6.56736 6.58745 6.48585 6.77125 6.35162C6.95505 6.21738 7.09871 6.03551 7.18674 5.82563L9.00002 1.50609L10.8125 5.82563C10.9005 6.03551 11.0442 6.21738 11.228 6.35162C11.4118 6.48585 11.6288 6.56736 11.8555 6.58734L16.5 6.98891C16.5 6.98891 16.5 6.99359 16.5 6.99438L16.4985 6.99125Z" fill="#050505" />
      </svg>
      <span className="text-black/60 dark:text-black">Dashboards</span>

      {crumbs.map((c, idx) => (
        <div key={c.to} className="flex items-center gap-2">
          <svg width="5" height="13" viewBox="0 0 5 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.6733 0.340908L1.39205 12.5312H0.318182L3.59943 0.340908H4.6733Z" fill="#1B1B1B" />
          </svg>

          {idx === crumbs.length - 1 ? (
            <span className="text-black dark:text-black font-medium truncate">
              {c.label}
            </span>
          ) : (
            <Link
              to={c.to}
              className="text-black/60 dark:text-black hover:underline"
            >
              {c.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
