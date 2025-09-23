import * as React from "react";

type Step = { id: number; label: string };

type Props = {
    steps: Step[];
    current: number; // 1-based index
};

export default function StepProgress({ steps, current }: Props) {
    return (
        <div className="flex items-center gap-3 text-sm">
            {steps.map((s, i) => {
                const idx = i + 1;
                const isDone = idx < current;
                const isCurrent = idx === current;

                return (
                    <React.Fragment key={s.id}>
                        <div className="flex items-center gap-2">
                            <span
                                aria-current={isCurrent ? "step" : undefined}
                                className={[
                                    "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold",
                                    isDone
                                        ? "border-emerald-600 bg-emerald-600 text-white"
                                        : isCurrent
                                            ? "border-emerald-600 text-emerald-700"
                                            : "border-zinc-300 text-zinc-500",
                                ].join(" ")}
                            >
                                {isDone ? (
                                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5868 0.632324C12.9286 0.974121 12.9286 1.5292 12.5868 1.871L5.58682 8.871C5.24502 9.21279 4.68994 9.21279 4.34814 8.871L0.848145 5.371C0.506348 5.0292 0.506348 4.47412 0.848145 4.13232C1.18994 3.79053 1.74502 3.79053 2.08682 4.13232L4.96885 7.01162L11.3509 0.632324C11.6927 0.290527 12.2478 0.290527 12.5896 0.632324H12.5868Z" fill="white" />
                                    </svg>

                                ) : (
                                    idx
                                )}
                            </span>
                            <span
                                className={[
                                    "whitespace-nowrap",
                                    isDone ? "text-emerald-700" : isCurrent ? "text-emerald-700" : "text-zinc-500",
                                    isCurrent ? "font-semibold" : "",
                                ].join(" ")}
                            >
                                {s.label}
                            </span>
                        </div>

                        {i < steps.length - 1 && <span className="text-zinc-400">—</span>}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
