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
  variant?: "stat" | "icon";
  children?: ReactNode;
};

export default function Card({
  title,
  subtitle,
  value,
  delta,
  deltaNote = "From Last Month",
  positive = true,
  icon,
  variant = "stat",
  className,
  children,
}: CardProps) {
  const base =
    "relative w-[296px] h-[110px] rounded-[20px] p-4 border border-white/5 w-full";

  switch (variant) {
    case "stat": {
      const surface =
        "bg-[#F5F5F5] before:absolute before:inset-0 before:rounded-[20px] before:pointer-events-none";
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

    // ✅ Placeholder buat variant berikutnya
    case "icon":
      return (
        <div className={["flex flex-col lg:flex-row text-center lg:text-start items-center bg-white rounded-[8px] mx-auto lg:pl-[25px] py-[15px] lg:py-[25px] w-full gap-2 lg:gap-0", className].join(" ")}>
          {icon && (
            <div className="flex items-center justify-center">
              {icon}
            </div>
          )}

          {/* Right: Content */}
          <div className="flex-1 px-4">
            <div className="text-[14px] text-[#4B5563]">{title}</div>
            <div className="text-[24px] font-bold text-[#111827]">{value}</div>
          </div>
        </div>

      );

    default:
      return null;
  }
}
