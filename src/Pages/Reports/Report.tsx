import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";

import Button from "../../components/UI/button";
import { Field, inputCls } from "../../components/UI/field";
import ContractsReportPDF from "../../components/Reports/ContractsReportPDF";
import ErrorBoundary from "../../components/Common/ErrorBondary";
import {
  getContracts,
  type Contract,
} from "../../api/contract.mock";

const STATUS = [
  "",
  "Draft",
  "Sent",
  "Under Review",
  "Signed",
  "Declined",
  "Expired",
  "Prospect",
] as const;

type StatusFilter = (typeof STATUS)[number];

function fmtMoney(v: number | undefined, cur: string = "IDR"): string {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: cur === "IDR" ? 0 : 2,
    }).format(v ?? 0);
  } catch {
    return `${cur} ${v ?? 0}`;
  }
}

export default function ReportsPage(): React.ReactElement {
  return (
    <ErrorBoundary>
      <ReportsInner />
    </ErrorBoundary>
  );
}

function ReportsInner(): React.ReactElement {
  const [raw, setRaw] = useState<Contract[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [status, setStatus] = useState<StatusFilter>("");
  const [startDate, setStartDate] = useState<string>(""); 
  const [endDate, setEndDate] = useState<string>("");    
  const [year, setYear] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");

  const [gen, setGen] = useState<boolean>(false);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await getContracts({ perPage: 999, page: 1, sort: "end_date:asc" });
      setRaw(res.data || []);
    } catch {
      toast.error("Gagal memuat data contracts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const yearOptions = useMemo<number[]>(() => {
    const years = new Set<number>();
    raw.forEach((r) => {
      if (r.effective_date) years.add(new Date(r.effective_date).getFullYear());
      if (r.end_date) years.add(new Date(r.end_date).getFullYear());
    });
    if (years.size === 0) {
      const nowY = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) => nowY - i).reverse();
    }
    return Array.from(years).sort((a, b) => a - b);
  }, [raw]);

  function overlapsRange(r: Contract, rangeStart: Date, rangeEnd: Date): boolean {
    const eff = r.effective_date ? new Date(r.effective_date) : null;
    const ed = r.end_date ? new Date(r.end_date) : null;
    if (!eff || !ed) return false;
    return eff <= rangeEnd && ed >= rangeStart;
  }

  const yearMonthRange = useMemo<null | { start: Date; end: Date }>(() => {
    if (!year) return null;
    const m = month && month >= 1 && month <= 12 ? month : 1;
    const start = new Date(Number(year), Number(m) - 1, 1);
    const end = new Date(Number(year), Number(m) - 1 + 1, 0);
    if (!month) {
      return {
        start: new Date(Number(year), 0, 1),
        end: new Date(Number(year), 11, 31),
      };
    }
    return { start, end };
  }, [year, month]);

  const filtered = useMemo<Contract[]>(() => {
    return raw.filter((r) => {
      if (status && r.status !== status) return false;

      if (yearMonthRange) {
        if (!overlapsRange(r, yearMonthRange.start, yearMonthRange.end)) return false;
        return true;
      }

      if (startDate) {
        const eff = r.effective_date ? new Date(r.effective_date) : null;
        if (!eff || eff < new Date(startDate)) return false;
      }
      if (endDate) {
        const ed = r.end_date ? new Date(r.end_date) : null;
        if (!ed || ed > new Date(endDate)) return false;
      }
      return true;
    });
  }, [raw, status, startDate, endDate, yearMonthRange]);

  const totals = useMemo(() => {
    const EXCLUDE = new Set<string>(["Declined", "Expired"]);
    const totalValue = filtered.reduce<number>((acc, r) => {
      if (EXCLUDE.has(String(r.status))) return acc;
      return acc + (Number(r.value) || 0);
    }, 0);

    const byStatus = filtered.reduce<Record<string, number>>((acc, r) => {
      const key = String(r.status);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return { count: filtered.length, totalValue, byStatus };
  }, [filtered]);

  const filename = `contracts-report-${format(new Date(), "yyyyMMdd-HHmm")}.pdf`;

  const handleDownload = async () => {
    if (gen) return;
    setGen(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const doc = (
        <ContractsReportPDF
          data={filtered}
          filters={{
            status,
            startDate,
            endDate,
            year: year || undefined,
            month: month || undefined,
          }}
        />
      );
      const blob = await pdf(doc).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generate error:", err);
      toast.error("Gagal generate PDF");
    } finally {
      setGen(false);
    }
  };

  const resetAll = () => {
    setStatus("");
    setStartDate("");
    setEndDate("");
    setYear("");
    setMonth("");
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          Reports — Contracts
        </h1>
        <Button onClick={handleDownload} disabled={gen || loading} aria-busy={gen || loading}>
          {gen ? "Generating PDF…" : "Download PDF"}
        </Button>
      </div>

      <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4 grid grid-cols-1 sm:grid-cols-6 gap-3">
        <Field label="Status">
          <select
            className={inputCls}
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
          >
            {STATUS.map((s) => (
              <option key={s || "all"} value={s}>
                {s || "All Status"}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Year">
          <select
            className={inputCls}
            value={year === "" ? "" : String(year)}
            onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
          >
            <option value="">All</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </Field>

        <Field label="Month">
          <select
            className={inputCls}
            value={month === "" ? "" : String(month)}
            onChange={(e) => setMonth(e.target.value ? Number(e.target.value) : "")}
            disabled={year === ""} 
          >
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {new Date(2000, m - 1, 1).toLocaleString("en-US", { month: "long" })}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Effective From">
          <input
            type="date"
            className={inputCls}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={!!year}
          />
        </Field>
        <Field label="End Until">
          <input
            type="date"
            className={inputCls}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={!!year}
          />
        </Field>

        <div className="flex items-end">
          <Button variant="ghost" onClick={resetAll} disabled={loading}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4 text-white">
          <div className="text-sm text-white/70">Contracts</div>
          <div className="text-2xl font-semibold">{loading ? "…" : totals.count}</div>
        </div>
        <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4 text-white">
          <div className="text-sm text-white/70">Total Value</div>
          <div className="text-2xl font-semibold">
            {loading ? "…" : fmtMoney(totals.totalValue, "IDR")}
          </div>
        </div>
        <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4 text-white">
          <div className="text-sm text-white/70">By Status (top)</div>
          <div className="text-base">
            {loading
              ? "…"
              : Object.entries(totals.byStatus)
                  .slice(0, 3)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(" • ") || "-"}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/10 ring-1 ring-white/10 overflow-hidden">
        <table className="min-w-full text-sm text-white/90">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <th className="px-4 py-2 text-center">Contract Number</th>
              <th className="px-4 py-2 text-center">Title</th>
              <th className="px-4 py-2 text-center">Counterparty</th>
              <th className="px-4 py-2 text-center">Value</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Effective</th>
              <th className="px-4 py-2 text-center">End</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-white/60">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-white/60">
                  No data
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="px-4 py-2 whitespace-nowrap text-center">{r.number}</td>
                  <td className="px-4 py-2">{r.title}</td>
                  <td className="px-4 py-2">{r.counterparty || "-"}</td>
                  <td className="px-4 py-2 text-right">{fmtMoney(r.value, r.currency)}</td>
                  <td className="px-4 py-2 text-center">{String(r.status)}</td>
                  <td className="px-4 py-2 text-center">{r.effective_date || "-"}</td>
                  <td className="px-4 py-2 text-center">{r.end_date || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
