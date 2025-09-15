import * as React from "react";
import type { Campaign } from "../../types/email";
import { Badge } from "../Common/Badge";
import { fmtMoney } from "../../utils/format";
import { IconDuplicate, IconEdit, IconClock, IconMore } from "../marketing/emailIcon";

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
  onSchedule,
  onMore,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-200/60 dark:border-white/10 bg-white/90 dark:bg-white/5 px-4 py-3 md:px-5 md:py-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-[260px]">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-[15px] text-zinc-900 dark:text-zinc-100">
              {data.title}
            </h3>
            <Badge color="sky">{data.status}</Badge>
            {data.tags.map((t) => (
              <Badge key={t} color="indigo">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-1.5 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            <div>
              Template: <span className="opacity-80">{data.template}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5">
              <span>Recipients: {data.recipients.toLocaleString()}</span>
              {data.scheduledAt && (
                <span>
                  Scheduled:{" "}
                  {new Date(data.scheduledAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
              {data.lastActivity && <span>Last Activity: {data.lastActivity}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-6 text-sm grow">
          <Metric label="Sent" value={data.sent.toLocaleString()} />
          <Metric
            label={`Opened (${data.openRate}%)`}
            value={data.opened.toLocaleString()}
          />
          <Metric
            label={`Clicked (${data.clickRate}%)`}
            value={data.clicked.toLocaleString()}
          />
          <div className="xl:col-start-5">
            <div className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Est. Revenue
            </div>
            <div className="font-medium text-emerald-500">
              {fmtMoney(data.estRevenue)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <IconButton title="Duplicate" onClick={() => onDuplicate?.(data)}>
            <IconDuplicate className="h-4 w-4" />
          </IconButton>
          <IconButton title="Edit" onClick={() => onEdit?.(data)}>
            <IconEdit className="h-4 w-4" />
          </IconButton>
          <IconButton title="Schedule" onClick={() => onSchedule?.(data)}>
            <IconClock className="h-4 w-4" />
          </IconButton>
          <IconButton title="More" onClick={() => onMore?.(data)}>
            <IconMore className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
      <div className="font-medium text-zinc-900 dark:text-zinc-100">{value}</div>
    </div>
  );
}

function IconButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md p-1.5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    >
      {children}
    </button>
  );
}
