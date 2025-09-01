export default function AppHeader({ onMenu, collapsed, setCollapsed }) {
  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-black/40 backdrop-blur ring-1 ring-white/10">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10 lg:hidden"
            aria-label="Open sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
          >
            {collapsed ? "»" : "«"} Menu
          </button>

          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-white/10 px-3 text-sm ring-1 ring-white/10">
            <span className="inline-block h-6 w-6 rounded-full bg-white/20" />
            <span className="hidden sm:inline">Account</span>
          </button>
        </div>
      </div>
    </header>
  );
}
