/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppSidebar from "../../components/AppSidebar";

export default function MainLayout(): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const leftWidth = collapsed ? 76 : 256;

  return (
    <div
      className="min-h-svh bg-gray-50 text-gray-900 dark:bg-[#0b0b0f] dark:text-white"
      style={{ ["--left" as any]: `${leftWidth}px` }}
    >

      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#141418]/90 backdrop-blur">
        <AppHeader
          onMenu={() => setOpenMobile(true)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          leftWidth={leftWidth}
        />
      </div>

      <AppSidebar
        collapsed={collapsed}
        openMobile={openMobile}
        onCloseMobile={() => setOpenMobile(false)}
      />

      <main className="min-w-0 w-auto md:pl-[var(--left)]">
        <div className="w-full px-4 py-6 lg:px-6 mt-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
