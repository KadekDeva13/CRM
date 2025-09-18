import type { GuestStatus } from "../../types/guest";

const STYLE: Record<GuestStatus, { bg: string; text: string }> = {
  Active:   { bg: "bg-[#0AB19B]",  text: "text-[#FFFFFF]" },
  Pending:  { bg: "bg-[#DB961736]", text: "text-[#FF9D00]" },
  Rejected: { bg: "bg-[#FF000036]", text: "text-[#FFFDF9]" },
};

function isGuestStatus(v: unknown): v is GuestStatus {
  return v === "Active" || v === "Pending" || v === "Rejected";
}

function normalizeStatus(v: unknown): GuestStatus | null {
  if (isGuestStatus(v)) return v;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "active") return "Active";
    if (s === "pending") return "Pending";
    if (s === "rejected") return "Rejected";
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
