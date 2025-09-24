/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "../../components/AppSidebar";

export default function TemplateBuilderLayout(): React.ReactElement {
    const [collapsed] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);

    const leftWidth = collapsed ? 76 : 256;

    return (
        <div
            className="min-h-svh bg-[#D2D4D3] text-gray-900 dark:text-white"
            style={{ ["--left" as any]: `${leftWidth}px` }}
        >

            <AppSidebar
                collapsed={collapsed}
                openMobile={openMobile}
                onCloseMobile={() => setOpenMobile(false)}
            />

            <main className="min-w-0 w-auto md:pl-[var(--left)]">
                <div className="w-full px-4 py-6 lg:px-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
