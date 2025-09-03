import React from "react";

export type FieldProps = {
  label?: React.ReactNode;
  htmlFor?: string;
  children: React.ReactNode;
  hint?: React.ReactNode;
};

export function Field({ label, htmlFor, children, hint }: FieldProps): React.ReactElement {
  return (
    <div>
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          {label}
        </label>
      )}
      {children}
      {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-neutral-300/80 bg-white px-4 py-2.5 text-[15px] text-neutral-900 outline-none " +
  "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 " +
  "dark:border-neutral-700 dark:bg-neutral-900 dark:text-white";
