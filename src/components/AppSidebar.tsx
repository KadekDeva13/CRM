/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { type ReactNode, useMemo, useState, useEffect, Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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
  const location = useLocation();

  type Child = { label: string; to: string };
  type MenuGroup = {
    key: string;
    label: string;
    icon: ReactNode;
    to?: string;
    children?: Child[];
  };

  const GROUPS: MenuGroup[] = [
    { key: "overview", label: "Overview", icon: <IconOverview />, to: "/overview" },

    {
      key: "property",
      label: "Property",
      icon: <IconProperty />,
      to: "/properties",
      children: [
        { label: "Hotel", to: "/properties/hotel" },
        { label: "Facilities", to: "/properties/facilities" },
        { label: "Places", to: "/properties/places" },
      ],
    },
    {
      key: "reservations",
      label: "Reservations",
      icon: <IconReservation />,
      to: "/reservations",
      children: [
        { label: "List", to: "/reservations/list" },
        { label: "Room Mapping", to: "/reservations/room-mapping" },
      ],
    },
    {
      key: "guest",
      label: "Guest",
      icon: <IconGuest />,
      to: "/guests",
      children: [
        { label: "Analytics", to: "/guests/analytics" },
        { label: "Search", to: "/guests/search" },
        { label: "Segments", to: "/guests/guest-insights" },
      ],
    },
    {
      key: "engagement",
      label: "Engagement",
      icon: <IconEngagement />,
      to: "/engagements",
      children: [
        { label: "Guest Journey", to: "/engagements/journey" },
        { label: "Analytics", to: "/engagements/analytics" },
      ],
    },
    {
      key: "marketing",
      label: "Marketing",
      icon: <IconMarketing />,
      to: "/marketing",
      children: [
        { label: "Email", to: "/marketing/email" },
        { label: "Campaigns", to: "/marketing/campaigns" },
      ],
    },

    {
      key: "upsell",
      label: "Upsell",
      icon: <IconUpsell />,
      to: "/upsells",
      children: [
        { label: "Product Catalog", to: "/upsells/product-catalog" },
        { label: "Featured Product", to: "/upsells/featured-product" },
        { label: "Sales", to: "/upsells/sales" },
      ]
    }
  ];

  const defaultOpen = useMemo(() => {
    const fromPath = location.pathname;
    const found = GROUPS.find(
      (g) => g.to === fromPath || g.children?.some((c) => fromPath.startsWith(c.to)),
    );
    return found?.key ? new Set<string>([found.key]) : new Set<string>();
  }, [location.pathname]);

  const [openKeys, setOpenKeys] = useState<Set<string>>(defaultOpen);
  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  // === AUTO-OPEN GROUP YANG AKTIF (dan tutup yang lain) ===
  const { pathname } = useLocation();
  const isGroupActive = (g: { to?: string; children?: { to: string }[] }) => {
    const bySelf = g.to && (pathname === g.to || pathname.startsWith(g.to + "/"));
    const byChild = g.children?.some(c => pathname === c.to || pathname.startsWith(c.to + "/"));
    return Boolean(bySelf || byChild);
  };
  useEffect(() => {
    const found = GROUPS.find((g) => isGroupActive(g));
    setOpenKeys(found ? new Set([found.key]) : new Set()); // buka hanya group aktif
  }, [pathname]);

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
          "fixed left-0 top-0 z-50 h-svh",
          "bg-[#1a1a1a] border-r border-white/5",
          "transition-[transform,width]",
          openMobile ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          collapsed ? "w-[76px]" : "w-64",
        ].join(" ")}
        role="complementary"
        aria-label="Sidebar"
      >
        <div className="pt-16 h-full flex flex-col">
          <div className="flex items-center gap-3 font-helectiva mb-5 px-3">
            <img
              src="/image/Guirez.png"
              alt="guirez"
              className={collapsed ? "h-6 w-auto" : "h-7 w-auto"}
              draggable={false}
            />
            {!collapsed && (
              <Fragment>
                <span className="text-white/50 text-lg leading-none">|</span>
                <span className="tracking-[0.18em] text-sm">CRM</span>
              </Fragment>
            )}
          </div>

          <div className="px-3 py-2 text-sm text-white/70">
            {!collapsed && (
              <div className="mb-3 grid grid-cols-2 px-1 text-[12px] text-white/30">
                <div>Favorites</div>
                <div className="text-right">Recently</div>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-3 text-sm text-white/70">
            <div className="mb-5 space-y-1">
              <SimpleNav to="/overview" collapsed={collapsed} onClick={onCloseMobile}>
                {!collapsed && <span className="inline-flex w-3 shrink-0 text-white/40"></span>}
                <span className={collapsed ? "inline-flex" : "mr-2 inline-flex"}>
                  <Dot6 />
                </span>
                {!collapsed && <span>Overview</span>}
              </SimpleNav>

              <SimpleNav to="/leads" collapsed={collapsed} onClick={onCloseMobile}>
                {!collapsed && <span className="inline-flex w-3 shrink-0 text-white/40"></span>}
                <span className={collapsed ? "inline-flex" : "mr-2 inline-flex"}>
                  <Dot6 />
                </span>
                {!collapsed && <span>Leads</span>}
              </SimpleNav>
            </div>

            <SectionHeader hidden={collapsed}>Dashboards</SectionHeader>

            <div className="mb-5 space-y-1">
              {GROUPS.map((group) => (
                <NavGroup
                  key={group.key}
                  group={group}
                  collapsed={collapsed}
                  isOpen={openKeys.has(group.key)}
                  onToggle={() => toggle(group.key)}
                  onAnyClick={onCloseMobile}
                  active={isGroupActive(group)}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}


function SectionHeader({ hidden, children }: { hidden?: boolean; children: ReactNode }) {
  if (hidden) return null;
  return (
    <div className="mb-1 px-5 text-[11px] font-medium uppercase tracking-wide text-white/30">
      {children}
    </div>
  );
}

function SimpleNav({
  to,
  children,
  collapsed,
  onClick,
}: {
  to: string;
  children: ReactNode;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }: { isActive: boolean }) =>
        [
          collapsed
            ? "flex items-center justify-center rounded-md py-2"
            : "flex items-center gap-3 rounded-full px-4 py-3",
          isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5 hover:text-white",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

function NavGroup({
  group, collapsed, isOpen, onToggle, onAnyClick, active,
}: {
  group: {
    label: string;
    icon: ReactNode;
    to?: string;
    children?: { label: string; to: string }[];
  };
  collapsed?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onAnyClick?: () => void;
  active?: boolean;
}) {
  const hasChildren = !!group.children?.length;

  const Chevron = (
    <svg
      className={[
        "h-3 w-3 transition-transform",
        isOpen ? "rotate-90 text-white" : "rotate-0 text-white/60",
      ].join(" ")}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M7 5l6 5-6 5V5z" />
    </svg>
  );

  const groupRowClass = [
    collapsed ? "justify-center rounded-md" : "gap-3 rounded-full",
    "flex items-center px-2 py-2",
    active ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white",
  ].join(" ");

  return (
    <div>
      <div className={groupRowClass}>
        {!collapsed && hasChildren && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle();
            }}
            className="shrink-0 p-1 rounded hover:bg-white/10"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {Chevron}
          </button>
        )}

        {group.to ? (
          <NavLink
            to={group.to}
            onClick={onAnyClick}
            className={({ isActive }) =>
              [
                "flex items-center",
                collapsed ? "justify-center" : "gap-2 flex-1",
                isActive ? "text-white" : "",
              ].join(" ")
            }
          >
            <span className={collapsed ? "inline-flex" : "inline-flex mr-1"}>
              {group.icon}
            </span>
            {!collapsed && <span className="truncate">{group.label}</span>}
          </NavLink>
        ) : (
          <>
            <span className={collapsed ? "inline-flex" : "inline-flex mr-1"}>
              {group.icon}
            </span>
            {!collapsed && <span className="truncate">{group.label}</span>}
          </>
        )}
      </div>

      {hasChildren && !collapsed && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="pl-10"
            >
              <ul className="py-1 space-y-1">
                {group.children!.map((c) => (
                  <li key={c.to}>
                    <NavLink
                      to={c.to}
                      onClick={onAnyClick}
                      className={({ isActive }) =>
                        [
                          "flex items-center rounded-full px-3 py-1.5 text-[13px]",
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:bg-white/5 hover:text-white",
                        ].join(" ")
                      }
                    >
                      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-white/30" />
                      {c.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}



function Dot6() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3Z" fill="white" fillOpacity="0.2" />
    </svg>
  );
}

function IconOverview() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.81261 8.09609C6.90765 8.04123 6.98656 7.96231 7.04142 7.86727C7.09627 7.77223 7.12514 7.66442 7.12511 7.55469V1.92969C7.12456 1.83004 7.10018 1.73198 7.05402 1.64367C7.00786 1.55536 6.94126 1.47936 6.85976 1.42202C6.77826 1.36469 6.68424 1.32766 6.58553 1.31405C6.48681 1.30043 6.38628 1.31062 6.2923 1.34375C4.46807 1.98939 2.93396 3.26457 1.96575 4.94005C0.997549 6.61554 0.658754 8.58145 1.01027 10.4844C1.02849 10.5828 1.07008 10.6754 1.13153 10.7544C1.19298 10.8333 1.27249 10.8964 1.3634 10.9383C1.44531 10.9766 1.53468 10.9963 1.62511 10.9961C1.73481 10.9961 1.84259 10.9673 1.93761 10.9125L6.81261 8.09609ZM5.87511 2.87656V7.19375L2.13449 9.35234C2.12511 9.23438 2.12511 9.11563 2.12511 9C2.12622 7.73309 2.4769 6.49106 3.13855 5.41066C3.80019 4.33025 4.74713 3.45337 5.87511 2.87656ZM17.1251 9C17.1257 10.7837 16.5394 12.518 15.4565 13.9354C14.3737 15.3528 12.8545 16.3745 11.1334 16.8428C9.41224 17.3111 7.58484 17.2 5.9331 16.5267C4.28137 15.8534 2.8971 14.6553 1.99386 13.1172C1.95176 13.0461 1.92415 12.9675 1.91263 12.8857C1.90112 12.8039 1.90592 12.7207 1.92677 12.6407C1.94762 12.5608 1.9841 12.4859 2.0341 12.4201C2.0841 12.3544 2.14664 12.2992 2.21808 12.2578L8.37511 8.67422V1.5C8.37511 1.33424 8.44096 1.17527 8.55817 1.05806C8.67538 0.940848 8.83435 0.875 9.00011 0.875C10.418 0.875723 11.811 1.24729 13.0409 1.95282C14.2707 2.65834 15.2947 3.67328 16.0111 4.89688C16.759 6.20247 17.1269 7.58916 17.1251 9Z" fill="white" />
    </svg>
  );
}

function IconReservation() {
  return (
    <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.375 0.625H1.625C1.29348 0.625 0.975537 0.756696 0.741116 0.991116C0.506696 1.22554 0.375 1.54348 0.375 1.875V13.125C0.375 13.4565 0.506696 13.7745 0.741116 14.0089C0.975537 14.2433 1.29348 14.375 1.625 14.375H15.375C15.7065 14.375 16.0245 14.2433 16.2589 14.0089C16.4933 13.7745 16.625 13.4565 16.625 13.125V1.875C16.625 1.54348 16.4933 1.22554 16.2589 0.991116C16.0245 0.756696 15.7065 0.625 15.375 0.625ZM6 6.875C6 6.38055 6.14662 5.8972 6.42133 5.48607C6.69603 5.07495 7.08648 4.75452 7.54329 4.5653C8.00011 4.37608 8.50277 4.32657 8.98773 4.42304C9.47268 4.5195 9.91814 4.7576 10.2678 5.10723C10.6174 5.45686 10.8555 5.90232 10.952 6.38727C11.0484 6.87223 10.9989 7.37489 10.8097 7.83171C10.6205 8.28852 10.3 8.67897 9.88893 8.95367C9.4778 9.22838 8.99445 9.375 8.5 9.375C7.83696 9.375 7.20107 9.11161 6.73223 8.64277C6.26339 8.17393 6 7.53804 6 6.875ZM4.16953 13.125C4.60833 12.3647 5.23954 11.7334 5.9997 11.2945C6.75987 10.8555 7.6222 10.6244 8.5 10.6244C9.3778 10.6244 10.2401 10.8555 11.0003 11.2945C11.7605 11.7334 12.3917 12.3647 12.8305 13.125H4.16953ZM15.375 13.125H14.2289C13.5692 11.6184 12.3431 10.4318 10.8156 9.82187C11.4291 9.34023 11.8772 8.67926 12.0974 7.93099C12.3177 7.18273 12.2991 6.38442 12.0443 5.64721C11.7895 4.91001 11.3111 4.27061 10.6759 3.81803C10.0406 3.36545 9.28 3.12223 8.5 3.12223C7.72 3.12223 6.95942 3.36545 6.32415 3.81803C5.68888 4.27061 5.21054 4.91001 4.95573 5.64721C4.70093 6.38442 4.68234 7.18273 4.90257 7.93099C5.12279 8.67926 5.57085 9.34023 6.18437 9.82187C4.65692 10.4318 3.43082 11.6184 2.77109 13.125H1.625V1.875H15.375V13.125Z" fill="white" />
    </svg>
  );
}

function IconGuest() {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.8751 2.2502C11.8751 2.08444 11.941 1.92547 12.0582 1.80826C12.1754 1.69105 12.3344 1.6252 12.5001 1.6252H19.3751C19.5409 1.6252 19.6998 1.69105 19.8171 1.80826C19.9343 1.92547 20.0001 2.08444 20.0001 2.2502C20.0001 2.41596 19.9343 2.57493 19.8171 2.69214C19.6998 2.80935 19.5409 2.8752 19.3751 2.8752H12.5001C12.3344 2.8752 12.1754 2.80935 12.0582 2.69214C11.941 2.57493 11.8751 2.41596 11.8751 2.2502ZM19.3751 5.3752H12.5001C12.3344 5.3752 12.1754 5.44105 12.0582 5.55826C11.941 5.67547 11.8751 5.83444 11.8751 6.0002C11.8751 6.16596 11.941 6.32493 12.0582 6.44214C12.1754 6.55935 12.3344 6.6252 12.5001 6.6252H19.3751C19.5409 6.6252 19.6998 6.55935 19.8171 6.44214C19.9343 6.32493 20.0001 6.16596 20.0001 6.0002C20.0001 5.83444 19.9343 5.67547 19.8171 5.55826C19.6998 5.44105 19.5409 5.3752 19.3751 5.3752ZM19.3751 9.1252H14.3751C14.2094 9.1252 14.0504 9.19105 13.9332 9.30826C13.816 9.42547 13.7501 9.58444 13.7501 9.7502C13.7501 9.91596 13.816 10.0749 13.9332 10.1921C14.0504 10.3094 14.2094 10.3752 14.3751 10.3752H19.3751C19.5409 10.3752 19.6998 10.3094 19.8171 10.1921C19.9343 10.0749 20.0001 9.91596 20.0001 9.7502C20.0001 9.58444 19.9343 9.42547 19.8171 9.30826C19.6998 9.19105 19.5409 9.1252 19.3751 9.1252ZM11.8556 10.844C11.876 10.9235 11.8806 11.0062 11.869 11.0875C11.8575 11.1688 11.83 11.247 11.7882 11.3176C11.7464 11.3883 11.6911 11.45 11.6255 11.4993C11.5598 11.5486 11.4851 11.5845 11.4056 11.6049C11.3546 11.6186 11.3021 11.6254 11.2493 11.6252C11.1107 11.6253 10.976 11.5793 10.8664 11.4944C10.7568 11.4095 10.6785 11.2907 10.6439 11.1565C10.1626 9.28614 8.27355 7.8752 6.24933 7.8752C4.22511 7.8752 2.33605 9.28536 1.8548 11.1565C1.81336 11.317 1.70983 11.4546 1.56698 11.5388C1.42413 11.6231 1.25366 11.6471 1.09308 11.6057C0.9325 11.5642 0.794959 11.4607 0.710714 11.3178C0.626469 11.175 0.602421 11.0045 0.643862 10.844C1.08058 9.14786 2.35011 7.77442 3.96105 7.09395C3.34076 6.61619 2.88557 5.95625 2.65932 5.2067C2.43306 4.45715 2.4471 3.65558 2.69944 2.91441C2.95179 2.17324 3.4298 1.52964 4.06643 1.07388C4.70306 0.618113 5.46638 0.373047 6.24933 0.373047C7.03228 0.373047 7.7956 0.618113 8.43223 1.07388C9.06886 1.52964 9.54687 2.17324 9.79922 2.91441C10.0516 3.65558 10.0656 4.45715 9.83934 5.2067C9.61309 5.95625 9.1579 6.61619 8.53761 7.09395C10.1493 7.77442 11.4189 9.14786 11.8556 10.844ZM6.25011 6.6252C6.74457 6.6252 7.22791 6.47858 7.63904 6.20387C8.05016 5.92917 8.37059 5.53872 8.55981 5.08191C8.74903 4.62509 8.79854 4.12243 8.70208 3.63748C8.60561 3.15252 8.36751 2.70706 8.01788 2.35743C7.66825 2.0078 7.22279 1.7697 6.73784 1.67324C6.25288 1.57677 5.75022 1.62628 5.2934 1.8155C4.83659 2.00472 4.44614 2.32515 4.17144 2.73628C3.89673 3.1474 3.75011 3.63075 3.75011 4.1252C3.75011 4.78824 4.0135 5.42413 4.48234 5.89297C4.95119 6.36181 5.58707 6.6252 6.25011 6.6252Z" fill="white" />
      </svg>
      );
}

      function IconProperty() {
  return (
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.875 0.46875H2.125C1.79348 0.46875 1.47554 0.593861 1.24112 0.816561C1.0067 1.03926 0.875 1.34131 0.875 1.65625V12.3438C0.875 12.6587 1.0067 12.9607 1.24112 13.1834C1.47554 13.4061 1.79348 13.5312 2.125 13.5312H15.875C16.2065 13.5312 16.5245 13.4061 16.7589 13.1834C16.9933 12.9607 17.125 12.6587 17.125 12.3438V1.65625C17.125 1.34131 16.9933 1.03926 16.7589 0.816561C16.5245 0.593861 16.2065 0.46875 15.875 0.46875ZM15.875 1.65625V2.84375H2.125V1.65625H15.875ZM15.875 12.3438H2.125V4.03125H15.875V12.3438ZM12.75 5.8125C12.75 6.75733 12.3549 7.66347 11.6517 8.33157C10.9484 8.99967 9.99456 9.375 9 9.375C8.00544 9.375 7.05161 8.99967 6.34835 8.33157C5.64509 7.66347 5.25 6.75733 5.25 5.8125C5.25 5.65503 5.31585 5.504 5.43306 5.39266C5.55027 5.28131 5.70924 5.21875 5.875 5.21875C6.04076 5.21875 6.19973 5.28131 6.31694 5.39266C6.43415 5.504 6.5 5.65503 6.5 5.8125C6.5 6.44239 6.76339 7.04648 7.23223 7.49188C7.70107 7.93728 8.33696 8.1875 9 8.1875C9.66304 8.1875 10.2989 7.93728 10.7678 7.49188C11.2366 7.04648 11.5 6.44239 11.5 5.8125C11.5 5.65503 11.5658 5.504 11.6831 5.39266C11.8003 5.28131 11.9592 5.21875 12.125 5.21875C12.2908 5.21875 12.4497 5.28131 12.5669 5.39266C12.6842 5.504 12.75 5.65503 12.75 5.8125Z" fill="#FDFDFD" />
      </svg>
      );
}

      function IconEngagement() {
  return (
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.75 12.5H18.125V10.625C18.125 10.4592 18.0592 10.3003 17.9419 10.1831C17.8247 10.0658 17.6658 10 17.5 10H12.5C12.3342 10 12.1753 10.0658 12.0581 10.1831C11.9408 10.3003 11.875 10.4592 11.875 10.625V12.5H3.125V1.875H16.875V8.125C16.875 8.29076 16.9408 8.44973 17.0581 8.56694C17.1753 8.68415 17.3342 8.75 17.5 8.75C17.6658 8.75 17.8247 8.68415 17.9419 8.56694C18.0592 8.44973 18.125 8.29076 18.125 8.125V1.875C18.125 1.54348 17.9933 1.22554 17.7589 0.991116C17.5245 0.756696 17.2065 0.625 16.875 0.625H3.125C2.79348 0.625 2.47554 0.756696 2.24112 0.991116C2.0067 1.22554 1.875 1.54348 1.875 1.875V12.5H1.25C1.08424 12.5 0.925268 12.5658 0.808058 12.6831C0.690848 12.8003 0.625 12.9592 0.625 13.125C0.625 13.2908 0.690848 13.4497 0.808058 13.5669C0.925268 13.6842 1.08424 13.75 1.25 13.75H18.75C18.9158 13.75 19.0747 13.6842 19.1919 13.5669C19.3092 13.4497 19.375 13.2908 19.375 13.125C19.375 12.9592 19.3092 12.8003 19.1919 12.6831C19.0747 12.5658 18.9158 12.5 18.75 12.5ZM13.125 11.25H16.875V12.5H13.125V11.25Z" fill="white" />
      </svg>
      );
}

      function IconMarketing() {
  return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.9797 4.09922C16.921 4.02901 16.8476 3.97254 16.7648 3.9338C16.6819 3.89506 16.5915 3.87498 16.5 3.875H3.89687L3.42187 1.26328C3.39571 1.11927 3.31984 0.989012 3.20748 0.895212C3.09512 0.801412 2.9534 0.750021 2.80703 0.75H0.875C0.70924 0.75 0.550268 0.815848 0.433058 0.933058C0.315848 1.05027 0.25 1.20924 0.25 1.375C0.25 1.54076 0.315848 1.69973 0.433058 1.81694C0.550268 1.93415 0.70924 2 0.875 2H2.28125L4.27812 12.9602C4.33695 13.2852 4.48059 13.5889 4.69453 13.8406C4.39925 14.1164 4.18613 14.4686 4.0788 14.8581C3.97146 15.2477 3.9741 15.6593 4.08643 16.0474C4.19876 16.4355 4.41638 16.7849 4.71518 17.0569C5.01397 17.3289 5.38225 17.5128 5.77918 17.5883C6.17612 17.6637 6.5862 17.6278 6.96394 17.4844C7.34169 17.341 7.67235 17.0958 7.91925 16.776C8.16615 16.4562 8.31965 16.0742 8.36273 15.6725C8.4058 15.2707 8.33677 14.8649 8.16328 14.5H11.7117C11.5719 14.7927 11.4995 15.1131 11.5 15.4375C11.5 15.8701 11.6283 16.2931 11.8687 16.6528C12.109 17.0125 12.4507 17.2929 12.8504 17.4585C13.2501 17.6241 13.6899 17.6674 14.1143 17.583C14.5386 17.4986 14.9284 17.2902 15.2343 16.9843C15.5402 16.6784 15.7486 16.2886 15.833 15.8643C15.9174 15.4399 15.8741 15.0001 15.7085 14.6004C15.5429 14.2007 15.2625 13.859 14.9028 13.6187C14.5431 13.3783 14.1201 13.25 13.6875 13.25H6.12266C5.97629 13.25 5.83457 13.1986 5.72221 13.1048C5.60985 13.011 5.53398 12.8807 5.50781 12.7367L5.26016 11.375H14.3227C14.7618 11.3749 15.1869 11.2208 15.524 10.9394C15.8611 10.658 16.0887 10.2672 16.1672 9.83516L17.1172 4.61172C17.1333 4.52144 17.1293 4.42872 17.1055 4.34015C17.0818 4.25158 17.0388 4.16933 16.9797 4.09922ZM7.125 15.4375C7.125 15.6229 7.07002 15.8042 6.967 15.9583C6.86399 16.1125 6.71757 16.2327 6.54627 16.3036C6.37496 16.3746 6.18646 16.3932 6.0046 16.357C5.82274 16.3208 5.6557 16.2315 5.52459 16.1004C5.39348 15.9693 5.30419 15.8023 5.26801 15.6204C5.23184 15.4385 5.25041 15.25 5.32136 15.0787C5.39232 14.9074 5.51248 14.761 5.66665 14.658C5.82082 14.555 6.00208 14.5 6.1875 14.5C6.43614 14.5 6.6746 14.5988 6.85041 14.7746C7.02623 14.9504 7.125 15.1889 7.125 15.4375ZM14.625 15.4375C14.625 15.6229 14.57 15.8042 14.467 15.9583C14.364 16.1125 14.2176 16.2327 14.0463 16.3036C13.875 16.3746 13.6865 16.3932 13.5046 16.357C13.3227 16.3208 13.1557 16.2315 13.0246 16.1004C12.8935 15.9693 12.8042 15.8023 12.768 15.6204C12.7318 15.4385 12.7504 15.25 12.8214 15.0787C12.8923 14.9074 13.0125 14.761 13.1667 14.658C13.3208 14.555 13.5021 14.5 13.6875 14.5C13.9361 14.5 14.1746 14.5988 14.3504 14.7746C14.5262 14.9504 14.625 15.1889 14.625 15.4375ZM14.9375 9.61172C14.9113 9.75612 14.835 9.88669 14.7222 9.98054C14.6094 10.0744 14.4671 10.1255 14.3203 10.125H5.03281L4.12422 5.125H15.7508L14.9375 9.61172Z" fill="white" />
      </svg>
      );
}

      function IconUpsell() {
  return (
      <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.0086 8.12501L9.25001 0.366412C9.13435 0.249834 8.99668 0.157407 8.84499 0.0945056C8.6933 0.0316038 8.53063 -0.000518312 8.36641 6.32418e-06H1.12501C0.959246 6.32418e-06 0.800275 0.0658545 0.683065 0.183065C0.565854 0.300275 0.500006 0.459246 0.500006 0.625006V7.86641C0.499482 8.03063 0.531604 8.1933 0.594506 8.34499C0.657407 8.49668 0.749834 8.63435 0.866412 8.75001L8.62501 16.5086C8.74108 16.6247 8.87889 16.7168 9.03057 16.7796C9.18225 16.8425 9.34481 16.8748 9.50899 16.8748C9.67317 16.8748 9.83574 16.8425 9.98741 16.7796C10.1391 16.7168 10.2769 16.6247 10.393 16.5086L17.0086 9.89298C17.1247 9.7769 17.2168 9.63909 17.2796 9.48741C17.3425 9.33574 17.3748 9.17317 17.3748 9.00899C17.3748 8.84481 17.3425 8.68225 17.2796 8.53057C17.2168 8.37889 17.1247 8.24108 17.0086 8.12501ZM9.5086 15.625L1.75001 7.86641V1.25001H8.36641L16.125 9.0086L9.5086 15.625ZM5.50001 4.06251C5.50001 4.24793 5.44502 4.42918 5.34201 4.58335C5.239 4.73752 5.09258 4.85769 4.92127 4.92864C4.74997 4.9996 4.56147 5.01817 4.37961 4.98199C4.19775 4.94582 4.03071 4.85653 3.89959 4.72542C3.76848 4.59431 3.67919 4.42726 3.64302 4.2454C3.60685 4.06355 3.62541 3.87505 3.69637 3.70374C3.76733 3.53243 3.88749 3.38602 4.04166 3.283C4.19583 3.17999 4.37709 3.12501 4.56251 3.12501C4.81115 3.12501 5.0496 3.22378 5.22542 3.39959C5.40123 3.57541 5.50001 3.81387 5.50001 4.06251Z" fill="white" />
      </svg>

      )
}
