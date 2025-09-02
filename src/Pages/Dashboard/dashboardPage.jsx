import SalesLineChart
 from "../../components/SalesChart/SalesLineChart";
export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back,👋</h1>
        <p className="mt-1 text-sm text-white/70">
          Here's a quick overview of your CRM performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-blue-600/20 ring-1 ring-blue-500/40">
          <h3 className="text-sm text-white/70">Total Contacts</h3>
          <p className="text-2xl font-bold text-white">8</p>
        </div>
        <div className="p-4 rounded-xl bg-green-600/20 ring-1 ring-green-500/40">
          <h3 className="text-sm text-white/70">Active Contracts</h3>
          <p className="text-2xl font-bold text-white">7</p>
        </div>
        <div className="p-4 rounded-xl bg-yellow-600/20 ring-1 ring-yellow-500/40">
          <h3 className="text-sm text-white/70">Tasks Today</h3>
          <p className="text-2xl font-bold text-white">5</p>
        </div>
        <div className="p-4 rounded-xl bg-purple-600/20 ring-1 ring-purple-500/40">
          <h3 className="text-sm text-white/70">Revenue (This Month)</h3>
          <p className="text-2xl font-bold text-white">Rp 830.026.700</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4">
          <h2 className="text-lg font-semibold text-white mb-3">Recent Activity</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-white/80">Added new contact: John Doe</span>
              <span className="text-xs text-white/50">2h ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-white/80">Contract signed with ACME Corp</span>
              <span className="text-xs text-white/50">5h ago</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-white/80">Meeting scheduled with Jane</span>
              <span className="text-xs text-white/50">1d ago</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4">
          <h2 className="text-lg font-semibold text-white mb-3">Today's Tasks</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
              <span className="text-white/80">Follow up with Client A</span>
            </li>
            <li className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
              <span className="text-white/80">Send proposal to Company B</span>
            </li>
            <li className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
              <span className="text-white/80">Prepare report for weekly meeting</span>
            </li>
          </ul>
        </div>
      </div>


     <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4">
          <h2 className="text-sm font-medium text-white/80 mb-3">Sales vs Target</h2>
          <SalesLineChart height={300} />
        </div>
      </div>
    </div>
  );
}
