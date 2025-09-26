import { type CampaignReport } from "../types/Report";

export function downloadCsv(filename: string, rows: CampaignReport[]) {
  const header = [
    "Campaign Name","Type","Date","Sent","Bookings","Revenue",
    "Opens","Open Rate","Clicks","CTR","Unsubscribes",
  ];
  const body = rows.map((r) => [
    r.name, r.channel, r.date, r.sent, r.bookings, r.revenue,
    r.opens, r.openRate, r.clicks, r.ctr, r.unsubscribes,
  ]);
  const csv = [header, ...body].map((a) => a.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
