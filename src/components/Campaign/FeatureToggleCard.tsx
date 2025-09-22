import * as React from "react";

/* ---------- Types ---------- */
type Meta = { icon: React.ReactNode; label: string };

type Props = {
  active: boolean;
  onChange: (next: boolean) => void;
  title: string;
  description: string;
  leadingIcon: React.ReactNode;
  meta?: Meta[];
};

/* ---------- Component ---------- */
export default function FeatureToggleCard({
  active,
  onChange,
  title,
  description,
  leadingIcon,
  meta = [],
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-4 py-4 shadow-sm md:px-6 md:py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 shrink-0 text-emerald-700">
            {/* warna ikon ikut text parent via currentColor */}
            {leadingIcon}
          </div>

          <div className="min-w-0">
            <div className="mb-1 text-base font-semibold text-zinc-800">
              {title}
            </div>
            <p className="text-sm text-zinc-500">{description}</p>

            {!!meta.length && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {meta.map((m, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-600"
                  >
                    <span className="inline-flex shrink-0 text-zinc-400">{m.icon}</span>
                    {m.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Switch: absolute + style left → pasti geser */}
        <button
          type="button"
          role="switch"
          aria-checked={active}
          onClick={() => onChange(!active)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            active ? "bg-emerald-600" : "bg-zinc-300"
          }`}
        >
          <span
            className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left]"
            // 2px saat OFF, 20px saat ON → knob geser halus
            style={{ left: active ? 20 : 2 }}
          />
        </button>
      </div>
    </div>
  );
}

/* ---------- Icons: aman dari override + ukuran eksplisit + currentColor ---------- */
type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

export const IconSchedule = ({ className, ...rest }: IconProps) => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" {...rest} className={className}>
    <path d="M8.625 1.5V.75a.75.75 0 1 1 1.5 0V1.5h.375C11.328 1.5 12 2.172 12 3v7.5A1.5 1.5 0 0 1 10.5 12h-9A1.5 1.5 0 0 1 0 10.5V3c0-.828.672-1.5 1.5-1.5h.375V.75a.75.75 0 1 1 1.5 0V1.5h5.25ZM1.5 3h9v7.5h-9V3Z" fill="currentColor" />
  </svg>
);

export const IconAudience = ({ className, ...rest }: IconProps) => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" {...rest} className={className}>
    <path d="M6 6.75A2.25 2.25 0 1 0 6 2.25a2.25 2.25 0 0 0 0 4.5Zm0 1.5c-2.071 0-3.75 1.679-3.75 3.75h7.5C9.75 9.929 8.071 8.25 6 8.25Z" fill="currentColor" />
  </svg>
);

export const IconOpenRate = ({ className, ...rest }: IconProps) => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" {...rest} className={className}>
    <path d="M10.125 1.875h-8.25A1.125 1.125 0 0 0 .75 3v6c0 .621.504 1.125 1.125 1.125h8.25A1.125 1.125 0 0 0 11.25 9V3c0-.621-.504-1.125-1.125-1.125ZM9.938 3 6 6.188 2.063 3H9.937Z" fill="currentColor" />
  </svg>
);

export const IconClick = ({ className, ...rest }: IconProps) => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" {...rest} className={className}>
    <path d="M4.5.75V10.5a.75.75 0 1 0 1.5 0V6.75l1.97 1.97a.75.75 0 1 0 1.06-1.061L6.53 5.159A.75.75 0 0 0 6 4.938V.75A.75.75 0 0 0 4.5.75Z" fill="currentColor" />
  </svg>
);

export const IconConversion = ({ className, ...rest }: IconProps) => (
  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" {...rest} className={className}>
    <path d="M2.25 1.5h7.5C10.579 1.5 11.25 2.172 11.25 3v6c0 .828-.671 1.5-1.5 1.5h-7.5A1.5 1.5 0 0 1 .75 9V3c0-.828.671-1.5 1.5-1.5ZM3 3v1.5h6V3H3Zm0 3v1.5h4.5V6H3Zm0 3v.75h6V9H3Z" fill="currentColor" />
  </svg>
);

export const IconDrip = ({ className, ...rest }: IconProps) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" {...rest} className={className}>
    <path d="M8 1.333 5 5.5C3.833 6.917 3.916 9.083 5 10.5c1 1.333 2.917 2 4.333 1.333 1.917-.916 2.667-3 1.584-4.666L8 1.333Z" fill="currentColor" />
  </svg>
);

export const IconTracking = ({ className, ...rest }: IconProps) => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" {...rest} className={className}>
    <path d="M2 12h12v1.5H2V12Zm0-4.25h8V9.25H2V7.75ZM2 3.5h6V5H2V3.5Z" fill="currentColor" />
  </svg>
);
