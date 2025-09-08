import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../../components/AppHeader";
import AppSidebar from "../../components/AppSidebar";

export default function MainLayout(): React.ReactElement {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openMobile, setOpenMobile] = useState<boolean>(false);

  return (
    <div className="min-h-svh bg-[color:var(--bg,#0b1220)] text-white">
      <AppHeader
        onMenu={() => setOpenMobile(true)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="relative flex">
        <AppSidebar
          collapsed={collapsed}
          openMobile={openMobile}
          onCloseMobile={() => setOpenMobile(false)}
        />

        <main
          className={[
            "min-h-[calc(100svh-64px-56px)] w-full p-4 md:p-6",
            collapsed ? "lg:ml-[72px]" : "lg:ml-64",
          ].join(" ")}
        >
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
