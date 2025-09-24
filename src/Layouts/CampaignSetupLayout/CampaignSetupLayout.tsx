import * as React from "react";
import { Outlet } from "react-router-dom";

export default function CampaignSetupLayout(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[#D2D4D3]">
      <div className="mx-auto max-w-[1100px] px-2 md:px-6">
        <Outlet />
      </div>
    </div>
  );
}
