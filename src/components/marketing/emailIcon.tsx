import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

export const IconDuplicate = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className={p.className}>
    <path d="M8 8h9a2 2 0 0 1 2 2v9H8a2 2 0 0 1-2-2V8Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const IconEdit = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className={p.className}>
    <path d="M4 20h4l10.5-10.5a1.5 1.5 0 0 0-2.121-2.121L5.879 17.879 4 20Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const IconClock = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className={p.className}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const IconMore = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className={p.className}>
    <circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);
