type Props = {
  type: string;
  tags: string;
  range: string;
  onChange: (patch: Partial<{ type: string; tags: string; range: string }>) => void;
  onExportCsv?: () => void;
};

export default function FiltersBar({
  type,
  tags,
  range,
  onChange,
  onExportCsv,
}: Props) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-xl border border-zinc-200 bg-white/80 p-3 pl-4 pr-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={type}
          onChange={(e) => onChange({ type: e.target.value })}
          className="h-10 min-w-[160px] rounded-lg border border-zinc-300 bg-white px-3 pr-8 text-sm text-zinc-700 outline-none transition hover:border-zinc-400 focus:border-emerald-500"
        >
          <option>Campaign Type</option>
          <option>Email</option>
          <option>SMS</option>
          <option>Push</option>
        </select>

        <select
          value={tags}
          onChange={(e) => onChange({ tags: e.target.value })}
          className="h-10 min-w-[140px] rounded-lg border border-zinc-300 bg-white px-3 pr-8 text-sm text-zinc-700 outline-none transition hover:border-zinc-400 focus:border-emerald-500"
        >
          <option>Tags</option>
          <option>Promo</option>
          <option>Loyalty</option>
          <option>Seasonal</option>
        </select>

        <select
          value={range}
          onChange={(e) => onChange({ range: e.target.value })}
          className="h-10 min-w-[160px] rounded-lg border border-zinc-300 bg-white px-3 pr-8 text-sm text-zinc-700 outline-none transition hover:border-zinc-400 focus:border-emerald-500"
        >
          <option>Last 6 Months</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>
      <button
        type="button"
        onClick={onExportCsv}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-sm text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
          <path d="M4 17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3" />
        </svg>
        Export to CSV
      </button>
    </div>
  );
}
