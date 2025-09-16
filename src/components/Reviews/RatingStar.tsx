type Props = {
    value: number;
    size?: number; 
    className?: string;
};


export default function RatingStars({ value, size = 14, className = "" }: Props) {
    const full = Math.floor(value);
    const hasHalf = value - full >= 0.5;
    const items = Array.from({ length: 5 });
    return (
        <div className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5`}>
            {items.map((_, i) => {
                const idx = i + 1;
                const type = idx <= full ? "full" : hasHalf && idx === full + 1 ? "half" : "empty";
                return <Star key={i} type={type} size={size} />;
            })}
        </div>
    );
}


function Star({ type, size }: { type: "full" | "half" | "empty"; size: number }) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        className: type === "empty" ? "text-zinc-400/40" : "text-yellow-400",
    } as const;
    if (type === "half") {
        return (
            <svg {...common} fill="currentColor" aria-hidden>
                <defs>
                    <linearGradient id="half" x1="0" x2="1">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" fill="url(#half)" stroke="currentColor" strokeWidth="1" />
            </svg>
        );
    }
    return (
        <svg {...common} fill={type === "full" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" aria-hidden>
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
}