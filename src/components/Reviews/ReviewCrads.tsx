import Card from "../UI/card";
import Button from "../UI/button";
import Badge from "../UI/Badge";
import RatingStars from "../../components/Reviews/RatingStar";
import type { Review } from "../../types/review";
import { fmtDate } from "../../utils/format";

export default function ReviewCard({
    item,
    onRespond,
    onView,
}: {
    item: Review;
    onRespond: (review: Review) => void;
    onView: (review: Review) => void;
}) {
    const base =
        "rounded-2xl border border-white/10 bg-[#0f1115] p-4 sm:p-5 hover:border-white/20 transition";

    return (
        <Card className={base} title="" value="">
            <div className="flex items-start gap-3">
                {/* Avatar inisial */}
                <div className="h-9 w-9 shrink-0 rounded-full bg-white/10 grid place-items-center text-sm text-white/90">
                    {item.guestName?.charAt(0)?.toUpperCase() || "M"}
                </div>

                <div className="flex-1 min-w-0">
                    {/* Header: nama, tanggal, room, badges */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="font-medium text-white truncate">{item.guestName}</div>

                        <div className="text-[11px] text-zinc-400">
                            {fmtDate(item.createdAt)}
                        </div>

                        {item.roomName && (
                            <div className="text-[11px] text-zinc-400">• {item.roomName}</div>
                        )}

                        <Badge variant="success" className="ml-auto">
                            {item.source}
                        </Badge>

                        <Badge
                            variant={item.status === "Responded" ? "success" : "warning"}
                        >
                            {item.status}
                        </Badge>
                    </div>

                    {/* Stars */}
                    <div className="mt-1 flex items-center gap-2">
                        <RatingStars value={item.rating} />
                    </div>

                    {/* Title + body */}
                    <div className="mt-3 text-[15px] font-medium text-zinc-100">
                        {item.title}
                    </div>
                    <p className="mt-1 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                        {item.body}
                    </p>

                    {/* Helpful */}
                    <div className="mt-2 text-[11px] text-zinc-500">
                        {item.helpfulCount} found helpful
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => onRespond(item)}
                            className="px-3 py-1.5 text-sm"
                        >
                            Respond
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => onView(item)}
                            className="px-3 py-1.5 text-sm"
                        >
                            View Full
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
