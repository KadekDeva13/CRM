import * as React from "react";
import type { Campaign } from "../../types/email";
import Badge  from "../UI/Badge";
import { fmtMoney } from "../../utils/format";
import { IconDuplicate, IconEdit, IconMore } from "../marketing/emailIcon";

type Props = {
  data: Campaign;
  onDuplicate?: (c: Campaign) => void;
  onEdit?: (c: Campaign) => void;
  onSchedule?: (c: Campaign) => void;
  onMore?: (c: Campaign) => void;
};

export default function CampaignRow({
  data,
  onDuplicate,
  onEdit,
  onMore,
}: Props) {
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/12 bg-white/90 dark:bg-white/5 shadow-sm">
      <div className="px-6 pt-5 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="truncate text-[20px] font-semibold leading-tight tracking-[-0.01em] text-zinc-900 dark:text-zinc-50">
                {data.title}
              </h3>
              <div className="flex items-center gap-2">
                <Badge color="teal">{data.status}</Badge>
                {data.tags.map((t) => (
                  <Badge key={t} color="sky">{t}</Badge>
                ))}
              </div>
            </div>

            <div
              className="
                mt-3 flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px]
                /* pastikan tak ada dot/bullet bawaan layout lain */
                [&>*]:before:content-none
              "
            >
              <Meta label="Template" value={data.template} />
              <Meta label="Recipients" value={data.recipients.toLocaleString()} />
              {data.scheduledAt && (
                <Meta
                  label="Scheduled"
                  value={new Date(data.scheduledAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                />
              )}
              {data.lastActivity && <Meta label="Last Activity" value={data.lastActivity} />}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <IconBtn title="Edit" onClick={() => onEdit?.(data)}><IconEdit className="h-4 w-4" /></IconBtn>
            <IconBtn title="Duplicate" onClick={() => onDuplicate?.(data)}><IconDuplicate className="h-4 w-4" /></IconBtn>
            <IconBtn title="More" onClick={() => onMore?.(data)}><IconMore className="h-4 w-4" /></IconBtn>
          </div>
        </div>
      </div>

      <div className="mx-6 h-px bg-black/10 dark:bg-white/10" />

      <div className="px-6 py-4">
        <div className="grid grid-cols-4 items-start">
          <Metric align="left" label="Sent" value={data.sent.toLocaleString()} />
          <Metric align="center" highlight label={`Opened (${data.openRate}%)`} value={data.opened.toLocaleString()} />
          <Metric align="center" highlight label={`Clicked (${data.clickRate}%)`} value={data.clicked.toLocaleString()} />
          <Metric align="right" highlight label="Est. Revenue" value={fmtMoney(data.estRevenue)} />
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
      <span className="opacity-80">{label}:</span>
      <span className="text-zinc-900 dark:text-zinc-200">{value}</span>
    </div>
  );
}

function Metric({
  label, value, align = "left", highlight = false,
}: {
  label: string;
  value: React.ReactNode;
  align?: "left" | "center" | "right";
  highlight?: boolean;
}) {
  const alignCls = align === "center" ? "text-center"
                    : align === "right" ? "text-right" : "";
  const valClr = highlight ? "text-emerald-500"
                : "text-zinc-900 dark:text-zinc-100";
  return (
    <div className={alignCls}>
      <div className={`text-[22px] font-semibold ${valClr}`}>{value}</div>
      <div className="mt-1 text-[12px] text-zinc-500 dark:text-zinc-400">{label}</div>
    </div>
  );
}

function IconBtn({
  title, onClick, children,
}: { title: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="inline-grid h-8 w-8 place-items-center rounded-md border border-black/15 dark:border-white/15 text-zinc-700 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
    >
      {children}
    </button>
  );
}
