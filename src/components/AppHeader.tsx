import React from "react";
import DropdownProfile from "./DropDown/dropDownProfile";

type AppHeaderProps = {
  onMenu: () => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AppHeader({
  onMenu,
  collapsed,
  setCollapsed,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-black/40 backdrop-blur ring-1 ring-white/10">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10 lg:hidden"
            aria-label="Open sidebar"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600">C</div>
            <span className="text-sm font-semibold tracking-wide">CRM Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:inline-flex h-9 items-center gap-2 rounded-lg bg-white/10 px-3 text-sm ring-1 ring-white/10"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            type="button"
          >
            {collapsed ? "»" : "«"} Menu
          </button>

          <DropdownProfile
            onLogout={async () => {
              await new Promise((res) => setTimeout(res, 1000));
              localStorage.removeItem("token");
            }}
          />
        </div>
      </div>
    </header>
  );
}
