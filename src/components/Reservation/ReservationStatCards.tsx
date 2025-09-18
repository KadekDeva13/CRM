import * as React from "react";

type Props = {
  title: string;
  value: React.ReactNode;
  color?: string;
};

export default function ReservationStatCard({ title, value, color = "text-zinc-900" }: Props) {
  return (
    <div className="h-[112px] w-full rounded-[16px] bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200 px-4 py-3">
      <div className="text-[12px] text-zinc-500">{title}</div>
      <div className={`mt-1 text-[22px] font-semibold leading-none ${color}`}>{value}</div>
    </div>
  );
}
