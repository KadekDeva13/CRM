import * as React from "react";
import { useSearchParams } from "react-router-dom";
import FiltersBar from "../../components/Report/FiltersBar";
import { ReportTable } from "../../components/Report/ReportTables";
import { useCampaignReports } from "../../hooks/useCampignReport";
import {
  type Channel,
  type ReportQuery,
  type CampaignReport,
} from "../../types/Report";
import { downloadCsv } from "../../utils/csv";

function parseRangeFromQS(input: string | null): ReportQuery["range"] {
  const v = (input ?? "").trim();
  const choices: ReportQuery["range"][] = [
    "Last 6 Months",
    "Last 7 Days",
    "Last 30 Days",
    "This Year",
    "Custom",
  ];
  return (choices as readonly string[]).includes(v)
    ? (v as ReportQuery["range"])
    : "Last 6 Months";
}

function parseTagsFromQS(input: string | null) {
  const v = (input ?? "").trim();
  return v === "Email" || v === "SMS" || v === "Push" || v === "Social" || v === "All"
    ? (v as "All" | "Email" | "SMS" | "Push" | "Social")
    : "All";
}

export default function ReportPage(): React.ReactElement {
  const [sp, setSp] = useSearchParams();

  const type = (sp.get("type") as Channel | "All" | null) ?? "All";
  const search = sp.get("q") ?? "";
  const range = parseRangeFromQS(sp.get("range"));
  const tags = parseTagsFromQS(sp.get("tags"));

  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const perPage = Number(sp.get("perPage") ?? 10);

  const { data, total } = useCampaignReports({
    type,
    search,
    range,
    tags: tags === "All" ? undefined : [tags],
    page,
    perPage,
  });

  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(total, page * perPage);

  const setQS = (patch: Record<string, string | number | undefined>) => {
    const next = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === "") next.delete(k);
      else next.set(k, String(v));
    });
    setSp(next, { replace: true });
  };

  const handleExportCsv = () => {
    downloadCsv("campaign-reports.csv", data as CampaignReport[]);
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6">
      <h1 className="text-xl font-semibold text-[#000000]">Campaign Reports</h1>
      <p className="mt-1 text-sm text-zinc-500">Mindimedia Hotel Indonesia</p>

<div className="mt-4 rounded-xl border border-zinc-200 bg-white/90 p-3 pl-4 pr-3 shadow-sm">
  <FiltersBar
    type={type}
    tags={tags}
    range={range}
    onChange={(patch) => {
      if (patch.type !== undefined) {
        setQS({ type: patch.type, page: 1 });
      }
      if (patch.tags !== undefined) {
        setQS({ tags: patch.tags, page: 1 });
      }
      if (patch.range !== undefined) {
        setQS({ range: patch.range, page: 1 });
      }
    }}
    onExportCsv={handleExportCsv}
  />
</div>


      <div className="mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <ReportTable rows={data} />
        <div className="border-t border-zinc-200 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <span>Showing</span>
              <select
                className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm"
                value={perPage}
                onChange={(e) =>
                  setQS({ perPage: Number(e.target.value), page: 1 })
                }
              >
                {[10, 25, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <span>
                of <b>{total}</b> templates
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-700">
              <span>
                Showing <b>{start}</b> to <b>{end}</b> of <b>{total}</b>
              </span>

              <div className="flex items-stretch overflow-hidden rounded-md border border-zinc-300">
                <button
                  disabled={page <= 1}
                  onClick={() => setQS({ page: Math.max(1, page - 1) })}
                  className={`px-3 py-1 ${
                    page <= 1
                      ? "bg-zinc-100 text-zinc-400"
                      : "bg-white hover:bg-zinc-50"
                  }`}
                >
                  ‹
                </button>
                {(() => {
                  const windowSize = 5;
                  let startPage = Math.max(1, page - 2);
                  const endPage = Math.min(pages, startPage + windowSize - 1);
                  if (endPage - startPage + 1 < windowSize) {
                    startPage = Math.max(1, endPage - windowSize + 1);
                  }
                  const arr: number[] = [];
                  for (let p = startPage; p <= endPage; p++) arr.push(p);
                  return arr.map((p) => {
                    const active = p === page;
                    return (
                      <button
                        key={p}
                        onClick={() => setQS({ page: p })}
                        className={`px-3 py-1 ${
                          active
                            ? "bg-zinc-900 text-white"
                            : "bg-white hover:bg-zinc-50"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  });
                })()}

                <button
                  disabled={page >= pages}
                  onClick={() => setQS({ page: Math.min(pages, page + 1) })}
                  className={`px-3 py-1 ${
                    page >= pages
                      ? "bg-zinc-100 text-zinc-400"
                      : "bg-white hover:bg-zinc-50"
                  }`}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
