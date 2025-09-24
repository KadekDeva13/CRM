/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import DashboardBreadcrumb from "../components/DashboardBreadcrumb";

type Props = {
  onMenu?: () => void;
  collapsed?: boolean;
  setCollapsed?: (v: boolean) => void;
  leftWidth?: number;
};

export default function AppHeader({
  onMenu,
  collapsed,
  setCollapsed,
  leftWidth = 256,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-16 bg-zinc-300"
      style={{ ["--left" as any]: `${leftWidth}px`, borderBottom: "none", boxShadow: "none" }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 hidden md:block"
        style={{ left: `calc(var(--left) + 16px)` }}
      />

      <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-3 px-3 md:px-4 md:[padding-left:calc(var(--left)+16px)]">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenu}
            className="
              md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md  text-black/80 hover:bg-black/5
            "
            aria-label="Open sidebar"
          >
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
              <path d="M1.5 2h12M1.5 7h12M1.5 12h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setCollapsed?.(!collapsed)}
            className="
              hidden md:inline-flex h-9 w-9 items-center justify-center rounded-md text-black/80 hover:bg-black/5
            "
            aria-pressed={collapsed}
            title="Toggle sidebar"
          >
            <svg className={`transition-transform ${collapsed ? "rotate-180 opacity-70" : "opacity-100"}`} width="14" height="12" viewBox="0 0 14 12" fill="none">
              <path d="M12.5.5h-11a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1Z" stroke="currentColor" />
              <path d="M5 10.5v-9" stroke="currentColor" />
            </svg>
          </button>

          <DashboardBreadcrumb />
        </div>

        {/* Search pindah ke kanan & lebar fixed */}
        <div className="ml-auto hidden md:flex">
          <form className="relative w-[320px]">
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/60">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M13.3501 13.3563C13.2568 13.4483 13.1311 13.4999 13.0001 13.5001C12.8673 13.4995 12.7398 13.4481 12.6438 13.3563L9.94385 10.6501C8.80671 11.6052 7.34474 12.0845 5.86285 11.9879C4.38095 11.8913 2.99355 11.2264 1.99 10.1317C0.986453 9.0371 0.444243 7.59729 0.476455 6.1126C0.508667 4.62791 1.11282 3.21298 2.1629 2.1629C3.21298 1.11282 4.62791 0.508667 6.1126 0.476455C7.59729 0.444243 9.0371 0.986453 10.1317 1.99C11.2264 2.99355 11.8913 4.38095 11.9879 5.86285C12.0845 7.34474 11.6052 8.80671 10.6501 9.94385L13.3501 12.6438C13.4349 12.7458 13.4993 12.9338 13.4993 13.0001C13.4993 13.0664 13.4861 13.132 13.4605 13.1932C13.4349 13.2544 13.3973 13.3098 13.3501 13.3563ZM6.2501 11.0001C7.18956 11.0001 8.10792 10.7215 8.88906 10.1996C9.67019 9.67764 10.279 8.93579 10.6385 8.06784C10.998 7.19989 11.0921 6.24483 10.9088 5.32342C10.7255 4.40201 10.2732 3.55564 9.60885 2.89134C8.94455 2.22704 8.09819 1.77465 7.17678 1.59137C6.25537 1.40809 5.3003 1.50215 4.43235 1.86167C3.5644 2.22119 2.82255 2.83001 2.30062 3.61114C1.77868 4.39227 1.5001 5.31064 1.5001 6.2501C1.50175 7.50937 2.00273 8.71659 2.89317 9.60703C3.78361 10.4975 4.99083 10.9984 6.2501 11.0001Z"
                  fill="black"
                  fillOpacity="0.6"
                />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              className="
                w-full rounded-full pl-9 pr-14 py-2 text-sm outline-none
                bg-black/10 text-black placeholder-black/60
                border border-black/10 focus:border-black/20 focus:ring-0
              "
            />
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
              <div
                className="
                  flex items-center rounded-md border px-2 py-0.5 text-[10px]
                  bg-black/10 text-black/70 border-black/20
                "
              >
                /
              </div>
            </div>
          </form>
        </div>

        <div className="ml-auto flex items-center gap-2 text-black/80">
        </div>
      </div>
    </header>
  );
}
