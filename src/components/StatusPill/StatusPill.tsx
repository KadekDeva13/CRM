import type { GuestStatus } from "../../types/guest";

const map: Record<GuestStatus, { bg: string; text: string }> = {
  "In Progress": { bg: "bg-sky-500/15", text: "text-sky-300" },
  "Complete":    { bg: "bg-emerald-500/15", text: "text-emerald-300" },
  "Pending":     { bg: "bg-yellow-500/15", text: "text-yellow-300" },
  "Approved":    { bg: "bg-indigo-500/15", text: "text-indigo-300" },
  "Rejected":    { bg: "bg-rose-500/15", text: "text-rose-300" },
};

export default function StatusPill({ value }: { value: GuestStatus }) {
  const c = map[value];
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${c.bg} ${c.text}`}>
      {value}
    </span>
  );
}
