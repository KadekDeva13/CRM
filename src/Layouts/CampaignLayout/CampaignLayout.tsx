/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, type PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppSidebar from "../../components/AppSidebar";

type Props = PropsWithChildren<{ hideHeader?: boolean }>;

export default function CampaignLayout({ hideHeader = false, children }: Props): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const leftWidth = collapsed ? 76 : 256;

  return (
    <div className="min-h-svh bg-[#D2D4D3] text-gray-900 dark:text-white" style={{ ["--left" as any]: `${leftWidth}px` }}>
      {!hideHeader && (
        <div className="sticky top-0 z-50 border-b border-white/5 bg-[#FFFFFF] backdrop-blur">
          <AppHeader onMenu={() => setOpenMobile(true)} collapsed={collapsed} setCollapsed={setCollapsed} leftWidth={leftWidth} />
        </div>
      )}

      <AppSidebar collapsed={collapsed} openMobile={openMobile} onCloseMobile={() => setOpenMobile(false)} />

      <main className="min-w-0 w-auto md:pl-[var(--left)]">
        <div className={`w-full px-4 py-6 lg:px-6 ${hideHeader ? "" : "mt-12"}`}>
          {children ? children : <Outlet />}
        </div>
      </main>
    </div>
  );
}
