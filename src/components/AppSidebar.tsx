import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

type NavItem = {
  to: string;
  label: string;
  icon: string;
};

type ItemProps = NavItem & {
  collapsed: boolean;
  onClick?: () => void;
};

type AppSidebarProps = {
  collapsed: boolean;
  openMobile: boolean;
  onCloseMobile?: () => void;
};

type SidebarContentProps = {
  collapsed: boolean;
  loggingOut: boolean;
  openSettings: boolean;
  setOpenSettings?: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  onItemClick?: () => void;
  isDesktop: boolean;
};

const navItems: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: "M4 6h16M4 12h10M4 18h7" },
  { to: "/contacts",  label: "Contacts",  icon: "M5 7a7 7 0 1114 0v10H5V7z" },
  { to: "/contracts", label: "Contracts", icon: "M6 4h9l5 5v11H6V4z" },
  { to: "/reports",   label: "Reports",   icon: "M4 19V5h6v14M14 19V9h6v10" },
] as const;

function SpinnerSm(): React.ReactElement {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-30" />
      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

function Item({ to, label, icon, collapsed, onClick }: ItemProps): React.ReactElement  {
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
  "w-full rounded-lg bg-white/10 px-3 py-2 text-left text-sm ring-1 ring-white/10 md:hover:bg-white/20 transition disabled:opacity-60 disabled:cursor-not-allowed";
const iconBtn =
  "mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10 md:hover:bg-white/20 transition disabled:opacity-60 disabled:cursor-not-allowed";

export default function AppSidebar({
  collapsed,
  openMobile,
  onCloseMobile,
}: AppSidebarProps): React.ReactElement  {
  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", openMobile);
    return () => document.body.classList.remove("overflow-hidden");
  }, [openMobile]);

  // Pakai hook logout (konsisten dengan Dropdown)
  const { loggingOut, logout } = useLogout();

  const handleLogout = async () => {
    setOpenSettings(false);
    onCloseMobile?.(); // tutup drawer mobile bila terbuka
    await logout();    // akan hapus token, tampilkan toast, lalu navigate("/login")
  };

  const widthDesktop = collapsed ? "lg:w-[72px]" : "lg:w-64";

  return (
    <>
      {/* Overlay untuk mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity ${
          openMobile ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setOpenSettings(false);
          onCloseMobile?.();
        }}
        aria-hidden={!openMobile}
      />

      {/* Sidebar Mobile */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 bg-black/50 backdrop-blur ring-1 ring-white/10",
          "transform transition-transform lg:hidden",
          openMobile ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar Navigation"
      >
        <SidebarContent
          collapsed={false}
          loggingOut={loggingOut}
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
          handleLogout={handleLogout}
          onItemClick={() => {
            setOpenSettings(false);
            onCloseMobile?.();
          }}
          isDesktop={false}
        />
      </aside>

      {/* Sidebar Desktop */}
      <aside
        className={[
          "hidden lg:flex lg:flex-col",
          "fixed top-16 left-0 z-30 h-[calc(100svh-64px)]",
          "bg-black/50 backdrop-blur ring-1 ring-white/10 border-r border-white/10",
          widthDesktop,
        ].join(" ")}
        aria-label="Sidebar Navigation"
      >
        <SidebarContent
          collapsed={collapsed}
          loggingOut={loggingOut}
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
          handleLogout={handleLogout}
          onItemClick={() => setOpenSettings(false)}
          isDesktop
        />
      </aside>
    </>
  );
}

function SidebarContent({
  collapsed,
  loggingOut,
  openSettings,
  setOpenSettings,
  handleLogout,
  onItemClick,
  isDesktop,
}: SidebarContentProps): React.ReactElement  {
  return (
    <div className="flex h-full flex-col p-3">
      <nav className="space-y-1">
        {navItems.map((it) => (
          <Item
            key={it.to}
            {...it}
            collapsed={collapsed}
            onClick={onItemClick}
          />
        ))}
      </nav>

      <div className="mt-auto">
        {isDesktop ? (
          <div className="hidden lg:block space-y-2">
            <button
              type="button"
              onClick={() => setOpenSettings?.((v) => !v)}
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
                  <SpinnerSm />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 12H3m6-6L3 12l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 4v16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )
              ) : (
                <span className="inline-flex items-center gap-2">
                  {loggingOut && <SpinnerSm />}
                  {loggingOut ? "Logging out…" : "Logout"}
                </span>
              )}
            </button>
          </div>
        ) : (
          <div className="lg:hidden space-y-2">
            <button
              type="button"
              className={fullBtn}
              onClick={() => setOpenSettings?.((v) => !v)}
              disabled={loggingOut}
            >
              Settings
            </button>

            {openSettings && (
              <div className="rounded-lg bg-white/10 ring-1 ring-white/10 px-3 py-2">
                <div className="flex items-center justify-between" />
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
                {loggingOut && <SpinnerSm />}
                {loggingOut ? "Logging out…" : "Logout"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
