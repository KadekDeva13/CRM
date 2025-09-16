import { type ReactNode } from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  value: string | number;
  delta?: string;
  deltaNote?: string;
  positive?: boolean;
  icon?: ReactNode;
  className?: string;
  variant?: "primary" | "neutral";
  children?: ReactNode;
};

export default function Card({
  title,
  subtitle,
  value,
  delta,
  deltaNote = "From Last Month",
  positive = true,
  variant = "neutral",
  icon,
  className,
  children,
}: CardProps) {
  const base =
    "relative w-[296px] h-[110px] rounded-[20px] p-4 border border-white/5 overflow-hidden";

const surface =
  variant === "primary"
    ? "bg-[#E6F1FD] before:absolute before:inset-0 before:rounded-[20px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.40)_100%)] before:pointer-events-none"
    : "bg-[#E6F1FD] before:absolute before:inset-0 before:rounded-[20px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.40)_100%)] before:pointer-events-none";


  const iconWrap =
    "shrink-0 rounded-full border border-black/10 bg-white/50 p-1.5";

  return (
    <div className={[base, surface, className].filter(Boolean).join(" ")}>
      <div className="mb-2 flex items-start justify-between">
        <div>
          <div className="text-[15px] leading-none text-black font-helectiva">
            {title}
          </div>
          {!!subtitle && (
            <div className="mt-0.5 text-[11px] text-black/70 font-helectiva">
              {subtitle}
            </div>
          )}
        </div>

        <div className={iconWrap}>
          {icon ?? (positive ? (
            <TrendUpIcon className="h-4 w-4 text-black" />
          ) : (
            <TrendDownIcon className="h-4 w-4 text-black" />
          ))}
        </div>
      </div>

      <div className="text-[26px] font-semibold tracking-tight text-black font-helectiva">
        {value}
      </div>

      {children ? <div className="mt-2">{children}</div> : null}

      {delta && (
        <div className="absolute right-4 bottom-2 text-right">
          <div className="text-[12px] text-black font-helectiva inline-flex items-center gap-1">
            {positive ? "+" : ""}
            {delta}
            {positive ? (
              <TrendUpIcon className="h-3.5 w-3.5 text-black" />
            ) : (
              <TrendDownIcon className="h-3.5 w-3.5 text-black" />
            )}
          </div>
          {!!deltaNote && (
            <div className="text-[10px] mt-0.5 text-black/70 font-helectiva">
              {deltaNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TrendUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2.5 10.5L6.25 6.75L9.25 9.75L13.5 5.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.75 5.5H13.5V8.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TrendDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2.5 5.5L6.25 9.25L9.25 6.25L13.5 10.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.75 10.5H13.5V7.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
