import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "M4 6h16M4 12h10M4 18h7" },
  { to: "/contacts",  label: "Contacts",  icon: "M5 7a7 7 0 1114 0v10H5V7z" },
  { to: "/contracts", label: "Contracts", icon: "M6 4h9l5 5v11H6V4z" },
  { to: "/reports",   label: "Reports",   icon: "M4 19V5h6v14M14 19V9h6v10" },
];

function Item({ to, label, icon, collapsed, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition",
          isActive
            ? "bg-blue-600/20 text-white ring-1 ring-blue-500/40"
            : "text-white/80 hover:bg-white/10",
        ].join(" ")
      }
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d={icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      {!collapsed && <span className="text-sm">{label}</span>}
    </NavLink>
  );
}

const fullBtn =
  "w-full rounded-lg bg-white/10 px-3 py-2 text-left text-sm ring-1 ring-white/10 " +
  "md:hover:bg-white/20 transition disabled:opacity-60 disabled:cursor-not-allowed";
const iconBtn =
  "mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10 " +
  "md:hover:bg-white/20 transition disabled:opacity-60 disabled:cursor-not-allowed";

export default function AppSidebar({ collapsed, openMobile, onCloseMobile }) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

const handleLogout = () => {
  if (loggingOut) return;

  setOpenSettings(false);
  setLoggingOut(true);

  const t = toast.loading("Signing you out…");

  setTimeout(() => {
    localStorage.removeItem("token");

    toast.dismiss(t);               
    toast.success("Logout berhasil 👋");

    setLoggingOut(false);
    onCloseMobile?.(); 
    navigate("/login", { replace: true });
  }, 700);
};


  const widthCls = collapsed ? "lg:w-[72px]" : "lg:w-64";

  return (
    <>
      {openMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => { setOpenSettings(false); onCloseMobile?.(); }}
        />
      )}

      <aside
        className={[
          "z-50 top-16 left-0 h-[calc(100svh-64px)] relative",
          "w-72 bg-black/50 backdrop-blur ring-1 ring-white/10",
          "transition-transform",
          widthCls,
          openMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
        aria-label="Sidebar Navigation"
      >
        <div className="flex h-full flex-col gap-4 p-3">
          <nav className="space-y-1">
            {navItems.map((it) => (
              <Item
                key={it.to}
                {...it}
                collapsed={collapsed}
                onClick={() => { setOpenSettings(false); onCloseMobile?.(); }}
              />
            ))}
          </nav>

          <div className="mt-auto">
            <div className="hidden lg:block space-y-2">
              <button
                type="button"
                onClick={() => setOpenSettings((v) => !v)}
                className={collapsed ? iconBtn : fullBtn}
                title={collapsed ? "Settings" : undefined}
                aria-label="Settings"
                disabled={loggingOut}
              >
                {collapsed ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M4 12h2m12 0h2M12 4v2m0 12v2M6.2 6.2l1.4 1.4m8.8 8.8l1.4 1.4M6.2 17.8l1.4-1.4m8.8-8.8l1.4-1.4" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                ) : (
                  "Settings"
                )}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className={collapsed ? iconBtn : fullBtn + " md:hover:bg-red-600/50"}
                title={collapsed ? "Logout" : undefined}
                aria-label="Logout"
                aria-busy={loggingOut}
                disabled={loggingOut}
              >
                {collapsed ? (
                  loggingOut ? (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M15 12H3m6-6L3 12l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M21 4v16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  )
                ) : (
                  <span className="inline-flex items-center gap-2">
                    {loggingOut && (
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
                      </svg>
                    )}
                    {loggingOut ? "Logging out…" : "Logout"}
                  </span>
                )}
              </button>
            </div>

            <div className="lg:hidden space-y-2">
              <button
                type="button"
                className={fullBtn}
                onClick={() => setOpenSettings((v) => !v)}
                disabled={loggingOut}
              >
                Settings
              </button>

              {openSettings && (
                <div className="rounded-lg bg-white/10 ring-1 ring-white/10 px-3 py-2">
                  <div className="flex items-center justify-between">
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className={fullBtn + " md:hover:bg-red-600/50"}
                aria-busy={loggingOut}
                disabled={loggingOut}
              >
                <span className="inline-flex items-center gap-2">
                  {loggingOut && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  )}
                  {loggingOut ? "Logging out…" : "Logout"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {openSettings && (
          <div className="hidden lg:block absolute left-3 right-3 bottom-24 z-50">
            <div className="rounded-xl bg-[color:var(--bg,#0b1220)]/95 ring-1 ring-white/10 px-4 py-3 shadow-2xl">
              <div className="flex items-center justify-between">
              </div>
            </div>
          </div>
        )}
      </aside>

      {loggingOut && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-xl bg-neutral-900/85 text-white px-5 py-3 ring-1 ring-white/10">
            <div className="flex items-center gap-3 text-sm">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
              </svg>
              Signing you out…
            </div>
          </div>
        </div>
      )}
    </>
  );
}
