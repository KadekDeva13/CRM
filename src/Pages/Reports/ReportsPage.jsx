import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";

import Button from "../../components/UI/button";
import { Field, inputCls } from "../../components/UI/field";
import ContractsReportPDF from "../../components/Reports/ContractsReportPDF";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import { getContracts } from "../../api/contract.mock";

const STATUS = ["", "Draft", "Sent", "Under Review", "Signed", "Declined", "Expired", "Prospect"];

function fmtMoney(v, cur = "IDR") {
  try {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: cur, maximumFractionDigits: cur === "IDR" ? 0 : 2 }).format(v ?? 0);
  } catch { return `${cur} ${v ?? 0}`; }
}

export default function ReportsPage() {
  return (
    <ErrorBoundary>
      <ReportsInner />
    </ErrorBoundary>
  );
}

function ReportsInner() {
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [gen, setGen] = useState(false);

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

  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => {
    return raw.filter((r) => {
      if (status && r.status !== status) return false;
      if (startDate && (!r.effective_date || new Date(r.effective_date) < new Date(startDate))) return false;
      if (endDate && (!r.end_date || new Date(r.end_date) > new Date(endDate))) return false;
      return true;
    });
  }, [raw, status, startDate, endDate]);

  const totals = useMemo(() => {
    const totalValue = filtered.reduce((acc, r) => acc + (Number(r.value) || 0), 0);
    const byStatus = filtered.reduce((acc, r) => ((acc[r.status] = (acc[r.status] || 0) + 1), acc), {});
    return { count: filtered.length, totalValue, byStatus };
  }, [filtered]);

  const filename = `contracts-report-${format(new Date(), "yyyyMMdd-HHmm")}.pdf`;

  const handleDownload = async () => {
    if (gen) return;
    setGen(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const doc = <ContractsReportPDF data={filtered} filters={{ status, startDate, endDate }} />;
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

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-semibold text-white">Reports — Contracts</h1>
        <Button onClick={handleDownload} disabled={gen || loading} aria-busy={gen || loading}>
          {gen ? "Generating PDF…" : "Download PDF"}
        </Button>
      </div>

      <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Field label="Status">
          <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS.map((s) => <option key={s || "all"} value={s}>{s || "All Statuses"}</option>)}
          </select>
        </Field>
        <Field label="Effective From">
          <input type="date" className={inputCls} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Field>
        <Field label="End Until">
          <input type="date" className={inputCls} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </Field>
        <div className="flex items-end">
          <Button variant="ghost" onClick={() => { setStatus(""); setStartDate(""); setEndDate(""); }} disabled={loading}>
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
          <div className="text-2xl font-semibold">{loading ? "…" : fmtMoney(totals.totalValue, "IDR")}</div>
        </div>
        <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4 text-white">
          <div className="text-sm text-white/70">By Status (top)</div>
          <div className="text-base">
            {loading ? "…" : Object.entries(totals.byStatus).slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(" • ") || "-"}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/10 ring-1 ring-white/10 overflow-hidden">
        <table className="min-w-full text-sm text-white/90">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <th className="px-4 py-2 text-center">Number</th>
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
              <tr><td colSpan={7} className="px-4 py-6 text-center text-white/60">Loading…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-6 text-center text-white/60">No data</td></tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="px-4 py-2 whitespace-nowrap">{r.number}</td>
                  <td className="px-4 py-2">{r.title}</td>
                  <td className="px-4 py-2">{r.counterparty || "-"}</td>
                  <td className="px-4 py-2">{fmtMoney(r.value, r.currency)}</td>
                  <td className="px-4 py-2">{r.status}</td>
                  <td className="px-4 py-2">{r.effective_date || "-"}</td>
                  <td className="px-4 py-2">{r.end_date || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
