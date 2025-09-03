import React from "react";
import type { ContractStatus } from "../../api/contract.mock";

const MAP: Record<ContractStatus, string> = {
  Draft: "bg-slate-500/20 ring-slate-400/30 text-slate-200",
  Sent: "bg-indigo-500/20 ring-indigo-400/30 text-indigo-200",
  "Under Review": "bg-amber-500/20 ring-amber-400/30 text-amber-100",
  Signed: "bg-emerald-500/20 ring-emerald-400/30 text-emerald-100",
  Declined: "bg-rose-500/20 ring-rose-400/30 text-rose-100",
  Expired: "bg-neutral-500/20 ring-neutral-400/30 text-neutral-200",
  Prospect: "bg-cyan-500/20 ring-cyan-400/30 text-cyan-100",
};

type Props = {
  value?: ContractStatus | string;
};

export default function ContractStatusBadge({ value }: Props): React.ReactElement {
  const cls =
    (value && (MAP as Record<string, string>)[value]) ||
    "bg-white/10 ring-white/20 text-white/80";

  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-md ring-1 text-[12px] ${cls}`}
    >
      {value || "-"}
    </span>
  );
}
