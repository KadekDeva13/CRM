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
  className,
  children,
}: CardProps) {
  const base =
    "relative w-[296px] h-[110px] rounded-[20px] p-4 border border-white/5 overflow-hidden";

const surface =
  variant === "primary"
    ? "bg-[#7C9EA2] before:absolute before:inset-0 before:rounded-[20px]  before:pointer-events-none"
    : "bg-[#F5F5F5] before:absolute before:inset-0 before:rounded-[20px]  before:pointer-events-none";

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
            {positive }
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