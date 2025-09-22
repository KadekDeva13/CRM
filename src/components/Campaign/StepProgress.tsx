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
                className={[
                  "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold",
                  isDone
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : isCurrent
                    ? "border-emerald-600 text-emerald-700"
                    : "border-zinc-300 text-zinc-500",
                ].join(" ")}
              >
                {idx}
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
