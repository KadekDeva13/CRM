import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Area,
    Cell,
} from "recharts";

type Variant = "light" | "dark";

const theme = (variant: Variant) => {
    const isDark = variant === "dark";
    return {
        cardBg: isDark ? "#0f0f10" : "#ffffff",
        cardBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        cardShadow: isDark
            ? "0 0 0 1px rgba(255,255,255,0.03) inset"
            : "0 0 0 1px rgba(0,0,0,0.03) inset",
        fgMuted: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
        fgTitle: isDark ? "#fff" : "#0B0A0A",
        axisStroke: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
        gridStroke: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        tickFill: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
        tooltipBg: isDark ? "#1f1f1f" : "#ffffff",
        tooltipBorder: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)",
        tooltipFg: isDark ? "#fff" : "#0B0A0A",
        cursorFill: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
        referenceStroke: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
    };
};

function niceK(v: number) {
    const abs = Math.abs(v);
    if (abs >= 1_000_000) return `${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 0 : 1)}M`;
    if (abs >= 1_000) return `${(v / 1_000).toFixed(v % 1_000 === 0 ? 0 : 1)}K`;
    return `${v}`;
}

type BaseProps = {
    title: React.ReactNode;
    className?: string;
    headerRight?: React.ReactNode;
    children?: React.ReactNode;
    variant?: Variant;
    height?: number;
};

export function ChartCard({
    title,
    className,
    headerRight,
    children,
    variant = "light",
    height = 300,
}: BaseProps) {
    const t = theme(variant);
    return (
        <div
            className={[
                "rounded-2xl border p-4 md:p-5",
                className || "",
            ].join(" ")}
            style={{
                background: t.cardBg,
                borderColor: t.cardBorder,
                boxShadow: t.cardShadow,
                backdropFilter: "blur(6px)",
            }}
        >
            <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold" style={{ color: t.fgTitle }}>
                    {title}
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: t.fgMuted }}>
                    {headerRight}
                </div>
            </div>

            <div className="text-black" style={{ height }}>{children}</div>
        </div>
    );
}

export type LineSeries = {
    dataKey: string;
    name: string;
    color?: string;
    strokeWidth?: number;
    dotRadius?: number;
    smooth?: boolean;
};

export type LineChartCardProps = {
    title: React.ReactNode;
    data: Array<Record<string, number | string>>;
    xKey: string;
    series: LineSeries[];
    headerRight?: React.ReactNode;
    className?: string;
    variant?: Variant;
    height?: number;

    showGrid?: boolean;
    gridHorizontalOnly?: boolean;
    showLegend?: boolean;

    yDomain?: [number | "auto", number | "auto"];
    yTicks?: number[];
    yTickFormatter?: (v: number) => string;

    xTickProps?: Partial<React.SVGProps<SVGTextElement>>;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    referenceLine?: { y: number; label?: string } | null;
};

export function LineChartCard({
    title,
    data,
    xKey,
    series,
    headerRight,
    className,
    variant = "light",
    height = 300,
    showLegend = false,
    yDomain,
    yTicks,
    yTickFormatter,
    xTickProps = { fontSize: 12 },
    margin = { top: 6, right: 12, bottom: 28, left: 12 },
    referenceLine = null,
}: LineChartCardProps) {
    const t = theme(variant);
    const defaultFormatter = yTickFormatter ?? niceK;
    const domain = (yDomain ?? [0, 30000]) as [number | "auto", number | "auto"];
    const ticks = yTicks ?? [0, 10000, 20000, 30000];
    const FILL_KEY = "ThisYear";
    const gradId = "lineAreaFadeRev";

    return (
        <ChartCard title={title} headerRight={headerRight} className={className} variant={variant} height={height}>
            <ResponsiveContainer>
                <LineChart data={data} margin={margin}>
                    <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#000" stopOpacity={0.08} />
                            <stop offset="100%" stopColor="#000" stopOpacity={0.02} />
                        </linearGradient>
                    </defs>

                    <XAxis
                        dataKey={xKey}
                        padding={{ left: 16, right: 8 }}
                        tick={{ fill: t.tickFill, fontSize: xTickProps.fontSize ?? 12, ...xTickProps, dy: 6 }}
                        axisLine={false}
                        tickMargin={10}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: t.tickFill, fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        domain={domain as any}
                        ticks={ticks}
                        tickFormatter={defaultFormatter}
                    />

                    <Tooltip
                        cursor={{ fill: t.cursorFill }}
                        contentStyle={{
                            background: t.tooltipBg,
                            border: t.tooltipBorder,
                            borderRadius: 10,
                            color: t.tooltipFg,
                            padding: "8px 10px",
                        }}
                        labelStyle={{ color: t.tooltipFg, fontWeight: 600, marginBottom: 4 }}
                        itemStyle={{ color: t.tooltipFg }}
                        formatter={(v: number) => v.toLocaleString()}
                    />

                    {showLegend && (
                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 6 }} />
                    )}

                    {referenceLine && (
                        <ReferenceLine
                            y={referenceLine.y}
                            stroke={t.referenceStroke}
                            strokeDasharray="4 4"
                            label={{ value: referenceLine.label ?? "", position: "right", fill: t.fgMuted, fontSize: 12 }}
                        />
                    )}
                    {series.some(s => s.dataKey === FILL_KEY) && (
                        <Area
                            type="monotone"
                            dataKey={FILL_KEY}
                            stroke="none"
                            fill={`url(#${gradId})`}
                            isAnimationActive={false}
                        />
                    )}

                    {series.map((s) => {
                        const isLastYear = s.dataKey === "lastYear";
                        const isThisYear = s.dataKey === FILL_KEY;

                        return (
                            <Line
                                key={s.dataKey}
                                type="monotone"
                                dataKey={s.dataKey}
                                name={s.name}
                                stroke="#0B0A0A"
                                strokeOpacity={isLastYear ? 0.6 : 1}
                                strokeWidth={1.5}
                                strokeDasharray={isLastYear ? "4 4" : undefined}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                dot={false}
                                activeDot={
                                    isThisYear
                                        ? { r: (s.dotRadius ?? 3), stroke: "#0B0A0A", fill: "#fff" }
                                        : false
                                }
                                connectNulls
                                isAnimationActive={false}
                            />
                        );
                    })}
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}



export type BarSeries = {
    dataKey: string;
    name?: string;
    color?: string;
    gradientId?: string;
    stackId?: string;
    barRadius?: number | [number, number, number, number];
    barSize?: number;
};

export type BarChartCardProps = {
    title: React.ReactNode;
    data: Array<Record<string, number | string>>;
    xKey: string;
    bars: BarSeries[];
    headerRight?: React.ReactNode;
    className?: string;
    variant?: Variant;
    height?: number;

    showGrid?: boolean;
    gridHorizontalOnly?: boolean;
    showLegend?: boolean;
    referenceLine?: { y: number; label?: string } | null;

    yDomain?: [number | "auto", number | "auto"];
    yTicks?: number[];
    yTickFormatter?: (v: number) => string;

    xTickProps?: Partial<React.SVGProps<SVGTextElement>>;
    margin?: { top?: number; right?: number; bottom?: number; left?: number };
    barCategoryGap?: string | number;
    barGap?: number;
};

const BAR_COLORS = ["#0F5A62"];

export function BarChartCard({
    title,
    data,
    xKey,
    bars,
    headerRight,
    className,
    variant = "light",
    height = 300,

    showLegend = false,
    referenceLine = null,

    yDomain,
    yTicks,
    yTickFormatter,

    xTickProps = { fontSize: 12 },
    margin = { top: 8, right: 12, bottom: 6, left: -8 },
    barCategoryGap = "22%",
    barGap = 6,
}: BarChartCardProps) {
    const t = theme(variant);
    const defaultFormatter = yTickFormatter ?? niceK;
    const domain = (yDomain ?? [0, 30000]) as [number | "auto", number | "auto"];
    const ticks = yTicks ?? [0, 10000, 20000, 30000];

    return (
        <ChartCard title={title} headerRight={headerRight} className={className} variant={variant} height={height}>
            <svg width={0} height={0}>
                <defs>
                    {bars
                        .filter((b) => b.gradientId)
                        .map((b) => (
                            <linearGradient key={b.gradientId} id={b.gradientId!} x1="0" y1="1" x2="0" y2="0">
                                <stop offset="0%" stopColor={b.color || "#60A5FA"} stopOpacity={0.25} />
                                <stop offset="100%" stopColor={b.color || "#60A5FA"} stopOpacity={1} />
                            </linearGradient>
                        ))}
                </defs>
            </svg>

            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={margin}
                    barCategoryGap={barCategoryGap}
                    barGap={barGap}
                >


                    <XAxis
                        dataKey={xKey}
                        tick={{ fill: t.tickFill, fontSize: xTickProps.fontSize ?? 12, ...xTickProps }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: t.tickFill, fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        domain={domain as any}
                        ticks={ticks}
                        tickFormatter={defaultFormatter}
                    />

                    <Tooltip
                        cursor={{ fill: t.cursorFill }}
                        contentStyle={{
                            background: t.tooltipBg,
                            border: t.tooltipBorder,
                            borderRadius: 10,
                            color: t.tooltipFg,
                            padding: "8px 10px",
                        }}
                        labelStyle={{ color: t.tooltipFg, fontWeight: 600, marginBottom: 4 }}
                        itemStyle={{ color: t.tooltipFg }}
                        formatter={(v: number) => v.toLocaleString()}
                    />

                    {showLegend && (
                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 6 }} />
                    )}

                    {referenceLine && (
                        <ReferenceLine
                            y={referenceLine.y}
                            stroke={t.referenceStroke}
                            strokeDasharray="4 4"
                            label={{
                                value: referenceLine.label ?? "",
                                position: "right",
                                fill: t.fgMuted,
                                fontSize: 12,
                            }}
                        />
                    )}

                    {bars.map((b, i) => {
                        const fill = b.gradientId ? `url(#${b.gradientId})` : b.color ?? BAR_COLORS[i % BAR_COLORS.length];
                        return (
                            <Bar
                                key={b.dataKey}
                                dataKey={b.dataKey}
                                name={b.name}
                                radius={(b.barRadius ?? [10, 10, 0, 0]) as [number, number, number, number]}
                                barSize={b.barSize ?? 20}
                                fill={fill}
                                isAnimationActive={false}
                                stackId={b.stackId}
                            />
                        );
                    })}
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

export type DonutChartCardProps = {
    title: React.ReactNode;
    data: { name: string; value: number }[];
    headerRight?: React.ReactNode;
    className?: string;
    variant?: Variant;
    height?: number;
};

const DONUT_COLORS = ["#868686", "#154374", "#518046", "#0F5A62"];

export function DonutChartCard({
    title,
    data,
    headerRight,
    className,
    variant = "light",
    height = 300,
}: DonutChartCardProps) {
    const t = theme(variant);

    return (
        <ChartCard
            title={title}
            headerRight={headerRight}
            className={className}
            variant={variant}
            height={height}
        >
            <div className="h-full w-full flex flex-col items-center justify-start gap-6 md:gap-8">
                <div className="relative" style={{ width: 250, height: 200 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Tooltip
                                cursor={{ fill: t.cursorFill }}
                                contentStyle={{
                                    background: t.tooltipBg,
                                    border: t.tooltipBorder,
                                    borderRadius: 10,
                                    color: t.tooltipFg,
                                }}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                formatter={(v: number, _n: string, e: any) => [`$${v.toLocaleString()}`, e?.name ?? ""]}
                                labelStyle={{ color: t.tooltipFg }}
                                itemStyle={{ color: t.tooltipFg }}
                            />
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                startAngle={90}
                                endAngle={-270}
                                innerRadius="40%"
                                outerRadius="100%"
                                paddingAngle={3}
                                cornerRadius={7}
                                stroke={variant === "light" ? "#ffffff" : "#1a1a1a"}
                                strokeWidth={5}
                                isAnimationActive={false}
                            >
                                {data.map((_, i) => (
                                    <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full max-w-[350px] px-2">
                    <ul className="mt-1 w-full space-y-3">
                        {data.map((d, i) => (
                            <li key={d.name} className="flex items-center justify-between">
                                <span className="flex items-center gap-2 min-w-0">
                                    <span
                                        className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                                        style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }}
                                    />
                                    <span className="text-[#0B0A0A] truncate">{d.name}</span>
                                </span>

                                <span className="tabular-nums text-[#0B0A0A] shrink-0">
                                    ${d.value.toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ChartCard>
    );
}

