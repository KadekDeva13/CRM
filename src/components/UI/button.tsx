import React from "react";

type Variant = "primary" | "ghost" | "danger" | "secondary" | "slate" | "teal";
type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "pill"; 

type ButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
  className?: string;
  variant?: Variant;
  size?: Size;
  shape?: Shape;            
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<T>;

export default function Button<T extends React.ElementType = "button">({
  as,
  className = "",
  variant = "primary",
  size = "md",
  shape = "rounded",
  isLoading = false,
  children,
  ...props
}: ButtonProps<T>): React.ReactElement {
  const Component = as || "button";

  const base =
    "inline-flex items-center justify-center transition disabled:opacity-60 disabled:cursor-not-allowed";

  const radiusCls = shape === "pill" ? "rounded-[18px]" : "rounded-xl";

  const sizeCls =
    size === "sm"
      ? "px-3 py-2 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-base"
      : "px-4 py-2.5 text-[15px]";

  const variantCls =
    variant === "ghost"
      ? "bg-transparent text-white ring-1 ring-white/15 hover:bg-white/10"
      : variant === "secondary"
      ? "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/20"
      : variant === "danger"
      ? "bg-red-600 text-white ring-1 ring-red-600/20 hover:bg-red-700"
      : variant === "slate"     
      ? "bg-[#7A8C8D] text-white hover:bg-[#6B7C7D]"
      : variant === "teal"      
      ? "bg-[#0AB19B] text-white hover:bg-[#0AB19B]"
      : 
        "bg-[#112D30] text-white ring-1 ring-[#112D30]/20 hover:bg-[#0E2528]";

  return (
    <Component
      className={[base, radiusCls, sizeCls, variantCls, className].join(" ")}
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
