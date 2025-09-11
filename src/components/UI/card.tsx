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
        "bg-[#0A84FF] relative before:absolute before:inset-0 before:rounded-2xl before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.40)_100%)] before:pointer-events-none"
      : 
        "bg-[#111111] relative before:absolute before:inset-0 before:rounded-2xl before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.40)_100%)] before:pointer-events-none";

  const iconWrap =
    "shrink-0 rounded-full border border-white/10 bg-white/20 p-1.5";

  const showPill = variant === "primary";
  const deltaWrap =
    "absolute bottom-3 right-4 text-sm font-medium leading-none";

  return (
    <div className={[base, surface, className].filter(Boolean).join(" ")}>
      <div className="mb-3 flex items-start justify-between">
        <div className="text-[13px] leading-none text-white/80 font-helectiva">{title}</div>

        <div className={iconWrap}>
          {icon ?? (
            positive ? (
              <TrendUpIcon className="h-5.5 w-10 text-white" />
            ) : (
              <TrendDownIcon className="h-5.5 w-10 text-white" />
            )
          )}
        </div>
      </div>

      <div className="text-2xl font-semibold tracking-tight font-helectiva">{value}</div>

      {delta && (
        <div className={deltaWrap}>
          {showPill ? (
            <span className="rounded-md bg-white/20 px-2 py-0.5 text-[12px] text-white font-helectiva">
              {positive ? "+" : ""}
              {delta}
            </span>
          ) : (
            <span className="text-white/90 font-helectiva">
              {positive ? "+" : ""}
              {delta}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function TrendUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
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

function TrendDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.5 5.5L6.25 9.25L9.25 6.25L13.5 10.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 10.5H13.5V7.75"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
