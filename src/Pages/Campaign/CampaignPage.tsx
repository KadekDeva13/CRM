/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState, useEffect } from "react";
import type { Campaign, CampaignStatus, CampaignTag } from "../../types/Campaigns";
import { campaignsSeed } from "../../types/Campaigns";
import CampaignTable from "../../components/Campaign/CampaignTable";
import { useNavigate } from "react-router-dom";

type Tab = "one-time" | "automated";

const TRIGGERS = [
  "All Triggers",
  "When Check-In",
  "Before Check-In",
  "After Checkout",
  "on Birthday date",
] as const;
type TriggerFilter = (typeof TRIGGERS)[number];

const TAGS: Array<CampaignTag | "All Tags"> = ["All Tags", "Email Marketing", "Holiday Campaign", "Promo", "Other"];
const STATUSES: Array<CampaignStatus | "All Status"> = ["All Status", "Active", "Pending", "Completed"];

export default function CampaignPage() {
  const navigate = useNavigate();

  const [trigger, setTrigger] = useState<TriggerFilter>("All Triggers");
  const [tab, setTab] = useState<Tab>("one-time");
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<CampaignTag | "All Tags">("All Tags");
  const [status, setStatus] = useState<CampaignStatus | "All Status">("All Status");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    let rows: Campaign[] = campaignsSeed;

    if (q.trim()) {
      const s = q.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(s) ||
          r.delivery.toLowerCase().includes(s) ||
          r.tag.toLowerCase().includes(s)
      );
    }

    if (status !== "All Status") rows = rows.filter((r) => r.status === status);

    if (tab === "one-time") {
      if (tag !== "All Tags") rows = rows.filter((r) => r.tag === tag);
    } else {
      if (trigger !== "All Triggers") {
        const t = trigger.toLowerCase();
        rows = rows.filter((r) => r.delivery.toLowerCase().includes(t));
      }
    }

    return rows;
  }, [q, tag, status, trigger, tab]);

  useEffect(() => {
    setPage(1);
  }, [q, tag, status, trigger, tab]);

  const start = (page - 1) * perPage;
  const data = filtered.slice(start, start + perPage);
  const total = filtered.length;

  return (
    <div className="p-6 bg-[#D2D4D3] min-h-[calc(100vh-64px)]">
      <div className="mb-6">
        <h1 className="text-[28px] font-semibold text-zinc-900">Campaign</h1>
        <p className="text-sm text-zinc-600 mt-1">Monitor and respond to guest feedback</p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex rounded-lg border border-zinc-300 bg-[#EAEBEB8A] shadow-sm overflow-hidden">
          <button
            onClick={() => setTab("one-time")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "one-time" ? "bg-black text-white" : " text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            One-Time Campaign
          </button>
          <button
            onClick={() => setTab("automated")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "automated" ? "bg-black text-white" : " text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            Automated Campaign
          </button>
        </div>

        <button
          onClick={() => navigate(`/campaign/create-new-campaign?tab=${tab}`)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0C5340] text-white px-4 py-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Create Campaign
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white/70 p-4 mb-4">
        {tab === "one-time" ? (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => {
                  setPage(1);
                  setQ(e.target.value);
                }}
                placeholder="Search campaigns..."
                className="w-full rounded-lg border border-zinc-300 text-zinc-600 bg-white pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-zinc-300"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="2" />
                  <path d="M20 20L17 17" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>

            <div className="relative">
              <select
                className="appearance-none w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-9 text-zinc-600"
                value={tag}
                onChange={(e) => {
                  setPage(1);
                  setTag(e.target.value as any);
                }}
              >
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <div className="relative">
              <select
                className="appearance-none w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-9 text-zinc-600"
                value={status}
                onChange={(e) => {
                  setPage(1);
                  setStatus(e.target.value as any);
                }}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => {
                  setPage(1);
                  setQ(e.target.value);
                }}
                placeholder="Search automated rules..."
                className="w-full rounded-lg border border-zinc-300 text-zinc-600 bg-white pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-zinc-300"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="2" />
                  <path d="M20 20L17 17" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>

            <div className="relative">
              <select
                className="appearance-none w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-9 text-zinc-600"
                value={trigger}
                onChange={(e) => {
                  setPage(1);
                  setTrigger(e.target.value as TriggerFilter);
                }}
              >
                {TRIGGERS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <div className="relative">
              <select
                className="appearance-none w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-9 text-zinc-600"
                value={status}
                onChange={(e) => {
                  setPage(1);
                  setStatus(e.target.value as any);
                }}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>

      <CampaignTable
        rows={data}
        page={page}
        perPage={perPage}
        total={total}
        onPage={setPage}
        onPerPage={(n) => {
          setPerPage(n);
          setPage(1);
        }}
      />
    </div>
  );
}
