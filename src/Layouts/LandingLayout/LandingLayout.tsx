import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  return (
    <div className="min-h-screen bg-[#12101C] flex flex-col items-center justify-center">
      <Outlet />
    </div>
  );
}
