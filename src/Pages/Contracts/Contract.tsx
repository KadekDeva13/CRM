import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/UI/button";
import ContractForm from "../../components/Contracts/ContractForm";
import ContractStatusBadge from "../../components/Contracts/ContractStatusBadge";
import {
  getContracts,
  createContract,
  updateContract,
  deleteContract,
  type Contract,
  type GetContractsParams,
  type PaginatedResponse,
} from "../../api/contract.mock";

const STATUS_FILTERS = [
  "",
  "Draft",
  "Sent",
  "Under Review",
  "Signed",
  "Declined",
  "Expired",
  "Prospect",
] as const;

const SORTS = [
  { v: "updated_at:desc", label: "Updated ↓" },
  { v: "updated_at:asc", label: "Updated ↑" },
  { v: "end_date:asc", label: "End Date ↑" },
  { v: "end_date:desc", label: "End Date ↓" },
  { v: "value:desc", label: "Value ↓" },
  { v: "value:asc", label: "Value ↑" },
  { v: "title:asc", label: "Title A→Z" },
  { v: "title:desc", label: "Title Z→A" },
] as const;

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

type PageParams = GetContractsParams & {
  status?: (typeof STATUS_FILTERS)[number];
};

export default function ContractsPage(): React.ReactElement {
  const [params, setParams] = useState<PageParams>({
    search: "",
    page: 1,
    perPage: 8,
    sort: "updated_at:desc",
    status: "",
  });

  const [rows, setRows] = useState<Contract[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse<Contract>["meta"]>({
    total: 0,
    page: 1,
    perPage: 8,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<Contract | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await getContracts(params);
      setRows(res.data);
      setMeta(res.meta);
    } catch {
      toast.error("Gagal memuat contracts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  const onCreate = async (payload: Partial<Contract>) => {
    setSubmitting(true);
    try {
      await createContract(payload);
      toast.success("Contract created");
      setOpenForm(false);
      await fetchData();
    } catch {
      toast.error("Gagal membuat contract");
    } finally {
      setSubmitting(false);
    }
  };

  const onUpdate = async (payload: Partial<Contract>) => {
    if (!editing?.id) return;
    setSubmitting(true);
    try {
      await updateContract(editing.id, payload);
      toast.success("Contract updated");
      setEditing(null);
      setOpenForm(false);
      await fetchData();
    } catch {
      toast.error("Gagal mengubah contract");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (row: Contract) => {
    if (!window.confirm(`Hapus contract "${row.title}" (${row.number})?`)) return;
    try {
      await deleteContract(row.id);
      toast.success("Contract deleted");
      await fetchData();
    } catch {
      toast.error("Gagal menghapus contract");
    }
  };

  const nextPage = () =>
    setParams((p) => ({ ...p, page: Math.min((p.page ?? 1) + 1, meta.totalPages) }));
  const prevPage = () =>
    setParams((p) => ({ ...p, page: Math.max((p.page ?? 1) - 1, 1) }));

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
        <h1 className="text-xl md:text-2xl font-semibold text-white">Contracts</h1>
        <div className="flex flex-wrap items-center gap-2">
          <input
            className="rounded-lg bg-gray-500 ring-1 ring-white/10 px-3 py-2 text-white placeholder-white/60"
            placeholder="Search title, number, counterparty…"
            value={params.search ?? ""}
            onChange={(e) =>
              setParams((p) => ({ ...p, search: e.target.value, page: 1 }))
            }
          />
          <select
            className="rounded-lg bg-gray-500 ring-1 ring-white/10 px-3 py-2 text-white"
            value={params.status ?? ""}
            onChange={(e) =>
              setParams((p) => ({ ...p, status: e.target.value as PageParams["status"], page: 1 }))
            }
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s || "all"} value={s}>
                {s || "All Statuses"}
              </option>
            ))}
          </select>
          <select
            className="rounded-lg bg-gray-500 ring-1 ring-white/10 px-3 py-2 text-white"
            value={params.sort ?? "updated_at:desc"}
            onChange={(e) => setParams((p) => ({ ...p, sort: e.target.value, page: 1 }))}
          >
            {SORTS.map((o) => (
              <option key={o.v} value={o.v}>
                {o.label}
              </option>
            ))}
          </select>
          <Button
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
          >
            + New Contract
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white/10 ring-1 ring-white/10 overflow-hidden">
        <table className="min-w-full text-sm text-white/90">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <th className="px-4 py-2 text-left">Contract Number</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Counterparty</th>
              <th className="px-4 py-2 text-left">Value</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">End Date</th>
              <th className="px-4 py-2 text-left">Owner</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-white/60">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-white/60">
                  No contracts yet
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="px-4 py-2 whitespace-nowrap">{r.number}</td>
                  <td className="px-4 py-2">{r.title}</td>
                  <td className="px-4 py-2">{r.counterparty || "-"}</td>
                  <td className="px-4 py-2">{fmtMoney(r.value, r.currency)}</td>
                  <td className="px-4 py-2">
                    <ContractStatusBadge value={r.status} />
                  </td>
                  <td className="px-4 py-2">{r.end_date || "-"}</td>
                  <td className="px-4 py-2">{r.owner_name || "-"}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      className="px-2 py-1 rounded hover:bg-white/10"
                      onClick={() => {
                        setEditing(r);
                        setOpenForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 px-2 py-1 rounded hover:bg-white/10 text-red-300"
                      onClick={() => onDelete(r)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-white/70">
        <div>
          Page {meta.page} / {meta.totalPages} — {meta.total} contracts
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={prevPage} disabled={(params.page ?? 1) <= 1}>
            Prev
          </Button>
          <Button
            variant="ghost"
            onClick={nextPage}
            disabled={(params.page ?? 1) >= meta.totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur">
          <div className="w-full max-w-2xl rounded-xl bg-neutral-900 ring-1 ring-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-lg">
                {editing ? "Edit Contract" : "New Contract"}
              </h3>
              <button
                className="text-white/70 hover:text-white"
                onClick={() => {
                  setEditing(null);
                  setOpenForm(false);
                }}
              >
                ✕
              </button>
            </div>
            <ContractForm
              initialValue={editing ?? undefined}
              submitting={submitting}
              onCancel={() => {
                setEditing(null);
                setOpenForm(false);
              }}
              onSubmit={editing ? onUpdate : onCreate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
