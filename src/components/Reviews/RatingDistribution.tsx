import Card from "../UI/card";
import RatingStars from "../../components/Reviews/RatingStar";
import type { RatingDistribution } from "../../types/review";

export default function RatingDistribution({ data }: { data: RatingDistribution }) {
  const total = (data[1] + data[2] + data[3] + data[4] + data[5]) || 1;
  const rows = [5, 4, 3, 2, 1] as const;

  return (
    <Card
      className="rounded-2xl border border-white/10 bg-[#0f1115] p-4 sm:p-5"
      title=""
      value=""
    >
      <div className="text-sm font-medium text-zinc-300 mb-3">
        Rating Distribution
      </div>
      <div className="space-y-3">
        {rows.map((star) => {
          const count = data[star];
          const pct = Math.round((count / total) * 100);

          return (
            <div key={star} className="flex items-center gap-2">
              {/* label bintang */}
              <div className="w-12 shrink-0 text-xs text-zinc-300 flex items-center gap-1">
                <RatingStars value={star} size={12} />
              </div>

              {/* progress bar */}
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-yellow-400"
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* persentase */}
              <div className="w-10 text-right text-xs text-zinc-400">
                {pct}%
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
