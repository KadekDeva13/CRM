import type { CampaignStatus } from "../../types/Campaigns";
const STYLE: Record<CampaignStatus, { bg: string; text: string }> = {
  Active:    { bg: "bg-[#0AB19B]",   text: "text-white" },
  Pending:   { bg: "bg-[#B93B00C7]", text: "text-[#FFDBCB]" },
  Completed: { bg: "bg-[#16A34A]",   text: "text-white" },
};

function isCampaignStatus(v: unknown): v is CampaignStatus {
  return v === "Active" || v === "Pending" || v === "Completed";
}

function normalizeStatus(v: unknown): CampaignStatus | null {
  if (isCampaignStatus(v)) return v;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "active") return "Active";
    if (s === "pending") return "Pending";
    if (s === "completed") return "Completed";
  }
  return null;
}

export default function StatusPill({ value }: { value: unknown }) {
  const key = normalizeStatus(value) ?? "Pending";
  const c = STYLE[key];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full text-xs font-medium ${c.bg} ${c.text} w-[92px] h-[26px]`}
    >
      {key}
    </span>
  );
}
