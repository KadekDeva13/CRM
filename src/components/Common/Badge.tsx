import * as React from "react";

type Props = {
  children: React.ReactNode;
  color?: "emerald" | "sky" | "indigo" | "rose" | "gray";
  className?: string;
};

export function Badge({ children, color = "gray", className = "" }: Props) {
  const map: Record<NonNullable<Props["color"]>, string> = {
    emerald: "bg-emerald-500/15 text-emerald-300",
    sky: "bg-sky-500/15 text-sky-300",
    indigo: "bg-indigo-500/15 text-indigo-300",
    rose: "bg-rose-500/15 text-rose-300",
    gray: "bg-white/10 text-white/70",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        map[color],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
