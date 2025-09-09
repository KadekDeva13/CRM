import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppSidebar from "../../components/AppSidebar";
import RightSidebar from "../../components/AppSidebarKanan";

const SIDEBAR_W = { open: 256, collapsed: 72 };
const RIGHT_SIDEBAR_W = 288;

export default function MainLayout(): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <div className="min-h-svh bg-[#2A2A2A] text-white">
      <AppHeader
        onMenu={() => setOpenMobile(true)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <AppSidebar
        collapsed={collapsed}
        openMobile={openMobile}
        onCloseMobile={() => setOpenMobile(false)}
      />

      <div className="hidden xl:block">
        <RightSidebar />
      </div>

      <div
        className="pt-16 transition-all"
        style={{
          paddingLeft: collapsed ? SIDEBAR_W.collapsed : SIDEBAR_W.open,
          paddingRight: RIGHT_SIDEBAR_W,
        }}
      >
        <main className="min-h-[calc(100svh-64px)] p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
