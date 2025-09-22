/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import Button from "../../../components/UI/button";
import { campaigns as seed, emailStats } from "../../../types/emailCampaigns";
import CampaignRow from "../../../components/marketing/campaignRows";
import { fmtMoney } from "../../../utils/format";
import MarketingCard from "../../../components/marketing/marketingCard";

type Tab = "campaigns" | "templates" | "segments" | "analytics";

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Email Marketing</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Create and manage email campaigns for your guests
          </p>
        </div>
      </div>

      <div className="flex flex-wrap xl:flex-nowrap items-start gap-6">
        <MarketingCard
          className="h-[120px] w-[269px] rounded-[20px] overflow-hidden"
          title="Total Subscribers"
          value={emailStats.totalSubscribers.toLocaleString()}
          delta="+0.03%"
          subtitle="From last month"
          icon="users"
        />
        <MarketingCard
          className="h-[120px] w-[269px] rounded-[20px] overflow-hidden"
          title="Average Open Rate"
          value={`${emailStats.avgOpenRate}%`}
          delta="+0.03%"
          subtitle="From last month"
          icon="eye"
        />
        <MarketingCard
          className="h-[120px] w-[269px] rounded-[20px] overflow-hidden"
          title="Click-Through Rate"
          value={`${emailStats.ctr}%`}
          delta="+0.03%"
          subtitle="From last month"
          icon="hand"
        />
        <MarketingCard
          className="h-[120px] w-[269px] rounded-[20px] overflow-hidden"
          title="Revenue Generated"
          value={`${fmtMoney(emailStats.revenue)}`}
          delta="+0.03%"
          subtitle="From last month"
          icon="bank"
        />

        <div className="hidden xl:flex w-[198px] flex-col gap-3 ml-auto">
          <Button variant="slate" size="lg" className="h-[52px] w-full rounded-2xl justify-start px-5 text-[14px]">
            <svg className="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.5 8C15.5 8.16576 15.4342 8.32473 15.3169 8.44194C15.1997 8.55915 15.0408 8.625 14.875 8.625H8.625V14.875C8.625 15.0408 8.55915 15.1997 8.44194 15.3169C8.32473 15.4342 8.16576 15.5 8 15.5C7.83424 15.5 7.67527 15.4342 7.55806 15.3169C7.44085 15.1997 7.375 15.0408 7.375 14.875V8.625H1.125C0.95924 8.625 0.800269 8.55915 0.683058 8.44194C0.565848 8.32473 0.5 8.16576 0.5 8C0.5 7.83424 0.565848 7.67527 0.683058 7.55806C0.800269 7.44085 0.95924 7.375 1.125 7.375H7.375V1.125C7.375 0.95924 7.44085 0.800269 7.55806 0.683058C7.67527 0.565848 7.83424 0.5 8 0.5C8.16576 0.5 8.32473 0.565848 8.44194 0.683058C8.55915 0.800269 8.625 0.95924 8.625 1.125V7.375H14.875C15.0408 7.375 15.1997 7.44085 15.3169 7.55806C15.4342 7.67527 15.5 7.83424 15.5 8Z" fill="white" />
            </svg>
            New Campaign
          </Button>
          <Button variant="teal" size="lg" className="h-[52px] w-full rounded-2xl justify-start px-5 text-[15px]">
            <svg className="mr-2" width="19" height="16" viewBox="0 0 19 16" fill="none">
              <path d="M7.5 6.125C7.5 5.95924 7.56585 5.80027 7.68306 5.68306C7.80027 5.56585 7.95924 5.5 8.125 5.5H13.125C13.2908 5.5 13.4497 5.56585 13.5669 5.68306C13.6842 5.80027 13.75 5.95924 13.75 6.125C13.75 6.29076 13.6842 6.44973 13.5669 6.56694C13.4497 6.68415 13.2908 6.75 13.125 6.75H8.125C7.95924 6.75 7.80027 6.68415 7.68306 6.56694C7.56585 6.44973 7.5 6.29076 7.5 6.125ZM8.125 9.25H13.125C13.2908 9.25 13.4497 9.18415 13.5669 9.06694C13.6842 8.94973 13.75 8.79076 13.75 8.625C13.75 8.45924 13.6842 8.30027 13.5669 8.18306C13.4497 8.06585 13.2908 8 13.125 8H8.125C7.95924 8 7.80027 8.06585 7.68306 8.18306C7.56585 8.30027 7.5 8.45924 7.5 8.625C7.5 8.79076 7.56585 8.94973 7.68306 9.06694C7.80027 9.18415 7.95924 9.25 8.125 9.25ZM18.125 13C18.125 13.663 17.8616 14.2989 17.3928 14.7678C16.9239 15.2366 16.288 15.5 15.625 15.5H6.875C6.21196 15.5 5.57607 15.2366 5.10723 14.7678C4.63839 14.2989 4.375 13.663 4.375 13V3C4.375 2.66848 4.2433 2.35054 4.00888 2.11612C3.77446 1.8817 3.45652 1.75 3.125 1.75C2.79348 1.75 2.47554 1.8817 2.24112 2.11612C2.0067 2.35054 1.875 2.66848 1.875 3C1.875 3.44844 2.25234 3.75156 2.25625 3.75469C2.35969 3.83429 2.43561 3.94428 2.47336 4.06922C2.51112 4.19416 2.50881 4.32779 2.46676 4.45135C2.42471 4.57491 2.34503 4.68221 2.2389 4.75819C2.13277 4.83417 2.00552 4.87502 1.875 4.875C1.73984 4.87523 1.60836 4.83104 1.50078 4.74922C1.41016 4.68281 0.625 4.06328 0.625 3C0.625 2.33696 0.888392 1.70107 1.35723 1.23223C1.82607 0.763392 2.46196 0.5 3.125 0.5H13.75C14.413 0.5 15.0489 0.763392 15.5178 1.23223C15.9866 1.70107 16.25 2.33696 16.25 3V11.125H16.875C17.0102 11.125 17.1418 11.1689 17.25 11.25C17.3438 11.3172 18.125 11.9367 18.125 13Z" fill="white" />
            </svg>
            Templates
          </Button>
        </div>
      </div>

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
                    : "text-zinc-300 hover:text-white hover:bg-white/5",
                ].join(" ")}
              >
                {t === "campaigns" ? "Campaign" : t[0].toUpperCase() + t.slice(1)}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "campaigns" && (
        <section className="space-y-4">
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.9419 16.058L13.0302 12.1471C14.1639 10.7859 14.7293 9.04002 14.6086 7.27263C14.488 5.50524 13.6906 3.85241 12.3823 2.65797C11.074 1.46353 9.35566 0.819439 7.58462 0.859689C5.81357 0.899939 4.12622 1.62143 2.87358 2.87407C1.62094 4.12671 0.899451 5.81406 0.859201 7.5851C0.818951 9.35615 1.46304 11.0745 2.65748 12.3828C3.85192 13.691 5.50475 14.4884 7.27214 14.6091C9.03953 14.7298 10.7854 14.1644 12.1466 13.0306L16.0575 16.9424C16.1156 17.0004 16.1845 17.0465 16.2604 17.0779C16.3363 17.1094 16.4176 17.1255 16.4997 17.1255C16.5818 17.1255 16.6631 17.1094 16.739 17.0779C16.8149 17.0465 16.8838 17.0004 16.9419 16.9424C16.9999 16.8843 17.046 16.8154 17.0774 16.7395C17.1089 16.6636 17.125 16.5823 17.125 16.5002C17.125 16.4181 17.1089 16.3367 17.0774 16.2609C17.046 16.185 16.9999 16.1161 16.9419 16.058ZM2.12469 7.75018C2.12469 6.63766 2.45459 5.55012 3.07267 4.6251C3.69076 3.70007 4.56926 2.9791 5.5971 2.55336C6.62493 2.12761 7.75593 2.01622 8.84707 2.23326C9.93822 2.4503 10.9405 2.98603 11.7272 3.7727C12.5138 4.55937 13.0496 5.56165 13.2666 6.6528C13.4837 7.74394 13.3723 8.87494 12.9465 9.90277C12.5208 10.9306 11.7998 11.8091 10.8748 12.4272C9.94975 13.0453 8.86221 13.3752 7.74969 13.3752C6.25836 13.3735 4.82858 12.7804 3.77404 11.7258C2.71951 10.6713 2.12634 9.24151 2.12469 7.75018Z" fill="white" />
                  </svg>
                </span>
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
              <CampaignRow
                key={c.id}
                data={{
                  id: c.id,
                  title: c.title,
                  template: c.template ?? "Summer Vacation",
                  recipients: c.recipients ?? 8547,
                  scheduledAt: c.scheduledAt ?? "2025-01-20 10:00",
                  lastActivity: c.lastActivity ?? "2 hours ago",
                  status: c.status ?? "Active",
                  tags: c.tags ?? ["Promotional"],
                  sent: c.sent ?? 8567,
                  opened: c.opened ?? 2568,
                  openRate: c.openRate ?? 30,
                  clicked: c.clicked ?? 512,
                  clickRate: c.clickRate ?? 6,
                  estRevenue: c.estRevenue ?? 12288,
                }}
                onEdit={(x) => console.log("edit", x)}
                onDuplicate={(x) => console.log("duplicate", x)}
                onSchedule={(x) => console.log("schedule", x)}
                onMore={(x) => console.log("more", x)}
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
