import * as React from "react";
import { IconEdit, IconTrash } from "../../components/Campaign/TemplateIcon";

export type TemplateStatus = "Active" | "Draft";
export type CampaignTemplate = {
    id: string;
    title: string;
    description: string;
    status: TemplateStatus;
    usedCount: number;
    thumbUrl?: string;
    bg?: string;
};

type Props = {
    item: CampaignTemplate;
    onOpen?: (t: CampaignTemplate) => void;
    onEdit?: (t: CampaignTemplate) => void;
    onDuplicate?: (t: CampaignTemplate) => void;
    onDelete?: (t: CampaignTemplate) => void;
};

export default function TemplateCard({ item, onOpen, onEdit, onDelete }: Props) {
    const statusSolid =
        item.status === "Active"
            ? "bg-[#0F5A62] text-white"
            : "bg-[#A66C20C7] text-white";

    return (
        <div
            className="
        group relative flex h-[569px] w-full max-w-[363px] flex-col overflow-hidden
        rounded-[12px] border border-[#E5E7EB] bg-white
      "
        >
            <button
                type="button"
                onClick={() => onOpen?.(item)}
                className="relative block h-[383px] w-full"
                aria-label={`Open template ${item.title}`}
            >
                <div className="relative h-full w-full overflow-hidden">
                    {item.thumbUrl ? (
                        <img
                            src={item.thumbUrl}
                            alt={item.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className={`h-full w-full ${item.bg || "bg-zinc-200"}`} />
                    )}
                </div>
            </button>

            <div className="flex min-h-0 flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-[#111827]">
                        {item.title}
                    </h3>

                    <span
                        className={`inline-flex h-[25px] w-[62px] items-center justify-center
              rounded-full text-[11px] font-medium whitespace-nowrap ${statusSolid}`}
                    >
                        {item.status}
                    </span>

                </div>

                <p className="mt-1 line-clamp-3 text-sm leading-6 text-[#6B7280]">
                    {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-xs text-[#6B7280]">
                        Used : {item.usedCount}x
                    </span>

                    <div className="flex items-center gap-2">
                        <IconGhostButton title="Edit" onClick={() => onEdit?.(item)}>
                            <IconEdit className="h-4 w-4 text-[#9CA3AF]" />
                        </IconGhostButton>
                        <IconGhostButton title="Delete" onClick={() => onDelete?.(item)}>
                            <IconTrash className="h-4 w-4 text-[#9CA3AF]" />
                        </IconGhostButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

function IconGhostButton({
    children,
    title,
    onClick,
}: {
    children: React.ReactNode;
    title: string;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            title={title}
            onClick={onClick}
            className="
        inline-flex h-8 w-8 items-center justify-center rounded-md
        text-zinc-500 transition
        hover:bg-zinc-100 hover:text-zinc-700
        focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300
      "
        >
            {children}
        </button>
    );
}
