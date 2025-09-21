/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
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
  const { toggle, resolved } = useTheme();

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
  className="fixed inset-x-0 top-0 z-50 h-16 bg-zinc-300 backdrop-blur-md border-0 shadow-none ring-0  "
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
        <div className="mx-auto hidden w-full justify-center md:flex">
          <form className="relative w-full max-w-[320px]">
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
                w-full rounded-full border pl-9 pr-14 py-2 text-sm outline-none
                bg-black/5 text-black placeholder-black/60
                border-black/20 focus:ring-1 focus:ring-black/20
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
          <button
            type="button"
            onClick={toggle}
            className="
              inline-flex h-9 w-9 items-center justify-center rounded-md
              border border-black/10 hover:bg-black/5 text-black
            "
            aria-label="Theme"
            title="Theme"
          >
            {resolved === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v-1M8 15v-1M3.5 3.5l-.7-.7M13.2 13.2l-.7-.7M2 8H1M15 8h-1M3.5 12.5l-.7.7M13.2 2.8l-.7.7" stroke="currentColor" strokeLinecap="round" />
                <circle cx="8" cy="8" r="3" fill="currentColor" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 10.5A6.5 6.5 0 0 1 5.5 2a6 6 0 1 0 8.5 8.5Z" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            )}
          </button>

          {/* history */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:bg-black/5 text-black"
            aria-label="History"
            title="History"
          >
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
              <path d="M7.5 3.00002V5.71689L9.7575 7.07127C9.87121 7.13956 9.95314 7.25023 9.98525 7.37893C10.0174 7.50762 9.99704 7.64381 9.92875 7.75752C9.86046 7.87123 9.74979 7.95316 9.62109 7.98527C9.4924 8.01739 9.35621 7.99706 9.2425 7.92877L6.7425 6.42877C6.66851 6.38431 6.60729 6.32146 6.56479 6.24633C6.52229 6.17119 6.49997 6.08634 6.5 6.00002V3.00002C6.5 2.86741 6.55268 2.74023 6.64645 2.64647C6.74021 2.5527 6.86739 2.50002 7 2.50002C7.13261 2.50002 7.25979 2.5527 7.35355 2.64647C7.44732 2.74023 7.5 2.86741 7.5 3.00002ZM7 1.8507e-05C6.21125 -0.00194621 5.42994 0.15254 4.70128 0.454535C3.97263 0.756531 3.31111 1.20004 2.755 1.75939C2.30063 2.21939 1.89688 2.66189 1.5 3.12502V2.00002C1.5 1.86741 1.44732 1.74023 1.35355 1.64647C1.25979 1.5527 1.13261 1.50002 1 1.50002C0.867392 1.50002 0.740215 1.5527 0.646447 1.64647C0.552678 1.74023 0.5 1.86741 0.5 2.00002V4.50002C0.5 4.63263 0.552678 4.7598 0.646447 4.85357C0.740215 4.94734 0.867392 5.00002 1 5.00002H3.5C3.63261 5.00002 3.75979 4.94734 3.85355 4.85357C3.94732 4.7598 4 4.63263 4 4.50002C4 4.36741 3.94732 4.24023 3.85355 4.14647C3.75979 4.0527 3.63261 4.00002 3.5 4.00002H2.0625C2.50938 3.47377 2.95438 2.97814 3.46187 2.46439C4.15678 1.76949 5.04107 1.29477 6.00423 1.09957C6.96739 0.90436 7.96673 0.997317 8.87736 1.36682C9.788 1.73633 10.5696 2.366 11.1244 3.17715C11.6792 3.9883 11.9827 4.94497 11.9969 5.92761C12.0111 6.91026 11.7354 7.8753 11.2043 8.70216C10.6732 9.52903 9.91016 10.181 9.0106 10.5767C8.11103 10.9724 7.1148 11.0942 6.1464 10.927C5.17799 10.7597 4.28034 10.3108 3.56563 9.63627C3.51786 9.59113 3.46166 9.55583 3.40026 9.53241C3.33885 9.50898 3.27343 9.49788 3.20773 9.49974C3.14204 9.5016 3.07735 9.51638 3.01736 9.54323C2.95738 9.57009 2.90327 9.6085 2.85812 9.65627C2.81298 9.70404 2.77769 9.76023 2.75427 9.82164C2.73084 9.88304 2.71974 9.94846 2.7216 10.0142C2.72345 10.0799 2.73823 10.1445 2.76509 10.2045C2.79195 10.2645 2.83036 10.3186 2.87812 10.3638C3.59028 11.0358 4.45609 11.5234 5.4 11.7838C6.34391 12.0443 7.33722 12.0698 8.29326 11.8581C9.24929 11.6464 10.139 11.204 10.8847 10.5694C11.6304 9.93474 12.2095 9.12727 12.5713 8.2174C12.9332 7.30753 13.0669 6.32293 12.9607 5.34951C12.8546 4.37609 12.5118 3.44345 11.9623 2.63298C11.4128 1.8225 10.6733 1.15883 9.80831 0.699883C8.94334 0.240934 7.97919 0.000655837 7 1.8507e-05Z"
                fill="black"
              />
            </svg>
          </button>

          {/* notifications */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:bg-black/5 text-black"
            aria-label="Notifications"
            title="Notifications"
          >
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M11 10.5H1c.48-.828 1-2.745 1-5a4 4 0 1 1 8 0c0 2.208.516 3.898.863 4.496.17.285.17.648-.001.933a1 1 0 0 1-.862.571Z" stroke="black" />
              <path d="M4.586 11.5a2 2 0 0 0 3.828 0H4.586Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
