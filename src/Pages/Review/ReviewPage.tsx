/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReviewStatCard from "../../components/Reviews/ReviewStatCrads";
import RatingDistribution from "../../components/Reviews/RatingDistribution";
import ReviewCard from "../../components/Reviews/ReviewCrads";
import RespondModal from "../../components/Reviews/RespondModal";
import { reviewStats, ratingDistribution, reviewsSeed } from "../../types/reviewSeeds";
import type { Review } from "../../types/review";
import Button from "../../components/UI/button";

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function ReviewPage() {
  const [q, setQ] = React.useState("");
  const [rating, setRating] = React.useState<number | "all">("all");
  const [status, setStatus] = React.useState<"all" | "Pending" | "Responded">("all");
  const [sortBy, setSortBy] = React.useState<"newest" | "oldest" | "highest" | "lowest">("newest");
  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const [respondOpen, setRespondOpen] = React.useState(false);
  const [active, setActive] = React.useState<Review | null>(null);

  const dq = useDebounced(q, 300);

  const filtered = React.useMemo(() => {
    let arr = reviewsSeed.slice();
    if (dq.trim()) {
      const t = dq.toLowerCase();
      arr = arr.filter(
        (r) =>
          r.guestName.toLowerCase().includes(t) ||
          r.title.toLowerCase().includes(t) ||
          r.body.toLowerCase().includes(t)
      );
    }
    if (rating !== "all") arr = arr.filter((r) => r.rating >= rating);
    if (status !== "all") arr = arr.filter((r) => r.status === status);
    switch (sortBy) {
      case "oldest":
        arr.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
        break;
      case "highest":
        arr.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        arr.sort((a, b) => a.rating - b.rating);
        break;
      default:
        arr.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return arr;
  }, [dq, rating, status, sortBy]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const data = filtered.slice(start, end);

  React.useEffect(() => setPage(1), [dq, rating, status, sortBy]);

  const handleRespond = (rvw: Review) => {
    setActive(rvw);
    setRespondOpen(true);
  };

  const handleSend = (message: string) => {
    console.log("Send response to", active?.id, message);
    setRespondOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-white">Guest Reviews</h1>
        <p className="text-sm text-zinc-400">Monitor and respond to guest feedback.</p>
      </div>

      {/* Top metrics (4 kolom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ReviewStatCard type="avg" value={reviewStats.avgRating} />
        <ReviewStatCard type="total" value={reviewStats.totalReviews} />
        <ReviewStatCard type="pending" value={reviewStats.pendingResponses} />
        <ReviewStatCard type="rate" value={reviewStats.responseRate} />
      </div>

      {/* Content grid: kiri 320px (distribution), kanan fleksibel (list) */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-6 items-start">
        {/* Left: distribution */}
        <div>
          <RatingDistribution data={ratingDistribution} />
        </div>

        {/* Right: toolbar + list */}
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="rounded-2xl border border-white/10 bg-[#0f1115] p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-2">
              {/* search */}
              <label className="relative flex-1 min-w-[220px]">
                <span className="absolute left-3 top-2.5 text-zinc-400" aria-hidden>🔎</span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search Reviews"
                  aria-label="Search Reviews"
                  className="w-full rounded-xl bg-transparent border border-white/10 p-2.5 pl-9 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </label>

              {/* rating */}
              <select
                value={String(rating)}
                onChange={(e) => setRating(e.target.value === "all" ? "all" : Number(e.target.value))}
                className="rounded-xl bg-[#14161b] border border-white/10 p-2.5 text-sm text-zinc-300"
              >
                <option value="all">All Rating</option>
                <option value="5">5★ and up</option>
                <option value="4">4★ and up</option>
                <option value="3">3★ and up</option>
                <option value="2">2★ and up</option>
                <option value="1">1★ and up</option>
              </select>

              {/* status */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="rounded-xl bg-[#14161b] border border-white/10 p-2.5 text-sm text-zinc-300"
              >
                <option value="all">All Status</option>
                <option value="Responded">Responded</option>
                <option value="Pending">Pending</option>
              </select>

              {/* sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-xl bg-[#14161b] border border-white/10 p-2.5 text-sm text-zinc-300"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>

              <Button size="sm" variant="secondary">Send Review Request</Button>
            </div>
          </div>

          {/* list */}
          <div className="space-y-3">
            {data.map((rvw) => (
              <ReviewCard
                key={rvw.id}
                item={rvw}
                onRespond={handleRespond}
                onView={() => console.log("view", rvw.id)}
              />
            ))}
          </div>

          {/* pagination */}
          <div className="flex items-center justify-between gap-2 pt-2 text-sm text-zinc-400">
            <div>
              Showing <span className="text-white">{Math.min(end, total)}</span> of {total}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </Button>
              <div className="px-2">
                Page <span className="text-white">{page}</span> / {totalPages}
              </div>
              <Button
                variant="ghost"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RespondModal open={respondOpen} onClose={() => setRespondOpen(false)} onSend={handleSend} />
    </div>
  );
}
