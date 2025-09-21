import * as React from "react";

type Variant = "success" | "warning";
type Color =
  | "emerald"
  | "sky"
  | "indigo"
  | "rose"
  | "gray"
  | "teal"
  | "danger"
  | "zinc"; 

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  color?: Color;
  className?: string;
};

export default function Badge({
  children,
  variant,
  color = "gray",
  className = "",
}: Props) {
  const byVariant: Record<Variant, string> = {
    success: "bg-emerald-500/15 text-emerald-300",
    warning: "bg-amber-500/15 text-amber-300",
  };

  const byColor: Record<Color, string> = {
    emerald: "bg-emerald-500/15 text-emerald-300",
    sky: "bg-[#0F5A62] text-white",
    indigo: "bg-indigo-500/15 text-indigo-300",
    rose: "bg-rose-500/15 text-rose-300",
    gray: "bg-white/10 text-white/70",
    teal: "bg-[#0AB19B] text-white",
    danger: "bg-red-500/15 text-red-300",
    zinc: "bg-zinc-500/15 text-zinc-300",
  };

  const cls = variant ? byVariant[variant] : byColor[color];

  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-full",
        "h-[19px] px-2 text-[11px] font-medium",
        cls,
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
