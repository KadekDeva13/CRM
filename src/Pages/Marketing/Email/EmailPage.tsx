/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import Button from "../../../components/UI/button";
import { campaigns as seed, emailStats } from "../../../types/emailCampaigns";
import { fmtMoney } from "../../../utils/format";
import MarketingCard from "../../../components/marketing/marketingCard";

type Tab = "campaigns" | "templates" | "segments" | "analytics";

/** ===== Row (list item) mirip desain ===== */
function Badge({ children, color = "emerald" }: { children: React.ReactNode; color?: "emerald" | "sky" | "zinc" }) {
    const cls =
        color === "emerald"
            ? "bg-emerald-500/15 text-emerald-400 ring-emerald-400/20"
            : color === "sky"
                ? "bg-sky-500/15 text-sky-400 ring-sky-400/20"
                : "bg-zinc-500/15 text-zinc-300 ring-zinc-300/20";
    return (
        <span className={`inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-medium ring-1 ${cls}`}>
            {children}
        </span>
    );
}

function TinyIconBtn({
    label,
    children,
    onClick,
}: {
    label: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            aria-label={label}
            onClick={onClick}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md ring-1 ring-white/10 text-zinc-300 hover:text-white hover:bg-white/5"
            title={label}
            type="button"
        >
            {children}
        </button>
    );
}

type RowData = {
    id: string | number;
    title: string;
    template?: string;
    recipients?: number;
    scheduledAt?: string;
    lastActivity?: string;
    status?: "Active" | "Draft" | "Scheduled" | "Paused";
    tags?: string[];
    // stats
    sent?: number;
    opened?: number;
    openRate?: number; // 0-100
    clicked?: number;
    clickRate?: number; // 0-100
    estRevenue?: number;
};

function Row({ data }: { data: RowData }) {
    const {
        title,
        template = "Summer Vacation",
        recipients = 8547,
        scheduledAt = "2025-01-20 10:00",
        lastActivity = "2 hours ago",
        status = "Active",
        tags = ["Promotional"],
        sent = 8567,
        opened = 2568,
        openRate = 30,
        clicked = 512,
        clickRate = 6,
        estRevenue = 12288,
    } = data as RowData;

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm dark:bg-white/5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">{title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
                        <span>Template: <span className="text-zinc-200">{template}</span></span>
                        <span className="mx-1 text-zinc-600">•</span>
                        <span>Recipients: <span className="text-zinc-200">{recipients.toLocaleString()}</span></span>
                        <span className="mx-1 text-zinc-600">•</span>
                        <span>Scheduled: <span className="text-zinc-200">{scheduledAt}</span></span>
                        <span className="mx-1 text-zinc-600">•</span>
                        <span>Last Activity: <span className="text-zinc-200">{lastActivity}</span></span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {status && <Badge color="emerald">{status}</Badge>}
                    {tags?.map((t) => (
                        <Badge key={t} color="sky">{t}</Badge>
                    ))}
                    <div className="ml-2 flex items-center gap-1">
                        {/* tiga tombol kecil kanan */}
                        <TinyIconBtn label="Play">
                            {/* ▶ */}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M8 5v14l11-7-11-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                            </svg>
                        </TinyIconBtn>
                        <TinyIconBtn label="Duplicate">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path d="M8 8h10v10H8V8Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M6 6h10v2" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </TinyIconBtn>
                        <TinyIconBtn label="More">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <circle cx="5" cy="12" r="1.75" fill="currentColor" />
                                <circle cx="12" cy="12" r="1.75" fill="currentColor" />
                                <circle cx="19" cy="12" r="1.75" fill="currentColor" />
                            </svg>
                        </TinyIconBtn>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="my-3 h-px w-full bg-white/10" />

            {/* Footer stats */}
            <div className="grid grid-cols-4 gap-3 text-right">
                <div className="text-left">
                    <div className="text-sm font-semibold text-zinc-100">{sent.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-500">Sent</div>
                </div>
                <div>
                    <div className="text-sm font-semibold text-emerald-400">{opened.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-500">Opened ({openRate}%)</div>
                </div>
                <div>
                    <div className="text-sm font-semibold text-emerald-400">{clicked.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-500">Clicked ({clickRate}%)</div>
                </div>
                <div>
                    <div className="text-sm font-semibold text-emerald-400">${fmtMoney(estRevenue)}</div>
                    <div className="text-[10px] text-zinc-500">Est. Revenue</div>
                </div>
            </div>
        </div>
    );
}

/** ===== Page ===== */
export default function EmailPage(): React.ReactElement {
    const [tab, setTab] = useState<Tab>("campaigns");
    const [q, setQ] = useState("");
    const [status, setStatus] = useState<"" | "Active" | "Draft" | "Scheduled" | "Paused">("");

    const list = useMemo(() => {
        let data: any[] = seed as any[];
        if (q.trim()) {
            const qq = q.toLowerCase();
            data = data.filter((c) => c.title.toLowerCase().includes(qq) || c.template.toLowerCase().includes(qq));
        }
        if (status) data = data.filter((c) => c.status === status);
        return data;
    }, [q, status]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Email Marketing</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Create and manage email campaigns for your guests
                    </p>
                </div>

                {/* tombol mobile */}
                <div className="flex items-center gap-2 xl:hidden">
                    <Button variant="teal" size="lg" shape="pill">
                        {/* SVG asli, tidak diubah */}
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 6.125C7.5 5.95924 7.56585 5.80027 7.68306 5.68306C7.80027 5.56585 7.95924 5.5 8.125 5.5H13.125C13.2908 5.5 13.4497 5.56585 13.5669 5.68306C13.6842 5.80027 13.75 5.95924 13.75 6.125C13.75 6.29076 13.6842 6.44973 13.5669 6.56694C13.4497 6.68415 13.2908 6.75 13.125 6.75H8.125C7.95924 6.75 7.80027 6.68415 7.68306 6.56694C7.56585 6.44973 7.5 6.29076 7.5 6.125ZM8.125 9.25H13.125C13.2908 9.25 13.4497 9.18415 13.5669 9.06694C13.6842 8.94973 13.75 8.79076 13.75 8.625C13.75 8.45924 13.6842 8.30027 13.5669 8.18306C13.4497 8.06585 13.2908 8 13.125 8H8.125C7.95924 8 7.80027 8.06585 7.68306 8.18306C7.56585 8.30027 7.5 8.45924 7.5 8.625C7.5 8.79076 7.56585 8.94973 7.68306 9.06694C7.80027 9.18415 7.95924 9.25 8.125 9.25ZM18.125 13C18.125 13.663 17.8616 14.2989 17.3928 14.7678C16.9239 15.2366 16.288 15.5 15.625 15.5H6.875C6.21196 15.5 5.57607 15.2366 5.10723 14.7678C4.63839 14.2989 4.375 13.663 4.375 13V3C4.375 2.66848 4.2433 2.35054 4.00888 2.11612C3.77446 1.8817 3.45652 1.75 3.125 1.75C2.79348 1.75 2.47554 1.8817 2.24112 2.11612C2.0067 2.35054 1.875 2.66848 1.875 3C1.875 3.44844 2.25234 3.75156 2.25625 3.75469C2.35969 3.83429 2.43561 3.94428 2.47336 4.06922C2.51112 4.19416 2.50881 4.32779 2.46676 4.45135C2.42471 4.57491 2.34503 4.68221 2.2389 4.75819C2.13277 4.83417 2.00552 4.87502 1.875 4.875C1.73984 4.87523 1.60836 4.83104 1.50078 4.74922C1.41016 4.68281 0.625 4.06328 0.625 3C0.625 2.33696 0.888392 1.70107 1.35723 1.23223C1.82607 0.763392 2.46196 0.5 3.125 0.5H13.75C14.413 0.5 15.0489 0.763392 15.5178 1.23223C15.9866 1.70107 16.25 2.33696 16.25 3V11.125H16.875C17.0102 11.125 17.1418 11.1689 17.25 11.25C17.3438 11.3172 18.125 11.9367 18.125 13Z" fill="white" />
                        </svg>
                        Templates
                    </Button>

                    <Button variant="slate" size="lg" shape="pill">
                        <span className="mr-2 text-xl leading-none">+</span>
                        New Campaign
                    </Button>
                </div>
            </div>

            {/* Cards (JANGAN DIUBAH) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 items-stretch">
                <MarketingCard
                    className="h-[155px] rounded-[20px] overflow-hidden"
                    title="Total Subscribers"
                    value={emailStats.totalSubscribers.toLocaleString()}
                    delta="+0.03%"
                    subtitle="From last month"
                    icon="users"
                />
                <MarketingCard
                    className="h-[155px] rounded-[20px] overflow-hidden"
                    title="Average Open Rate"
                    value={`${emailStats.avgOpenRate}%`}
                    delta="+0.03%"
                    subtitle="From last month"
                    icon="eye"
                />
                <MarketingCard
                    className="h-[155px] rounded-[20px] overflow-hidden"
                    title="Click-Through Rate"
                    value={`${emailStats.ctr}%`}
                    delta="+0.03%"
                    subtitle="From last month"
                    icon="hand"
                />
                <MarketingCard
                    className="h-[155px] rounded-[20px] overflow-hidden"
                    title="Revenue Generated"
                    value={`${fmtMoney(emailStats.revenue)}`}
                    delta="+0.03%"
                    subtitle="From last month"
                    icon="bank"
                />

                {/* column tombol kanan */}
                <div className="hidden xl:flex flex-col gap-3 pl-1">
                    <Button variant="slate" size="lg" className="h-[72px] w-full rounded-2xl justify-start px-5 text-[15px]">
                        <span className="mr-3 text-2xl leading-none">+</span>
                        New Campaign
                    </Button>
                    <Button variant="teal" size="lg" className="h-[72px] w-full rounded-2xl justify-start px-5 text-[15px]">
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 6.125C7.5 5.95924 7.56585 5.80027 7.68306 5.68306C7.80027 5.56585 7.95924 5.5 8.125 5.5H13.125C13.2908 5.5 13.4497 5.56585 13.5669 5.68306C13.6842 5.80027 13.75 5.95924 13.75 6.125C13.75 6.29076 13.6842 6.44973 13.5669 6.56694C13.4497 6.68415 13.2908 6.75 13.125 6.75H8.125C7.95924 6.75 7.80027 6.68415 7.68306 6.56694C7.56585 6.44973 7.5 6.29076 7.5 6.125ZM8.125 9.25H13.125C13.2908 9.25 13.4497 9.18415 13.5669 9.06694C13.6842 8.94973 13.75 8.79076 13.75 8.625C13.75 8.45924 13.6842 8.30027 13.5669 8.18306C13.4497 8.06585 13.2908 8 13.125 8H8.125C7.95924 8 7.80027 8.06585 7.68306 8.18306C7.56585 8.30027 7.5 8.45924 7.5 8.625C7.5 8.79076 7.56585 8.94973 7.68306 9.06694C7.80027 9.18415 7.95924 9.25 8.125 9.25ZM18.125 13C18.125 13.663 17.8616 14.2989 17.3928 14.7678C16.9239 15.2366 16.288 15.5 15.625 15.5H6.875C6.21196 15.5 5.57607 15.2366 5.10723 14.7678C4.63839 14.2989 4.375 13.663 4.375 13V3C4.375 2.66848 4.2433 2.35054 4.00888 2.11612C3.77446 1.8817 3.45652 1.75 3.125 1.75C2.79348 1.75 2.47554 1.8817 2.24112 2.11612C2.0067 2.35054 1.875 2.66848 1.875 3C1.875 3.44844 2.25234 3.75156 2.25625 3.75469C2.35969 3.83429 2.43561 3.94428 2.47336 4.06922C2.51112 4.19416 2.50881 4.32779 2.46676 4.45135C2.42471 4.57491 2.34503 4.68221 2.2389 4.75819C2.13277 4.83417 2.00552 4.87502 1.875 4.875C1.73984 4.87523 1.60836 4.83104 1.50078 4.74922C1.41016 4.68281 0.625 4.06328 0.625 3C0.625 2.33696 0.888392 1.70107 1.35723 1.23223C1.82607 0.763392 2.46196 0.5 3.125 0.5H13.75C14.413 0.5 15.0489 0.763392 15.5178 1.23223C15.9866 1.70107 16.25 2.33696 16.25 3V11.125H16.875C17.0102 11.125 17.1418 11.1689 17.25 11.25C17.3438 11.3172 18.125 11.9367 18.125 13Z" fill="white" />
                        </svg>
                        Templates
                    </Button>
                </div>
            </div>

            {/* Tabs – segmented control */}
            <div className="w-full">
                <div className="flex items-center rounded-lg bg-zinc-800/60 border border-white/10 p-1">
                    {(["campaigns", "templates", "segments", "analytics"] as Tab[]).map((t) => {
                        const active = tab === t;
                        return (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                type="button"
                                className={[
                                    "flex-1 select-none rounded-md px-4 py-2 text-[12px] font-medium transition",
                                    active
                                        ? "bg-zinc-900/70 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                                        : "text-zinc-300 hover:text-white hover:bg-white/5"
                                ].join(" ")}
                            >
                                {t === "campaigns" ? "Campaign" : t[0].toUpperCase() + t.slice(1)}
                            </button>
                        );
                    })}
                </div>
            </div>


            {tab === "campaigns" && (
                <section className="rounded-xl border border-white/10 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">Email Campaigns</h2>
                        <div className="flex items-center gap-2">
                            <div className="relative w-[260px]">
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Search campaigns…"
                                    className="w-full rounded-md bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-2 pl-9 outline-none placeholder:text-zinc-400"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span>
                            </div>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="rounded-md bg-white/80 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-2 text-sm outline-none"
                            >
                                <option value="">All Status</option>
                                <option>Active</option>
                                <option>Draft</option>
                                <option>Scheduled</option>
                                <option>Paused</option>
                            </select>
                        </div>
                    </div>

                    <div className="h-2 rounded bg-zinc-900/5 dark:bg-white/5" />

                    <div className="space-y-3">
                        {list.map((c: any) => (
                            <Row
                                key={c.id}
                                data={{
                                    id: c.id,
                                    title: c.title,
                                    template: c.template,
                                    recipients: c.recipients ?? 8547,
                                    scheduledAt: c.scheduledAt ?? "2025-01-20 10:00",
                                    lastActivity: c.lastActivity ?? "2 hours ago",
                                    status: c.status,
                                    tags: c.tags ?? ["Promotional"],
                                    sent: c.sent ?? 8567,
                                    opened: c.opened ?? 2568,
                                    openRate: c.openRate ?? 30,
                                    clicked: c.clicked ?? 512,
                                    clickRate: c.clickRate ?? 6,
                                    estRevenue: c.estRevenue ?? 12288,
                                }}
                            />
                        ))}
                    </div>
                </section>
            )}


            {tab === "templates" && (
                <section className="rounded-xl border border-zinc-200 dark:border-white/10 p-6 text-sm text-zinc-500 dark:text-zinc-400">
                    Templates placeholder… (coming soon)
                </section>
            )}

            {tab === "segments" && (
                <section className="rounded-xl border border-zinc-200 dark:border-white/10 p-6 text-sm text-zinc-500 dark:text-zinc-400">
                    Segments placeholder… (coming soon)
                </section>
            )}

            {tab === "analytics" && (
                <section className="rounded-xl border border-zinc-200 dark:border-white/10 p-6 text-sm text-zinc-500 dark:text-zinc-400">
                    Analytics placeholder… (coming soon)
                </section>
            )}
        </div>
    );
}
