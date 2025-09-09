import { type ReactNode } from "react";

type CardProps = {
  title: string;
  value: string | number;
  delta?: string;
  positive?: boolean;
  variant?: "primary" | "neutral";
  icon?: ReactNode;
  className?: string;
};

export default function Card({
  title,
  value,
  delta,
  positive = true,
  variant = "neutral",
  icon,
  className,
}: CardProps) {
  const base =
    "relative rounded-2xl p-4 text-white shadow-sm border border-white/5 overflow-hidden";
  const surface =
    variant === "primary"
      ?
        "bg-[linear-gradient(180deg,#2F80FF_0%,#2D74FF_45%,#2C6BFF_100%)]"
      : 
        "bg-[linear-gradient(180deg,#2C2C2C_0%,#2A2A2A_50%,#282828_100%)]";

  return (
    <div className={[base, surface, className].filter(Boolean).join(" ")}>
      <div className="mb-3 flex items-start justify-between">
        <div className="text-[13px] leading-none text-white/80">{title}</div>

        <div className="shrink-0 rounded-full border border-white/10 bg-black/20 p-1.5">
          {icon ?? <TrendUpIcon className="h-3.5 w-3.5 text-white/90" />}
        </div>
      </div>

      <div className="text-2xl font-semibold tracking-tight">{value}</div>

      {delta && (
        <div
          className={[
            "absolute bottom-3 right-4 text-sm",
            positive ? "text-white/80" : "text-white/70",
          ].join(" ")}
        >
          <span
            className={[
              "rounded-md px-2 py-0.5 text-[12px] font-medium",
              positive
                ? "bg-white/10 text-[#7FB3FF]"
                : "bg-white/5 text-[#FF8A8A]",
            ].join(" ")}
          >
            {positive ? "+" : ""}
            {delta}
          </span>
        </div>
      )}
    </div>
  );
}

function TrendUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2.5 10.5L6.25 6.75L9.25 9.75L13.5 5.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 5.5H13.5V8.25"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
