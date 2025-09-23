import { Link } from "react-router-dom";

export default function CampaignSetupQuickNav() {
  return (
    <div className="w-full bg-[#D2D4D3]">
      <div className="mx-auto max-w-[1100px] px-2 md:px-6 py-2">
        <nav className="flex items-center gap-3 text-sm text-zinc-700">
          <Link to="/overview" className="hover:underline">Dashboards</Link>
          <span className="select-none">/</span>
          <Link to="/campaign" className="hover:underline">Campaign</Link>
          <span className="select-none">/</span>
          <span className="font-medium text-zinc-800">Create New Campaign</span>
        </nav>
      </div>
    </div>
  );
}
