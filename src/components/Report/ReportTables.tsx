import type { ReactElement } from "react";
import { type CampaignReport } from "../../types/Report";
import { fmtMoney, fmtDate, fmtNum, fmtPct } from "../../utils/format";

// Icon eye (meneruskan props agar bisa diatur ukuran/warna via className)
const IconEye = (props: React.SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M9.28047 0C6.75547 0 4.73359 1.15 3.26172 2.51875C1.79922 3.875 0.821094 5.5 0.358594 6.61562C0.255469 6.8625 0.255469 7.1375 0.358594 7.38437C0.821094 8.5 1.79922 10.125 3.26172 11.4812C4.73359 12.85 6.75547 14 9.28047 14C11.8055 14 13.8273 12.85 15.2992 11.4812C16.7617 10.1219 17.7398 8.5 18.2055 7.38437C18.3086 7.1375 18.3086 6.8625 18.2055 6.61562C17.7398 5.5 16.7617 3.875 15.2992 2.51875C13.8273 1.15 11.8055 0 9.28047 0ZM4.78047 7C4.78047 5.80653 5.25457 4.66193 6.09849 3.81802C6.9424 2.97411 8.08699 2.5 9.28047 2.5C10.4739 2.5 11.6185 2.97411 12.4624 3.81802C13.3064 4.66193 13.7805 5.80653 13.7805 7C13.7805 8.19347 13.3064 9.33807 12.4624 10.182C11.6185 11.0259 10.4739 11.5 9.28047 11.5C8.08699 11.5 6.9424 11.0259 6.09849 10.182C5.25457 9.33807 4.78047 8.19347 4.78047 7ZM9.28047 5C9.28047 6.10313 8.38359 7 7.28047 7C7.05859 7 6.84609 6.9625 6.64609 6.89687C6.47422 6.84062 6.27422 6.94688 6.28047 7.12813C6.28984 7.34375 6.32109 7.55937 6.38047 7.775C6.80859 9.375 8.45547 10.325 10.0555 9.89688C11.6555 9.46875 12.6055 7.82188 12.1773 6.22188C11.8305 4.925 10.6836 4.05312 9.40859 4C9.22734 3.99375 9.12109 4.19062 9.17734 4.36562C9.24297 4.56562 9.28047 4.77812 9.28047 5Z"
      fill="currentColor"
    />
  </svg>
);

export function ReportTable({ rows }: { rows: CampaignReport[] }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white/80 shadow-sm">
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-[211px]" />  {/* Campaign Name */}
          <col />                          {/* Type */}
          <col />                          {/* Date */}
          <col />                          {/* Sent */}
          <col />                          {/* Bookings */}
          <col />                          {/* Revenue (fleksibel) */}
          <col />                          {/* Opens */}
          <col />                          {/* Clicks */}
          <col />                          {/* CTR */}
          <col className="w-[120px]" />    {/* Unsubscribes */}
        </colgroup>

        <thead>
          <tr className="h-[52.5px] bg-[#F9FAFB] text-left text-sm text-zinc-600">
            {[
              "Campaign Name",
              "Type",
              "Date",
              "Sent",
              "Bookings",
              "Revenue",
              "Opens",
              "Clicks",
              "CTR",
              "Unsubscribes",
            ].map((h) => (
              <th
                key={h}
                className={`px-4 py-3 first:pl-5 last:pr-5 ${
                  h === "Unsubscribes" ? "text-right" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm">
          {rows.map((r, idx) => (
            <tr key={r.id} className={`h-[52.5px] ${idx !== 0 ? "border-t border-zinc-100" : ""}`}>
              <td className="px-4 first:pl-8 last:pr-5">
                <a className="text-justify-center text-emerald-600 hover:underline" href="#">
                  {r.name}
                </a>
              </td>

              <td className="px-4 text-justify-center text-[#374151]">{r.channel}</td>
              <td className="px-4 text-justify-center text-[#374151]">{fmtDate(r.date)}</td>
              <td className="px-4 text-justify-center tabular-nums text-[#374151]">{fmtNum(r.sent)}</td>
              <td className="px-4 text-justify-center tabular-nums font-semibold text-[#374151]">
                {fmtNum(r.bookings)}
              </td>
              <td className="px-4 text-justify-center tabular-nums font-semibold text-[#16A34A]">
                {fmtMoney(r.revenue)}
              </td>
              <td className="px-4 text-justify-center tabular-nums text-[#374151]">
                <div>{fmtNum(r.opens)}</div>
                <div className="text-[11px] text-justify-center text-zinc-500">{fmtPct(r.openRate)}</div>
              </td>
              <td className="px-4 text-justify-center tabular-nums text-[#374151]">
                <div>{fmtNum(r.clicks)}</div>
                <div className="text-[11px] text-justify-center text-zinc-500">
                  {fmtPct(r.clicks / Math.max(1, r.opens))}
                </div>
              </td>
              <td className="px-4 tabular-nums text-justify-center font-semibold text-[#0F5A62]">
                {fmtPct(r.ctr)}
              </td>
              
              <td className="px-4">
                <div className="flex items-center justify-end gap-2">
                  <span className="tabular-nums text-justify-center text-zinc-600">
                    {fmtNum(r.unsubscribes)}
                  </span>
                  <button
                    type="button"
                    aria-label="View unsubscribes"
                    title="View unsubscribes"
                    className="rounded p-1 text-zinc-500 hover:text-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 shrink-0"
                  >
                    <IconEye className="h-4 w-4 shrink-0 text-zinc-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
