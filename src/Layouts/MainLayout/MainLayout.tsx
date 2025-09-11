// src/layouts/MainLayout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppSidebar from "../../components/AppSidebar";
import RightSidebar from "../../components/AppSidebarKanan";

export default function MainLayout(): React.ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  // lebar sidebar kiri (grid kolom) dikontrol dari sini
  const leftWidth = collapsed ? 76 : 256;

  return (
    <div className="min-h-svh bg-[#0b0b0f] text-white">
      {/* HEADER yang menyatu */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#141418]/90 backdrop-blur">
        <AppHeader
          onMenu={() => setOpenMobile(true)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* GRID body: kiri | konten | kanan */}
      <div
        className="
          grid grid-cols-1
          md:grid-cols-[var(--left)_1fr]
          xl:grid-cols-[var(--left)_1fr_360px]
        "
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style={{ ["--left" as any]: `${leftWidth}px` }}
      >
        {/* SIDEBAR KIRI */}
        <aside className="hidden md:block border-r border-white/5 bg-[#141418]">
          <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-y-auto">
            <AppSidebar
              collapsed={collapsed}
              openMobile={openMobile}
              onCloseMobile={() => setOpenMobile(false)}
            />
          </div>
        </aside>

        {/* KONTEN UTAMA */}
        <main className="min-w-0">
          <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
            <Outlet />
          </div>
        </main>

        {/* SIDEBAR KANAN */}
        <aside className="hidden xl:block border-l border-white/5 bg-[#141418]">
          <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-y-auto">
            <RightSidebar />
          </div>
        </aside>
      </div>
    </div>
  );
}
