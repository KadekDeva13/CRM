import React from "react";

type Variant = "primary" | "ghost" | "danger" | "secondary";
type Size = "sm" | "md" | "lg";

type ButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
  className?: string;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<T>;

export default function Button<T extends React.ElementType = "button">({
  as,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  ...props
}: ButtonProps<T>): React.ReactElement {
  const Component = as || "button";

  const base =
    "inline-flex items-center justify-center rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed";

  const sizeCls =
    size === "sm"
      ? "px-3 py-2 text-sm"
      : size === "lg"
      ? "px-5 py-3 text-base"
      : "px-4 py-2.5 text-[15px]";

  const variantCls =
    variant === "ghost"
      ? "bg-transparent text-white ring-1 ring-white/15 hover:bg-white/10"
      : variant === "secondary"
      ? "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/20"
      : variant === "danger"
      ? "bg-red-600 text-white ring-1 ring-red-600/20 hover:bg-red-700"
      : // primary (default)
        "bg-blue-600 text-white ring-1 ring-blue-600/20 hover:bg-blue-700";

  return (
    <Component
      className={[base, sizeCls, variantCls, className].join(" ")}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" className="opacity-25" stroke="currentColor" strokeWidth="4" />
            <path d="M4 12a8 8 0 018-8" className="opacity-75" stroke="currentColor" strokeWidth="4" />
          </svg>
          Loading…
        </span>
      ) : (
        children
      )}
    </Component>
  );
}
