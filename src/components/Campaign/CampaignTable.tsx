import type { Campaign } from "../../types/Campaigns";
import StatusPillCampaign from "../../components/Campaign/StatusPillCampign";

export default function CampaignTable({
    rows, page, perPage, total, onPage, onPerPage,
}: {
    rows: Campaign[]; page: number; perPage: number; total: number;
    onPage: (p: number) => void; onPerPage: (n: number) => void;
}) {
    const lastPage = Math.max(1, Math.ceil(total / perPage));

    return (
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-zinc-50 text-zinc-600">
                    <tr>
                        <th className="text-left font-medium px-4 py-3">Campaign Name</th>
                        <th className="text-left font-medium px-4 py-3">Status</th>
                        <th className="text-left font-medium px-4 py-3">Delivery</th>
                        <th className="text-left font-medium px-4 py-3">Last Updated</th>
                        <th className="text-left font-medium px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => (
                        <tr key={r.id} className="border-t border-zinc-100">
                            <td className="px-4 py-4">
                                <div className="font-semibold text-zinc-800">{r.name}</div>
                                <div className="text-xs text-zinc-500">{r.tag}</div>
                            </td>
                            <td className="px-4 py-4">
                                <StatusPillCampaign value={r.status} />
                            </td>
                            <td className="px-4 py-4 text-zinc-700">{r.delivery}</td>
                            <td className="px-4 py-4 align-top">
                                {(() => {
                                    const d = new Date(r.updatedAt);

                                    // Baris 1: "Sun, 07-09-25"
                                    const day = d.toLocaleDateString("en-GB", { weekday: "short" });
                                    const dd = String(d.getDate()).padStart(2, "0");
                                    const mm = String(d.getMonth() + 1).padStart(2, "0");
                                    const yy = String(d.getFullYear()).slice(-2);
                                    const dateLine = `${day}, ${dd}-${mm}-${yy}`;

                                    // Baris 2: "04.45 AM"
                                    let hh = d.getHours();
                                    const m = String(d.getMinutes()).padStart(2, "0");
                                    const ap = hh >= 12 ? "AM" : "PM";   // <- kalau kamu ingin AM/PM kebalik, tukar jadi hh>=12?"PM":"AM"
                                    hh = ((hh + 11) % 12) + 1;
                                    const timeLine = `${String(hh).padStart(2, "0")}.${m} ${ap}`;

                                    return (
                                        <div className="leading-tight">
                                            <div className="text-zinc-800">{dateLine}</div>
                                            <div className="text-zinc-800">{timeLine}</div>
                                            <div className="text-xs text-zinc-500 mt-0.5">by {r.updatedBy}</div>
                                        </div>
                                    );
                                })()}
                            </td>

                            <td className="px-4 py-4">
                                <div className="flex items-center gap-3 text-zinc-500">
                                    <button title="View" className="p-2 rounded hover:bg-zinc-100">
                                        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.48457 0C6.95957 0 4.9377 1.15 3.46582 2.51875C2.00332 3.875 1.0252 5.5 0.562695 6.61562C0.45957 6.8625 0.45957 7.1375 0.562695 7.38437C1.0252 8.5 2.00332 10.125 3.46582 11.4812C4.9377 12.85 6.95957 14 9.48457 14C12.0096 14 14.0314 12.85 15.5033 11.4812C16.9658 10.1219 17.9439 8.5 18.4096 7.38437C18.5127 7.1375 18.5127 6.8625 18.4096 6.61562C17.9439 5.5 16.9658 3.875 15.5033 2.51875C14.0314 1.15 12.0096 0 9.48457 0ZM4.98457 7C4.98457 5.80653 5.45868 4.66193 6.30259 3.81802C7.1465 2.97411 8.2911 2.5 9.48457 2.5C10.678 2.5 11.8226 2.97411 12.6666 3.81802C13.5105 4.66193 13.9846 5.80653 13.9846 7C13.9846 8.19347 13.5105 9.33807 12.6666 10.182C11.8226 11.0259 10.678 11.5 9.48457 11.5C8.2911 11.5 7.1465 11.0259 6.30259 10.182C5.45868 9.33807 4.98457 8.19347 4.98457 7ZM9.48457 5C9.48457 6.10313 8.5877 7 7.48457 7C7.2627 7 7.0502 6.9625 6.8502 6.89687C6.67832 6.84062 6.47832 6.94688 6.48457 7.12813C6.49395 7.34375 6.5252 7.55937 6.58457 7.775C7.0127 9.375 8.65957 10.325 10.2596 9.89688C11.8596 9.46875 12.8096 7.82188 12.3814 6.22188C12.0346 4.925 10.8877 4.05312 9.6127 4C9.43145 3.99375 9.3252 4.19062 9.38145 4.36562C9.44707 4.56562 9.48457 4.77812 9.48457 5Z" fill="#9CA3AF" />
                                        </svg>
                                    </button>

                                    <button title="Edit" className="p-2 rounded hover:bg-zinc-100">
                                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.2219 0.67832C14.5375 -0.0060547 13.4312 -0.0060547 12.7469 0.67832L11.8062 1.61582L14.8656 4.6752L15.8062 3.73457C16.4906 3.0502 16.4906 1.94395 15.8062 1.25957L15.2219 0.67832ZM5.87187 7.55332C5.68125 7.74395 5.53437 7.97832 5.45 8.2377L4.525 11.0127C4.43438 11.2814 4.50625 11.5783 4.70625 11.7814C4.90625 11.9846 5.20312 12.0533 5.475 11.9627L8.25 11.0377C8.50625 10.9533 8.74062 10.8064 8.93437 10.6158L14.1625 5.38457L11.1 2.32207L5.87187 7.55332ZM3.48438 2.0002C1.82812 2.0002 0.484375 3.34395 0.484375 5.0002V13.0002C0.484375 14.6564 1.82812 16.0002 3.48438 16.0002H11.4844C13.1406 16.0002 14.4844 14.6564 14.4844 13.0002V10.0002C14.4844 9.44707 14.0375 9.0002 13.4844 9.0002C12.9312 9.0002 12.4844 9.44707 12.4844 10.0002V13.0002C12.4844 13.5533 12.0375 14.0002 11.4844 14.0002H3.48438C2.93125 14.0002 2.48438 13.5533 2.48438 13.0002V5.0002C2.48438 4.44707 2.93125 4.0002 3.48438 4.0002H6.48438C7.0375 4.0002 7.48438 3.55332 7.48438 3.0002C7.48438 2.44707 7.0375 2.0002 6.48438 2.0002H3.48438Z" fill="#9CA3AF" />
                                        </svg>
                                    </button>

                                    <button title="Delete" className="p-2 rounded hover:bg-zinc-100">
                                        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.70937 0.553125L4.48438 1H1.48438C0.93125 1 0.484375 1.44687 0.484375 2C0.484375 2.55312 0.93125 3 1.48438 3H13.4844C14.0375 3 14.4844 2.55312 14.4844 2C14.4844 1.44687 14.0375 1 13.4844 1H10.4844L10.2594 0.553125C10.0906 0.2125 9.74375 0 9.36563 0H5.60313C5.225 0 4.87812 0.2125 4.70937 0.553125ZM13.4844 4H1.48438L2.14688 14.5938C2.19687 15.3844 2.85313 16 3.64375 16H11.325C12.1156 16 12.7719 15.3844 12.8219 14.5938L13.4844 4Z" fill="#9CA3AF" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-zinc-200 text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-black">Rows per page</span>
                    <div className="relative inline-block">
                        <select
                            className="appearance-none w-20 rounded border border-zinc-500 bg-white px-2 py-1 text-black pr-6"
                            value={perPage}
                            onChange={(e) => onPerPage(Number(e.target.value))}
                        >
                            {[10, 20, 50].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                            <svg
                                width="10"
                                height="18"
                                viewBox="0 0 10 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0.672172 5.48858C0.624798 5.37439 0.612353 5.24871 0.636411 5.12745C0.660469 5.00619 0.719949 4.89478 0.807328 4.80733L4.55733 1.05733C4.61537 0.999217 4.6843 0.953118 4.76018 0.921665C4.83605 0.890212 4.91738 0.874023 4.99952 0.874023C5.08165 0.874023 5.16298 0.890212 5.23885 0.921665C5.31473 0.953118 5.38366 0.999217 5.4417 1.05733L9.1917 4.80733C9.27921 4.89474 9.33881 5.00615 9.36297 5.12745C9.38713 5.24875 9.37475 5.3745 9.3274 5.48876C9.28006 5.60302 9.19988 5.70067 9.097 5.76934C8.99413 5.83801 8.8732 5.87461 8.74952 5.87452H1.24952C1.1259 5.87449 1.00507 5.83781 0.902308 5.76911C0.799542 5.70042 0.719454 5.60279 0.672172 5.48858ZM8.74952 12.1245H1.24952C1.12583 12.1244 1.0049 12.161 0.902027 12.2297C0.799156 12.2984 0.718972 12.396 0.671627 12.5103C0.624281 12.6245 0.611903 12.7503 0.63606 12.8716C0.660216 12.9929 0.719821 13.1043 0.807328 13.1917L4.55733 16.9417C4.61537 16.9998 4.6843 17.0459 4.76018 17.0774C4.83605 17.1088 4.91738 17.125 4.99952 17.125C5.08165 17.125 5.16298 17.1088 5.23885 17.0774C5.31473 17.0459 5.38366 16.9998 5.4417 16.9417L9.1917 13.1917C9.27921 13.1043 9.33881 12.9929 9.36297 12.8716C9.38713 12.7503 9.37475 12.6245 9.3274 12.5103C9.28006 12.396 9.19988 12.2984 9.097 12.2297C8.99413 12.161 8.8732 12.1244 8.74952 12.1245Z" fill="black" />
                            </svg>
                        </span>
                    </div>
                </div>


                <div className="text-zinc-400">
                    Showing <b>{(page - 1) * perPage + 1}</b> to <b>{Math.min(page * perPage, total)}</b> of <b>{total}</b>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        aria-label="Previous page"
                        className={`px-3 py-1 rounded border flex items-center justify-center ${page === 1 ? "opacity-40 cursor-not-allowed" : ""
                            }`}
                        onClick={() => onPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                    >
                        <svg
                            width="8"
                            height="13"
                            viewBox="0 0 8 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M0.757324 5.63213C0.415527 5.97393 0.415527 6.529 0.757324 6.8708L6.00732 12.1208C6.34912 12.4626 6.9042 12.4626 7.246 12.1208C7.58779 11.779 7.58779 11.2239 7.246 10.8821L2.61396 6.2501L7.24326 1.61807C7.58506 1.27627 7.58506 0.721191 7.24326 0.379395C6.90147 0.0375976 6.34639 0.0375976 6.00459 0.379395L0.75459 5.6294L0.757324 5.63213Z"
                                fill="#6B7280"
                            />
                        </svg>
                    </button>
                    {[...Array(Math.min(3, lastPage))].map((_, i) => {
                        const n = i + 1;
                        return (
                            <button
                                key={n}
                                className={`px-3 py-1 rounded border ${page === n ? "bg-[#0F5A62] text-white" : ""}`}
                                onClick={() => onPage(n)}
                            >
                                {n}
                            </button>
                        );
                    })}

                    <button
                        aria-label="Next page"
                        className={`px-3 py-1 rounded border flex items-center justify-center ${page === lastPage ? "opacity-40 cursor-not-allowed" : ""
                            }`}
                        onClick={() => onPage(Math.min(lastPage, page + 1))}
                        disabled={page === lastPage}
                    >
                        <svg
                            width="7"
                            height="13"
                            viewBox="0 0 7 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M6.74307 5.63213C7.08486 5.97393 7.08486 6.529 6.74307 6.8708L1.49307 12.1208C1.15127 12.4626 0.596191 12.4626 0.254395 12.1208C-0.0874023 11.779 -0.0874023 11.2239 0.254395 10.8821L4.88643 6.2501L0.257129 1.61807C-0.084668 1.27627 -0.084668 0.721191 0.257129 0.379395C0.598926 0.0375976 1.154 0.0375976 1.4958 0.379395L6.7458 5.6294L6.74307 5.63213Z"
                                fill="#6B7280"
                            />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );
}
