import Card from "../UI/card";
import RatingStars from "./RatingStar";

type Props =
  | { type: "avg"; value: number }
  | { type: "total"; value: number }
  | { type: "pending"; value: number }
  | { type: "rate"; value: number };

/** Stat card untuk halaman Reviews (tanpa tema & tanpa skeleton) */
export default function ReviewStatCard(props: Props) {
  // Kelas dasar kartu: solid + border tipis agar kontras seperti mock
  const base =
    "rounded-2xl border border-white/10 bg-[#0f1115] p-4 sm:p-5";

  // Sudut kanan atas: indikator kecil (opsional, purely visual)
  const Corner = () => (
    <div className="ml-auto">
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-zinc-400"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
          <path
            d="M5 15l5-5 4 4 5-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );

  if (props.type === "avg") {
    return (
      <Card className={base} title="" value="">
        <div className="flex items-start">
          <div className="text-xs text-zinc-400">Average Rating</div>
          <Corner />
        </div>

        <div className="mt-1 flex items-center gap-2">
          <div className="text-xl font-semibold text-white">
            {props.value.toFixed(1)}
          </div>
          <RatingStars value={props.value} />
        </div>

        <div className="mt-1 text-[11px] text-emerald-400">+0.2 ↑</div>
      </Card>
    );
  }

  if (props.type === "total") {
    return (
      <Card className={base} title="" value="">
        <div className="flex items-start">
          <div className="text-xs text-zinc-400">Total Reviews</div>
          <Corner />
        </div>

        <div className="mt-1 text-xl font-semibold text-white">
          {props.value.toLocaleString()}
        </div>

        <div className="mt-1 text-[11px] text-emerald-400">+12.3% MoM</div>
      </Card>
    );
  }

  if (props.type === "pending") {
    return (
      <Card className={base} title="" value="">
        <div className="flex items-start">
          <div className="text-xs text-zinc-400">Pending Responses</div>
          <Corner />
        </div>

        <div className="mt-1 text-xl font-semibold text-white">
          {props.value}
        </div>

        <div className="mt-1 text-[11px] text-amber-400">
          Average Response in 1.4h
        </div>
      </Card>
    );
  }

  // type === "rate"
  return (
    <Card className={base} title="" value="">
      <div className="flex items-start">
        <div className="text-xs text-zinc-400">Response Rate</div>
        <Corner />
      </div>

      <div className="mt-1 text-xl font-semibold text-white">
        {props.value}%
      </div>

      <div className="mt-1 text-[11px] text-emerald-400">↑ +2%</div>
    </Card>
  );
}
