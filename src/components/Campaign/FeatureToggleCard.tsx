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
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${active ? "bg-emerald-600" : "bg-zinc-300"
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

    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" {...rest} className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M7 0.75C8.85652 0.75 10.637 1.4875 11.9497 2.80025C13.2625 4.11301 14 5.89348 14 7.75C14 9.60652 13.2625 11.387 11.9497 12.6997C10.637 14.0125 8.85652 14.75 7 14.75C5.14348 14.75 3.36301 14.0125 2.05025 12.6997C0.737498 11.387 0 9.60652 0 7.75C0 5.89348 0.737498 4.11301 2.05025 2.80025C3.36301 1.4875 5.14348 0.75 7 0.75ZM6.34375 4.03125V7.75C6.34375 7.96875 6.45312 8.17383 6.63633 8.29688L9.26133 10.0469C9.56211 10.2492 9.96953 10.1672 10.1719 9.86367C10.3742 9.56016 10.2922 9.15547 9.98867 8.95312L7.65625 7.4V4.03125C7.65625 3.66758 7.36367 3.375 7 3.375C6.63633 3.375 6.34375 3.66758 6.34375 4.03125Z" fill="#6B7280" />
    </svg>

);

export const IconAudience = ({ className, ...rest }: IconProps) => (

    <svg width="19" height="15" viewBox="0 0 19 15" fill="none" {...rest} className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M4.54688 0.75C5.12704 0.75 5.68344 0.980468 6.09367 1.3907C6.50391 1.80094 6.73438 2.35734 6.73438 2.9375C6.73438 3.51766 6.50391 4.07406 6.09367 4.4843C5.68344 4.89453 5.12704 5.125 4.54688 5.125C3.96671 5.125 3.41031 4.89453 3.00008 4.4843C2.58984 4.07406 2.35938 3.51766 2.35938 2.9375C2.35938 2.35734 2.58984 1.80094 3.00008 1.3907C3.41031 0.980468 3.96671 0.75 4.54688 0.75ZM14.6094 0.75C15.1895 0.75 15.7459 0.980468 16.1562 1.3907C16.5664 1.80094 16.7969 2.35734 16.7969 2.9375C16.7969 3.51766 16.5664 4.07406 16.1562 4.4843C15.7459 4.89453 15.1895 5.125 14.6094 5.125C14.0292 5.125 13.4728 4.89453 13.0626 4.4843C12.6523 4.07406 12.4219 3.51766 12.4219 2.9375C12.4219 2.35734 12.6523 1.80094 13.0626 1.3907C13.4728 0.980468 14.0292 0.75 14.6094 0.75ZM0.609375 8.91758C0.609375 7.30703 1.91641 6 3.52695 6H4.69453C5.1293 6 5.54219 6.0957 5.91406 6.26523C5.87852 6.46211 5.86211 6.66719 5.86211 6.875C5.86211 7.91953 6.32148 8.85742 7.04609 9.5C7.04062 9.5 7.03516 9.5 7.02695 9.5H1.1918C0.871875 9.5 0.609375 9.2375 0.609375 8.91758ZM11.6918 9.5C11.6863 9.5 11.6809 9.5 11.6727 9.5C12.4 8.85742 12.8566 7.91953 12.8566 6.875C12.8566 6.66719 12.8375 6.46484 12.8047 6.26523C13.1766 6.09297 13.5895 6 14.0242 6H15.1918C16.8023 6 18.1094 7.30703 18.1094 8.91758C18.1094 9.24023 17.8469 9.5 17.527 9.5H11.6918ZM6.73438 6.875C6.73438 6.17881 7.01094 5.51113 7.50322 5.01884C7.9955 4.52656 8.66318 4.25 9.35938 4.25C10.0556 4.25 10.7232 4.52656 11.2155 5.01884C11.7078 5.51113 11.9844 6.17881 11.9844 6.875C11.9844 7.57119 11.7078 8.23887 11.2155 8.73116C10.7232 9.22344 10.0556 9.5 9.35938 9.5C8.66318 9.5 7.9955 9.22344 7.50322 8.73116C7.01094 8.23887 6.73438 7.57119 6.73438 6.875ZM4.10938 14.0199C4.10938 12.0074 5.7418 10.375 7.7543 10.375H10.9645C12.977 10.375 14.6094 12.0074 14.6094 14.0199C14.6094 14.4219 14.284 14.75 13.8793 14.75H4.83945C4.4375 14.75 4.10938 14.4246 4.10938 14.0199Z" fill="#6B7280" />
    </svg>

);

export const IconOpenRate = ({ className, ...rest }: IconProps) => (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" {...rest} className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M7.87529 0.625C5.66592 0.625 3.89678 1.63125 2.60889 2.82891C1.3292 4.01562 0.47334 5.4375 0.0686523 6.41367C-0.021582 6.62969 -0.021582 6.87031 0.0686523 7.08633C0.47334 8.0625 1.3292 9.48438 2.60889 10.6711C3.89678 11.8687 5.66592 12.875 7.87529 12.875C10.0847 12.875 11.8538 11.8687 13.1417 10.6711C14.4214 9.48164 15.2772 8.0625 15.6847 7.08633C15.7749 6.87031 15.7749 6.62969 15.6847 6.41367C15.2772 5.4375 14.4214 4.01562 13.1417 2.82891C11.8538 1.63125 10.0847 0.625 7.87529 0.625ZM3.93779 6.75C3.93779 5.70571 4.35264 4.70419 5.09106 3.96577C5.82948 3.22734 6.831 2.8125 7.87529 2.8125C8.91958 2.8125 9.9211 3.22734 10.6595 3.96577C11.398 4.70419 11.8128 5.70571 11.8128 6.75C11.8128 7.79429 11.398 8.79581 10.6595 9.53423C9.9211 10.2727 8.91958 10.6875 7.87529 10.6875C6.831 10.6875 5.82948 10.2727 5.09106 9.53423C4.35264 8.79581 3.93779 7.79429 3.93779 6.75ZM7.87529 5C7.87529 5.96523 7.09053 6.75 6.12529 6.75C5.93115 6.75 5.74521 6.71719 5.57021 6.65977C5.41982 6.61055 5.24482 6.70352 5.25029 6.86211C5.2585 7.05078 5.28584 7.23945 5.33779 7.42812C5.7124 8.82812 7.15342 9.65938 8.55342 9.28477C9.95342 8.91016 10.7847 7.46914 10.4101 6.06914C10.1065 4.93438 9.10303 4.17148 7.9874 4.125C7.82881 4.11953 7.73584 4.2918 7.78506 4.44492C7.84248 4.61992 7.87529 4.80586 7.87529 5Z" fill="#6B7280" />
    </svg>

);

export const IconClick = ({ className, ...rest }: IconProps) => (
    <svg width="9" height="13" viewBox="0 0 9 13" fill="none" {...rest} className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M0.21875 1.25938V11.3984C0.21875 11.732 0.489453 12 0.820312 12C0.992578 12 1.15937 11.9262 1.27422 11.7949L3.53281 9.21094L5.12148 12.391C5.3375 12.823 5.8625 12.998 6.29453 12.782C6.72656 12.566 6.90156 12.041 6.68555 11.609L5.13516 8.5H8.36445C8.69805 8.5 8.96875 8.2293 8.96875 7.8957C8.96875 7.72344 8.89492 7.55937 8.76641 7.44453L1.27422 0.786328C1.15664 0.682422 1.00898 0.625 0.853125 0.625C0.503125 0.625 0.21875 0.909375 0.21875 1.25938Z" fill="#6B7280" />
    </svg>

);

export const IconConversion = ({ className, ...rest }: IconProps) => (
    <svg
        viewBox="0 0 36 36"
        width="16"
        height="16"
        fill="none"
        {...rest}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m0 30a14 14 0 1 1 14-14 14 14 0 0 1-14 14"
            fill="currentColor"
        />
        <path
            d="M18.29 8.92a7.38 7.38 0 0 0-5.72 2.57 1 1 0 0 0-.32.71.92.92 0 0 0 .95.92 1.08 1.08 0 0 0 .71-.29 5.7 5.7 0 0 1 4.33-2c2.36 0 3.83 1.52 3.83 3.41v.05c0 2.21-1.76 3.44-4.54 3.65a.8.8 0 0 0-.76.92v2.75a1 1 0 0 0 1 .9h.11a1 1 0 0 0 .9-1v-2.06c3-.42 5.43-2 5.43-5.28v-.05c-.03-3-2.37-5.2-5.92-5.2"
            fill="currentColor"
        />
        <circle cx="17.78" cy="26.2" r="1.25" fill="currentColor" />
    </svg>
);


export const IconDrip = ({ className, ...rest }: IconProps) => (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" {...rest} className={className}>
        <path d="M8 1.333 5 5.5C3.833 6.917 3.916 9.083 5 10.5c1 1.333 2.917 2 4.333 1.333 1.917-.916 2.667-3 1.584-4.666L8 1.333Z" fill="currentColor" />
    </svg>
);

export const IconTracking = ({ className, ...rest }: IconProps) => (

    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" {...rest} className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M2 1C2 0.446875 1.55313 0 1 0C0.446875 0 0 0.446875 0 1V11.5C0 12.8813 1.11875 14 2.5 14H15C15.5531 14 16 13.5531 16 13C16 12.4469 15.5531 12 15 12H2.5C2.225 12 2 11.775 2 11.5V1ZM14.7063 3.70625C15.0969 3.31563 15.0969 2.68125 14.7063 2.29063C14.3156 1.9 13.6812 1.9 13.2906 2.29063L10 5.58437L8.20625 3.79063C7.81563 3.4 7.18125 3.4 6.79063 3.79063L3.29063 7.29062C2.9 7.68125 2.9 8.31563 3.29063 8.70625C3.68125 9.09688 4.31563 9.09688 4.70625 8.70625L7.5 5.91563L9.29375 7.70938C9.68437 8.1 10.3188 8.1 10.7094 7.70938L14.7094 3.70937L14.7063 3.70625Z" fill="#0F5A62" />
    </svg>

);
