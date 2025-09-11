import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";

type BaseProps = {
    title: string;
    className?: string;
    headerRight?: React.ReactNode;
    children?: React.ReactNode;
};

export function ChartCard({ title, className, headerRight, children }: BaseProps) {
    return (
        <div
            className={[
                "rounded-2xl border border-white/5 bg-[#1a1a1a]/80 p-4 md:p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]",
                "backdrop-blur",
                className || "",
            ].join(" ")}
        >
            <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-white">{title}</div>
                <div className="flex items-center gap-3 text-xs text-white/70">{headerRight}</div>
            </div>

            <div className="h-[260px] md:h-[300px]">{children}</div>
        </div>
    );
}

export type LineSeries = {
  dataKey: string;
  name: string;
  color?: string;
};

export type LineChartCardProps = {
  title: string;
  data: Array<Record<string, number | string>>;
  xKey: string;
  series: LineSeries[];
  headerRight?: React.ReactNode;
  className?: string;

  yDomain?: [number | "auto", number | "auto"];
  yTicks?: number[];
  yTickFormatter?: (v: number) => string;
};

export function LineChartCard({
  title,
  data,
  xKey,
  series,
  headerRight,
  className,
  yDomain,
  yTicks,
  yTickFormatter,
}: LineChartCardProps) {
  const defaultFormatter = (v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`);
  const domain = yDomain ?? [0, 30000];
  const ticks = yTicks ?? [0, 10000, 20000, 30000];

  return (
    <ChartCard title={title} headerRight={headerRight} className={className}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
            tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
            tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
            tickFormatter={yTickFormatter ?? defaultFormatter}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            domain={domain as any}
            ticks={ticks}
          />
          <Tooltip
            contentStyle={{
              background: "#1f1f1f",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              color: "#fff",
            }}
          />
          {series.map((s, i) => (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              name={s.name}
              stroke={s.color ?? LINE_COLORS[i % LINE_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export type BarChartCardProps = {
    title: string;
    data: Array<Record<string, number | string>>;
    xKey: string;
    bars: { dataKey: string; name?: string }[];
    headerRight?: React.ReactNode;
    className?: string;
};

export function BarChartCard({
    title,
    data,
    xKey,
    bars,
    headerRight,
    className,
}: BarChartCardProps) {
    return (
        <ChartCard title={title} headerRight={headerRight} className={className}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 8, right: 12, left: -10, bottom: 0 }}
                    barCategoryGap="26%"
                    barGap={8}
                >
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <XAxis
                        dataKey={xKey}
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    />
                    <YAxis
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
                        domain={[0, 30000]}
                        ticks={[0, 10000, 20000, 30000]}
                    />

                    <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.04)" }}
                        contentStyle={{
                            background: "#1f1f1f",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 10,
                            color: "#fff",
                        }}
                        labelStyle={{ color: "#fff" }}
                        itemStyle={{ color: "#fff" }}
                        formatter={(v: number) => v.toLocaleString()}
                    />

                    {bars.map((b, i) => (
                        <Bar
                            key={b.dataKey}
                            dataKey={b.dataKey}
                            name={b.name}
                            radius={[10, 10, 0, 0]}
                            barSize={20}
                            fill={BAR_COLORS[i % BAR_COLORS.length]}
                            isAnimationActive={false}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}


export type DonutChartCardProps = {
    title: string;
    data: { name: string; value: number }[];
    headerRight?: React.ReactNode;
    className?: string;
};

export function DonutChartCard({
    title,
    data,
    headerRight,
    className,
}: DonutChartCardProps) {
    const total = data.reduce((acc, d) => acc + d.value, 0);

    return (
        <ChartCard title={title} headerRight={headerRight} className={className}>
            <div className="h-full flex items-center gap-6 md:gap-10 text-helectiva">
                <div className="h-[150px] w-[150px] md:h-[170px] md:w-[170px]">
                    <ResponsiveContainer>
                        <PieChart>
                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                                contentStyle={{
                                    background: "#1f1f1f",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: 10,
                                    color: "#fff",
                                }}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                formatter={(v: number, _n: string, e: any) => [`${v}%`, e?.name ?? ""]}
                                labelStyle={{ color: "#fff" }}
                                itemStyle={{ color: "#fff" }}
                            />
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                startAngle={90}
                                endAngle={-270}
                                innerRadius="58%"
                                outerRadius="100%"
                                paddingAngle={2}
                                cornerRadius={7}
                                stroke="#1a1a1a"
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

                <ul className="flex-1 space-y-3">
                    {data.map((d, i) => {
                        const pct = total ? (d.value / total) * 100 : 0;
                        return (
                            <li key={d.name} className="flex items-center justify-between text-1xl">
                                <span className="flex items-center gap-2">
                                    <span
                                        className="inline-block h-2.5 w-2.5 rounded-full"
                                        style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }}
                                    />
                                    <span className="text-white/90">{d.name}</span>
                                </span>
                                <span className="tabular-nums text-white/80">{pct.toFixed(1)}%</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </ChartCard>
    );
}



export type ListMeterRow = {
    label: string;
    series: number[];
};

export type ListMeterCardProps = {
    title: string;
    rows: ListMeterRow[];
    headerRight?: React.ReactNode;
    className?: string;
    maxSegments?: number;
};

export function ListMeterCard({
    title,
    rows,
    headerRight,
    className,
    maxSegments = 4,
}: ListMeterCardProps) {
    return (
        <ChartCard title={title} headerRight={headerRight} className={className}>
            <div className="h-full">
                <ul className="space-y-5">
                    {rows.map((row) => (
                        <li key={row.label} className="flex items-center justify-between">
                            <span className="text-sm text-white/90">{row.label}</span>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: Math.max(maxSegments, row.series.length) }).map((_, i) => {
                                    const v = row.series[i] ?? 0;
                                    return (
                                        <span
                                            key={i}
                                            className="block h-1.5 w-6 rounded-full"
                                            style={{ background: `rgba(255,255,255,${0.2 + v * 0.35})` }}
                                        />
                                    );
                                })}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </ChartCard>
    );
}

export type DeviceBarChartCardProps = {
    title: string;
    data: { name: string; value: number }[];
    className?: string;
};

export function DeviceBarChartCard({
    title,
    data,
    className,
}: DeviceBarChartCardProps) {
    return (
        <ChartCard title={title} className={className}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 8, right: 12, left: -10, bottom: 0 }}
                    barCategoryGap="30%"
                >
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    />
                    <YAxis
                        tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickFormatter={(v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`)}
                        domain={[0, 30000]}
                        ticks={[0, 10000, 20000, 30000]}
                    />

                    <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.04)" }}
                        contentStyle={{
                            background: "#1f1f1f",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 10,
                            color: "#fff",
                        }}
                        labelStyle={{ color: "#fff" }}
                        itemStyle={{ color: "#fff" }}
                        formatter={(v: number) => [v.toLocaleString(), "Users"] as [React.ReactNode, React.ReactNode]}
                    />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={28}>
                        {data.map((_, i) => (
                            <Cell key={i} fill={DEVICE_COLORS[i % DEVICE_COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}

const LINE_COLORS = ["#7AA2FF", "#B59AFF", "#7CF7C7", "#FFD580"];
const BAR_COLORS = [
    "rgba(122,162,255,0.9)",
    "rgba(183,151,255,0.9)",
    "rgba(124,247,199,0.9)",
];
const DONUT_COLORS = ["#7AA2FF", "#7CF7C7", "#B59AFF", "#FFD580"];
const DEVICE_COLORS = ["#8FB6FF", "#78F0CF", "#C3A5FF", "#8CE07F", "#8FB6FF", "#78F0CF"];
