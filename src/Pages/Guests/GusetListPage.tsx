/* eslint-disable @typescript-eslint/no-explicit-any */
import AvatarName from "../../components/AvatarName/AvatarName";
import StatusPill from "../../components/StatusPill/StatusPill";
import { fmtDate, fmtMoney } from "../../utils/fortmat";

const dummyGuests = [
  { id: "1", name: "John Doe",    avatarUrl: "/avatars/1.png", lastStayDate: "2025-06-24", offering: 942, status: "In Progress" },
  { id: "2", name: "Natali Craig",  avatarUrl: "/avatars/2.png", lastStayDate: "2025-03-10", offering: 881, status: "Complete" },
  { id: "3", name: "Drew Cano",     avatarUrl: "/avatars/3.png", lastStayDate: "2025-11-10", offering: 409, status: "Pending" },
  { id: "4", name: "Orlando Diggs", avatarUrl: "/avatars/4.png", lastStayDate: "2025-12-20", offering: 953, status: "Approved" },
  { id: "5", name: "Andi Lane",     avatarUrl: "/avatars/5.png", lastStayDate: "2025-07-25", offering: 907, status: "Rejected" },
  { id: "6", name: "Frankie Luna", avatarUrl: "/avatars/4.png", lastStayDate: "2025-12-20", offering: 953, status: "Complete" },
  { id: "7", name: "Franchis Lone",     avatarUrl: "/avatars/5.png", lastStayDate: "2025-07-25", offering: 907, status: "Rejected" },
  { id: "8", name: "Samuel Adams", avatarUrl: "/avatars/4.png", lastStayDate: "2025-12-20", offering: 953, status: "Approved" },
];

export default function GuestPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Guest</h1>
        <p className="text-white/60">Central Hub of Viewing Arrival</p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <input
          type="date"
          className="h-9 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none"
        />
        <input
          type="date"
          className="h-9 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="text-sm font-medium">Guest List</div>
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-md bg-white/10 hover:bg-white/20 grid place-items-center" aria-label="Filter">
              <svg width="18" height="18" viewBox="0 0 36 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35.6343 1.54563C35.4227 1.11222 35.072 0.743529 34.6258 0.485396C34.1797 0.227263 33.6577 0.0910816 33.125 0.0937896H2.87495C2.34271 0.0947192 1.82221 0.232529 1.37659 0.490503C0.930973 0.748476 0.579389 1.11553 0.364492 1.54712C0.149594 1.97872 0.0806171 2.45632 0.165929 2.92198C0.251241 3.38765 0.487175 3.82136 0.84511 4.17051L0.85886 4.18422L12.5 15.2017V26.9063C12.4998 27.3474 12.6348 27.7804 12.8904 28.1589C13.1461 28.5374 13.5128 28.8473 13.9516 29.0556C14.3903 29.2639 14.8846 29.3627 15.3818 29.3416C15.8789 29.3204 16.3603 29.1801 16.7745 28.9355L22.2745 25.6845C22.6515 25.4619 22.9607 25.1602 23.1745 24.8062C23.3883 24.4522 23.5001 24.0568 23.5 23.6553V15.2017L35.1428 4.18422L35.1565 4.17051C35.5182 3.82295 35.7564 3.38866 35.8414 2.92185C35.9264 2.45504 35.8544 1.97638 35.6343 1.54563ZM21.1246 13.8931C20.8868 14.1166 20.753 14.4115 20.75 14.7188V23.6553L15.25 26.9063V14.7188C15.2501 14.4093 15.1173 14.1114 14.8787 13.8855L2.87495 2.53129H33.125L21.1246 13.8931Z" fill="white"/>
              </svg>
            </button>
            <button className="h-9 w-9 rounded-md bg-white/10 hover:bg-white/20 grid place-items-center" aria-label="More">
              ⋮
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-separate border-spacing-y-2">
            <thead className="text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-5 py-2 text-left font-medium">Guest Name</th>
                <th className="px-5 py-2 text-left font-medium">Last Stay Date</th>
                <th className="px-5 py-2 text-left font-medium">Offering</th>
                <th className="px-5 py-2 text-left font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {dummyGuests.map((g) => (
                <tr key={g.id}>
                  <td className="rounded-l-xl bg-[#1b1c20] px-5 py-3">
                    <AvatarName name={g.name} avatarUrl={g.avatarUrl} />
                  </td>
                  <td className="bg-[#1b1c20] px-5 py-3">{fmtDate(g.lastStayDate)}</td>
                  <td className="bg-[#1b1c20] px-5 py-3">{fmtMoney(g.offering)}</td>
                  <td className="rounded-r-xl bg-[#1b1c20] px-5 py-3">
                    <div className="flex justify-end">
                      <StatusPill value={g.status as any} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
