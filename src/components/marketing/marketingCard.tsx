import React from "react";
import { IconUsers, IconEye, IconHand, IconBank } from "./marketingIcon";

type IconKey = "users" | "eye" | "hand" | "bank";

type Props = {
  title: string;
  value: string | number;
  delta?: string;
  subtitle?: string;
  icon?: IconKey;
  className?: string;
};

export default function MarketingCard({
  title,
  value,
  delta,
  subtitle = "From last month",
  icon = "users",
  className = "",
}: Props): React.ReactElement {
  const Icon =
    icon === "users" ? IconUsers :
    icon === "eye"   ? IconEye   :
    icon === "hand"  ? IconHand  :
    icon === "bank"  ? IconBank  : IconUsers;

  return (
    <div
      className={[
        "rounded-2xl",
        "bg-[#FFFFFF]",
        "shadow-sm ring-1 ring-zinc-200/60",
        "px-4 py-4",
        className,
      ].join(" ")}
    >
      <div className="text-[11px] font-medium text-black">{title}</div>

      <div className="mt-1 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-2xl font-semibold tracking-tight text-black">
            {value}
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            {delta && (
              <span className="text-[11px] font-semibold text-emerald-600">
                {delta} <span className="align-middle">↗</span>
              </span>
            )}
          </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[11px] text-black/70">{subtitle}</span>
            </div>
        </div>
        <Icon className="h-10 w-10 text-black" />
      </div>
    </div>
  );
}
