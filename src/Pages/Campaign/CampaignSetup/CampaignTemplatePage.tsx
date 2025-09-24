import * as React from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "../../../components/Campaign/StepProgress";
import TemplateCard, { type CampaignTemplate } from "../../../components/Campaign/TemplateCard";
import { IconArrowLeft, IconArrowRight, IconPageNumber } from "../../../components/Campaign/TemplateIcon";

type CategorySeed = "All Category" | "Announcement" | "Welcome" | "Follow-up";

const SEED: (CampaignTemplate & { category: Exclude<CategorySeed, "All Category"> })[] = [
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

export default function CampaignTemplatePage() {
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: "Campaign Type" },
    { id: 2, label: "Campaign Details" },
    { id: 3, label: "Template Selection" },
    { id: 4, label: "Review & Targeting" },
    { id: 5, label: "Schedule" },
  ] as const;

  const [items] = React.useState(SEED);

  const [roomType, setRoomType] = React.useState<string>("Hotel Room");
  const [categoryUi, setCategoryUi] = React.useState<"All Templates" | "Welcome" | "Reminder" | "Promotion">(
    "All Templates"
  );

  const seedCategory: CategorySeed =
    categoryUi === "All Templates"
      ? "All Category"
      : categoryUi === "Welcome"
        ? "Welcome"
        : categoryUi === "Reminder"
          ? "Announcement"
          : "Announcement";

  const filtered = React.useMemo(() => {
    let arr = [...items];
    if (seedCategory !== "All Category") {
      arr = arr.filter((t) => t.category === seedCategory);
    }
    return arr;
  }, [items, seedCategory]);

  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(9);
  React.useEffect(() => setPage(1), [seedCategory, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIdx = (page - 1) * pageSize + 1;
  const endIdx = Math.min(filtered.length, page * pageSize);
  const paged = filtered.slice(startIdx - 1, endIdx);

const handleChoose = (t: CampaignTemplate) => {
  navigate(
    "/campaign/customize-template?back=/campaign/create-template",
    { state: { template: t } }
  );
};

  return (
    <div className="mx-auto max-w-[1100px] px-2 py-2 md:px-6 md:py-6">
      <div className="mb-3">
        <h1 className="text-[22px] font-semibold text-[#111827]">Setup Your Campaign</h1>
        <p className="mt-1 text-sm text-[#4B5563]">
          Configure your email marketing campaign with smart automation features
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <StepProgress steps={steps as unknown as { id: number; label: string }[]} current={3} />
        <div className="text-xs text-zinc-500">Step 3 of {steps.length}</div>
      </div>

      <div className="mb-3 flex items-center justify-between rounded-xl border border-white bg-white px-4 py-3">
        <div className="text-[15px] font-medium text-zinc-800">Choose Template</div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-zinc-600">Room Type:</span>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="h-9 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-zinc-300"
            >
              <option>Hotel Room</option>
              <option>Villa</option>
              <option>Apartment</option>
              <option>All</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="text-zinc-600">Category:</span>
            <select
              value={categoryUi}
              onChange={(e) => setCategoryUi(e.target.value as typeof categoryUi)}
              className="h-9 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-zinc-300"
            >
              <option>All Templates</option>
              <option>Welcome</option>
              <option>Reminder</option>
              <option>Promotion</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {paged.map((t) => (
          <TemplateCard
            key={t.id}
            item={t}
            onOpen={() => handleChoose(t)}
            onEdit={() => handleChoose(t)}
            onDelete={() => { }}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-xl border border-white bg-white p-3 md:flex-row">
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
            Showing {Math.min(startIdx, filtered.length)} to {endIdx} of {filtered.length}
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
                  className={`h-8 w-8 rounded-md ring-1 ring-inset ${active ? "bg-zinc-900 text-white ring-zinc-900" : "text-zinc-600 ring-zinc-300 hover:bg-zinc-50"
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

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/campaign/setup?step=2")}
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          ← Back to Details
        </button>
<button
  onClick={() =>
    navigate("/campaign/customize-template?back=/campaign/create-template")
  }
  className="rounded-md bg-[#0F5A62] px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
>
  Continue to Customize →
</button>

      </div>
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