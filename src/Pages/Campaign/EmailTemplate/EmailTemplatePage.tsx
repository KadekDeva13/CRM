import * as React from "react";
import { useNavigate } from "react-router-dom";
import TemplateCard, { type CampaignTemplate } from "../../../components/Campaign/TemplateCard";
import { IconArrowLeft, IconArrowRight, IconPageNumber } from "../../../components/Campaign/TemplateIcon";
import UploadTemplateModal, { type UploadTemplatePayload } from "../../../components/Campaign/UploadTemplateModal";

type Category = "All Category" | "Announcement" | "Welcome" | "Follow-up";
type Sort = "Newest" | "Oldest" | "Most Used";

type Filter = {
  q: string;
  category: Category;
  sort: Sort;
};

const SEED: (CampaignTemplate & { category: Exclude<Category, "All Category"> })[] = [
  { id: "a1", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
  { id: "a2", title: "Reminder", description: "Reminder template for appointments, deadlines, or important events.", status: "Draft", usedCount: 124, category: "Announcement", thumbUrl: "/image/reminder.png" },
  { id: "a3", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
  { id: "b1", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
  { id: "b2", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
  { id: "b3", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
  { id: "c1", title: "Reminder", description: "Reminder template for appointments, deadlines, or important events.", status: "Draft", usedCount: 124, category: "Announcement", thumbUrl: "/image/reminder.png" },
  { id: "c2", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
  { id: "c3", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
  { id: "c4", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
  { id: "c5", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
  { id: "c6", title: "Welcome Email", description: "Clean visual (for example, a modern illustration or lifestyle photo aligned with your brand).", status: "Active", usedCount: 142, category: "Welcome", thumbUrl: "/image/welcome.png" },
];

export default function EmailTemplatePage() {
  const [items, setItems] = React.useState(SEED);
  const [filter, setFilter] = React.useState<Filter>({ q: "", category: "All Category", sort: "Newest" });
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(9);

  // === Upload Modal state ===
  const [openUpload, setOpenUpload] = React.useState(false);

  // track blob URLs untuk di-revoke saat unmount/replace
  const blobUrls = React.useRef<string[]>([]);
  React.useEffect(() => {
    return () => {
      blobUrls.current.forEach((u) => URL.revokeObjectURL(u));
      blobUrls.current = [];
    };
  }, []);

  const handleUploadSubmit = (p: UploadTemplatePayload) => {
    const isImage = p.file.type.startsWith("image/");
    const objectUrl = isImage ? URL.createObjectURL(p.file) : "";
    if (objectUrl) blobUrls.current.push(objectUrl);

    const item: (CampaignTemplate & { category: Exclude<Category, "All Category"> }) = {
      id: crypto.randomUUID(),
      title: p.name,
      description: p.description || "Imported template",
      status: "Draft",
      usedCount: 0,
      category: p.category as Exclude<Category, "All Category">,
      thumbUrl: isImage ? objectUrl : "/image/reminder.png",
    };

    setItems((s) => [item, ...s]);
    setOpenUpload(false);
    setPage(1);
  };

  const q = filter.q.trim().toLowerCase();
  const filtered = React.useMemo(() => {
    let arr = items.filter(
      (t) =>
        (filter.category === "All Category" || t.category === filter.category) &&
        (t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
    );
    if (filter.sort === "Newest") arr = [...arr].reverse();
    if (filter.sort === "Oldest") arr = [...arr];
    if (filter.sort === "Most Used") arr = [...arr].sort((a, b) => b.usedCount - a.usedCount);
    return arr;
  }, [items, filter, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIdx = (page - 1) * pageSize + 1;
  const endIdx = Math.min(filtered.length, page * pageSize);
  const paged = filtered.slice(startIdx - 1, endIdx);

  React.useEffect(() => setPage(1), [filter.q, filter.category, filter.sort, pageSize]);

  return (
    <div className="mx-auto max-w-[1200px] space-y-5 px-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Choose Campaign Template</h1>
        <p className="mt-1 text-sm text-[#4B5563]">Select the perfect template for your campaign needs</p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-xs">
            <input
              value={filter.q}
              onChange={(e) => setFilter((s) => ({ ...s, q: e.target.value }))}
              placeholder="Search Email Template"
              className="w-full rounded-lg border border-zinc-300 bg-white px-9 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-zinc-300"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <SearchIcon className="h-4 w-4" />
            </span>
          </div>

          <select
            value={filter.category}
            onChange={(e) => setFilter((s) => ({ ...s, category: e.target.value as Category }))}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 md:w-44"
          >
            <option>All Category</option>
            <option>Announcement</option>
            <option>Welcome</option>
            <option>Follow-up</option>
          </select>

          <div className="relative">
            <select
              value={filter.sort}
              onChange={(e) => setFilter((s) => ({ ...s, sort: e.target.value as Sort }))}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-8 text-sm text-zinc-700 md:w-36"
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>Most Used</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenUpload(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <UploadIcon className="h-4 w-4" />
            Upload Template
          </button>

          <button
            onClick={() => navigate("/campaign/email-template/template-builder")}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <PlusIcon className="h-4 w-4" />
            Create Template
          </button>
        </div>
      </div>

      <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(363px,1fr))]">
        {paged.map((t) => (
          <TemplateCard
            key={t.id}
            item={t}
            onOpen={() => alert(`Open: ${t.title}`)}
            onEdit={() => alert(`Edit: ${t.title}`)}
            onDelete={() => setItems((s) => s.filter((x) => x.id !== t.id))}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span>Showing</span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="appearance-none rounded-md border border-zinc-300 bg-white px-2 pr-7 py-1 text-sm"
            >
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
            </select>
            <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-500">
              <IconPageNumber className="h-4 w-4" />
            </span>
          </div>
          <span>of {filtered.length} templates</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span>
            Showing {startIdx} to {endIdx} of {filtered.length}
          </span>

          <div className="ml-2 flex items-center gap-2">
            <PagerBtn aria-label="Previous" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <IconArrowLeft className="h-3.5 w-3.5" />
            </PagerBtn>

            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const active = page === n;
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-8 w-8 rounded-md ring-1 ring-inset ${
                    active ? "bg-zinc-900 text-white ring-zinc-900" : "text-zinc-600 ring-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {n}
                </button>
              );
            })}

            <PagerBtn
              aria-label="Next"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <IconArrowRight className="h-3.5 w-3.5" />
            </PagerBtn>
          </div>
        </div>
      </div>

      {/* Modal Upload */}
      <UploadTemplateModal open={openUpload} onClose={() => setOpenUpload(false)} onSubmit={handleUploadSubmit} />
    </div>
  );
}

function PagerBtn({
  children,
  onClick,
  disabled,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      disabled={disabled}
      onClick={onClick}
      className="
        inline-flex h-8 w-8 items-center justify-center rounded-md
        text-zinc-600 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50
        focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300
      "
    >
      {children}
    </button>
  );
}

function SearchIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function UploadIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
