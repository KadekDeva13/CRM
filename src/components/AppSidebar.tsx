import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  collapsed?: boolean;
  openMobile?: boolean;           
  onCloseMobile?: () => void;  
};

export default function AppSidebar({
  collapsed = false,
  openMobile = false,
  onCloseMobile,
}: SidebarProps) {
  const [openDash, setOpenDash] = useState(true);
  const [openPages, setOpenPages] = useState(true);

  return (
    <>
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden",
          openMobile ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={onCloseMobile}
      />

      <aside
        className={[
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] border-r border-white/5 bg-[#1a1a1a] transition-[transform,width]",
          openMobile ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          collapsed ? "w-[76px]" : "w-64",
        ].join(" ")}
        role="complementary"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto px-3 py-4 text-sm text-white/70">
          <div className="mb-5 flex items-center gap-2 px-1">
            <img
              src="https://i.pravatar.cc/32"
              alt="logo"
              className="h-7 w-7 rounded-full border border-white/10"
            />
            {!collapsed && (
              <span className="truncate text-[13px] font-semibold text-white">
                MindiMedia
              </span>
            )}
          </div>

          {!collapsed && (
            <div className="mb-4 grid grid-cols-2 px-1 text-[12px] text-white/30">
              <div>Favorites</div>
              <div className="text-right">Recently</div>
            </div>
          )}

          <div className="mb-5 space-y-1">
            <NavItem to="/fav-overview" collapsed={collapsed} onClick={onCloseMobile}>
              <span className="mr-2 inline-flex">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z" fill="white" fillOpacity="0.2" />
                </svg>
              </span>
              {!collapsed && <span>Overview</span>}
            </NavItem>

            <NavItem to="/fav-projects" collapsed={collapsed} onClick={onCloseMobile}>
              <span className="mr-2 inline-flex">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z" fill="white" fillOpacity="0.2" />
                </svg>
              </span>
              {!collapsed && <span>Projects</span>}
            </NavItem>
          </div>

          <SectionHeader hidden={collapsed}>Dashboards</SectionHeader>

          <button
            type="button"
            onClick={() => setOpenDash(v => !v)}
            className={[
              "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-white/5",
              collapsed && "justify-center",
            ].join(" ")}
          >
            {!collapsed && (
              <span className={["inline-flex transition-transform", openDash ? "rotate-90" : ""].join(" ")}>
                <Caret />
              </span>
            )}
            {!collapsed && <span className="text-[12px] text-white/50">Expand</span>}
          </button>

          {openDash && (
            <div className="mb-5 space-y-1">
              <NavItem to="/overview" collapsed={collapsed} onClick={onCloseMobile}>
                <span className="mr-3 inline-flex">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.81261 8.09609C6.90765 8.04123 6.98656 7.96231 7.04142 7.86727C7.09627 7.77223 7.12514 7.66442 7.12511 7.55469V1.92969C7.12456 1.83004 7.10018 1.73198 7.05402 1.64367C7.00786 1.55536 6.94126 1.47936 6.85976 1.42202C6.77826 1.36469 6.68424 1.32766 6.58553 1.31405C6.48681 1.30043 6.38628 1.31062 6.2923 1.34375C4.46807 1.98939 2.93396 3.26457 1.96575 4.94005C0.997549 6.61554 0.658754 8.58145 1.01027 10.4844C1.02849 10.5828 1.07008 10.6754 1.13153 10.7544C1.19298 10.8333 1.27249 10.8964 1.3634 10.9383C1.44531 10.9766 1.53468 10.9963 1.62511 10.9961C1.73481 10.9961 1.84259 10.9673 1.93761 10.9125L6.81261 8.09609ZM5.87511 2.87656V7.19375L2.13449 9.35234C2.12511 9.23438 2.12511 9.11563 2.12511 9C2.12622 7.73309 2.4769 6.49106 3.13855 5.41066C3.80019 4.33025 4.74713 3.45337 5.87511 2.87656ZM17.1251 9C17.1257 10.7837 16.5394 12.518 15.4565 13.9354C14.3737 15.3528 12.8545 16.3745 11.1334 16.8428C9.41224 17.3111 7.58484 17.2 5.9331 16.5267C4.28137 15.8534 2.8971 14.6553 1.99386 13.1172C1.95176 13.0461 1.92415 12.9675 1.91263 12.8857C1.90112 12.8039 1.90592 12.7207 1.92677 12.6407C1.94762 12.5608 1.9841 12.4859 2.0341 12.4201C2.0841 12.3544 2.14664 12.2992 2.21808 12.2578L8.37511 8.67422V1.5C8.37511 1.33424 8.44096 1.17527 8.55817 1.05806C8.67538 0.940848 8.83435 0.875 9.00011 0.875C10.418 0.875723 11.811 1.24729 13.0409 1.95282C14.2707 2.65834 15.2947 3.67328 16.0111 4.89688C16.759 6.20247 17.1269 7.58916 17.1251 9Z" fill="white"/>
                  </svg>
                </span>
                {!collapsed && <span>Overview</span>}
              </NavItem>

              <NavItem to="/ecommerce" collapsed={collapsed} onClick={onCloseMobile}>
                <span className="mr-3 inline-flex">
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.875 0.125H2.125C1.79348 0.125 1.47554 0.256696 1.24112 0.491116C1.0067 0.725537 0.875 1.04348 0.875 1.375V12.625C0.875 12.9565 1.0067 13.2745 1.24112 13.5089C1.47554 13.7433 1.79348 13.875 2.125 13.875H15.875C16.2065 13.875 16.5245 13.7433 16.7589 13.5089C16.9933 13.2745 17.125 12.9565 17.125 12.625V1.375C17.125 1.04348 16.9933 0.725537 16.7589 0.491116C16.5245 0.256696 16.2065 0.125 15.875 0.125ZM15.875 1.375V2.625H2.125V1.375H15.875ZM15.875 12.625H2.125V3.875H15.875V12.625ZM12.75 5.75C12.75 6.74456 12.3549 7.69839 11.6517 8.40165C10.9484 9.10491 9.99456 9.5 9 9.5C8.00544 9.5 7.05161 9.10491 6.34835 8.40165C5.64509 7.69839 5.25 6.74456 5.25 5.75C5.25 5.58424 5.31585 5.42527 5.43306 5.30806C5.55027 5.19085 5.70924 5.125 5.875 5.125C6.04076 5.125 6.19973 5.19085 6.31694 5.30806C6.43415 5.42527 6.5 5.58424 6.5 5.75C6.5 6.41304 6.76339 7.04893 7.23223 7.51777C7.70107 7.98661 8.33696 8.25 9 8.25C9.66304 8.25 10.2989 7.98661 10.7678 7.51777C11.2366 7.04893 11.5 6.41304 11.5 5.75C11.5 5.58424 11.5658 5.42527 11.6831 5.30806C11.8003 5.19085 11.9592 5.125 12.125 5.125C12.2908 5.125 12.4497 5.19085 12.5669 5.30806C12.6842 5.42527 12.75 5.58424 12.75 5.75Z" fill="white"/>
                  </svg>
                </span>
                {!collapsed && <span>eCommerce</span>}
              </NavItem>

              <NavItem to="/projects" collapsed={collapsed} onClick={onCloseMobile}>
                <span className="mr-3 inline-flex">
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.875 2.625H9.20859L7.04141 1C6.82472 0.838324 6.56176 0.750671 6.29141 0.75H2.125C1.79348 0.75 1.47554 0.881696 1.24112 1.11612C1.0067 1.35054 0.875 1.66848 0.875 2V12.625C0.875 12.9565 1.0067 13.2745 1.24112 13.5089C1.47554 13.7433 1.79348 13.875 2.125 13.875H15.875C16.2065 13.875 16.5245 13.7433 16.7589 13.5089C16.9933 13.2745 17.125 12.9565 17.125 12.625V3.875C17.125 3.54348 16.9933 3.22554 16.7589 2.99112C16.5245 2.7567 16.2065 2.625 15.875 2.625ZM2.125 2H6.29141L7.95859 3.25L6.29141 4.5H2.125V2ZM15.875 12.625H2.125V5.75H6.29141C6.56176 5.74933 6.82472 5.66168 7.04141 5.5L9.20859 3.875H15.875V12.625Z" fill="white"/>
                  </svg>
                </span>
                {!collapsed && <span>Projects</span>}
              </NavItem>
            </div>
          )}

          <SectionHeader hidden={collapsed}>Pages</SectionHeader>

          <div className="mb-2">
            <button
              onClick={() => setOpenPages(v => !v)}
              className={[
                "flex w-full items-center gap-3 rounded-md px-2 py-2 hover:bg-white/5",
                collapsed && "justify-center",
              ].join(" ")}
            >
              {!collapsed && (
                <span className={["inline-flex transition-transform", openPages ? "rotate-90" : ""].join(" ")}>
                  <Caret />
                </span>
              )}

              <span className="inline-flex">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.87422 14.5C2.9399 14.5494 3.01468 14.5853 3.09426 14.6057C3.17385 14.6262 3.25669 14.6307 3.33803 14.6191C3.41937 14.6075 3.49763 14.58 3.56832 14.5381C3.63901 14.4962 3.70075 14.4408 3.75 14.375C4.12841 13.8705 4.61909 13.4609 5.1832 13.1789C5.7473 12.8968 6.36932 12.75 7 12.75C7.63068 12.75 8.25271 12.8968 8.81681 13.1789C9.38091 13.4609 9.87159 13.8705 10.25 14.375..." fill="white"/>
                </svg>
              </span>
              {!collapsed && <span>User Profile</span>}
            </button>

            {openPages && (
              <div className={["ml-9", collapsed && "hidden"].join(" ")}>
                <SubLink to="/pages/overview"    onClick={onCloseMobile}>Overview</SubLink>
                <SubLink to="/pages/projects"    onClick={onCloseMobile}>Projects</SubLink>
                <SubLink to="/pages/campaigns"   onClick={onCloseMobile}>Campaigns</SubLink>
                <SubLink to="/pages/documents"   onClick={onCloseMobile}>Documents</SubLink>
                <SubLink to="/pages/followers"   onClick={onCloseMobile}>Followers</SubLink>
              </div>
            )}
          </div>

          <NavItem to="/account"   collapsed={collapsed} onClick={onCloseMobile}>
            <span className="mr-3 inline-flex">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.625 5.75C14.625 5.91576 14.5592 6.07473 14.4419 6.19194C14.3247 6.30915 14.1658 6.375 14 6.375H10.875..." fill="white"/>
              </svg>
            </span>
            {!collapsed && <span>Account</span>}
          </NavItem>

          <NavItem to="/corporate" collapsed={collapsed} onClick={onCloseMobile}>
            <span className="mr-3 inline-flex">
              <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.125 8.7503..." fill="white"/>
              </svg>
            </span>
            {!collapsed && <span>Corporate</span>}
          </NavItem>

          <NavItem to="/blog" collapsed={collapsed} onClick={onCloseMobile}>
            <span className="mr-3 inline-flex">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.375 6.75..." fill="white"/>
              </svg>
            </span>
            {!collapsed && <span>Blog</span>}
          </NavItem>

          <NavItem to="/social" collapsed={collapsed} onClick={onCloseMobile}>
            <span className="mr-3 inline-flex">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2477 4.671..." fill="white"/>
              </svg>
            </span>
            {!collapsed && <span>Social</span>}
          </NavItem>
        </div>
      </aside>
    </>
  );
}

function SectionHeader({
  hidden,
  children,
}: {
  hidden?: boolean;
  children: ReactNode;
}) {
  if (hidden) return null;
  return (
    <div className="mb-1 px-2 text-[11px] font-medium uppercase tracking-wide text-white/30">
      {children}
    </div>
  );
}

type NavItemProps = {
  to: string;
  children: ReactNode;
  collapsed?: boolean;
  onClick?: () => void; 
};

function NavItem({ to, children, collapsed, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }: { isActive: boolean }) =>
        [
          "flex items-center rounded-md px-2 py-2",
          collapsed ? "justify-center" : "gap-2",
          isActive
            ? "bg-white/10 text-white"
            : "text-white/70 hover:bg-white/5 hover:text-white",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

function SubLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }: { isActive: boolean }) =>
        [
          "block rounded-md px-2 py-1.5",
          isActive
            ? "text-white bg-white/10"
            : "text-white/60 hover:text-white hover:bg-white/5",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

function Caret() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.5 3.5L11 8L5.5 12.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
