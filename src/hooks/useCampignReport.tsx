/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockReports } from "../types/MockReport";
import { type ReportQuery, type CampaignReport } from "../types/Report";
import { paginate } from "../utils/format"; 

export function useCampaignReports(q: ReportQuery) {
  let rows: CampaignReport[] =
    q.type && q.type !== "All"
      ? mockReports.filter((r: { channel: any; }) => r.channel === q.type)
      : mockReports;
  if (q.search) {
    const s = q.search.toLowerCase();
    rows = rows.filter((r) => r.name.toLowerCase().includes(s));
  }

  const sortBy = q.sortBy ?? "date";
  const dir = q.sortDir ?? "desc";
  rows = [...rows].sort((a, b) => {
    const va = (a as any)[sortBy];
    const vb = (b as any)[sortBy];
    if (va < vb) return dir === "asc" ? -1 : 1;
    if (va > vb) return dir === "asc" ? 1 : -1;
    return 0;
  });

  const page = q.page ?? 1;
  const perPage = q.perPage ?? 10;
  const { data, total } = paginate(rows, page, perPage);

  return { data, total, page, perPage };
}
