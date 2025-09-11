import React, { useState } from "react";
import Card from "../../components/UI/card";
import {
  LineChartCard,
  DonutChartCard,
  ListMeterCard,
} from "../../components/Charts/ChartCard";
import { DeviceBarChartCard } from "../../components/Charts/ChartCard";

export default function Dashboard(): React.ReactElement {
  const lineData = [
    { month: "Jan", thisYear: 12000, lastYear: 8000 },
    { month: "Feb", thisYear: 11000, lastYear: 9000 },
    { month: "Mar", thisYear: 15000, lastYear: 12000 },
    { month: "Apr", thisYear: 9000, lastYear: 13000 },
    { month: "May", thisYear: 17000, lastYear: 14000 },
    { month: "Jun", thisYear: 16000, lastYear: 20000 },
    { month: "Jul", thisYear: 18500, lastYear: 23000 },
    { month: "Aug", thisYear: 19000, lastYear: 25000 },
    { month: "Sep", thisYear: 18000, lastYear: 27000 },
    { month: "Oct", thisYear: 20000, lastYear: 25000 },
    { month: "Nov", thisYear: 25000, lastYear: 20000 },
    { month: "Dec", thisYear: 28000, lastYear: 17000 },
  ];

  const lineDataProjects = [
    { month: "Jan", thisYear: 32, lastYear: 21 },
    { month: "Feb", thisYear: 40, lastYear: 25 },
    { month: "Mar", thisYear: 46, lastYear: 29 },
    { month: "Apr", thisYear: 30, lastYear: 33 },
    { month: "May", thisYear: 55, lastYear: 37 },
    { month: "Jun", thisYear: 61, lastYear: 44 },
    { month: "Jul", thisYear: 70, lastYear: 48 },
    { month: "Aug", thisYear: 75, lastYear: 51 },
    { month: "Sep", thisYear: 72, lastYear: 56 },
    { month: "Oct", thisYear: 78, lastYear: 60 },
    { month: "Nov", thisYear: 90, lastYear: 64 },
    { month: "Dec", thisYear: 95, lastYear: 68 },
  ];

  const lineDataOps = [
    { month: "Jan", thisYear: 99.5,  lastYear: 98.9 },
    { month: "Feb", thisYear: 99.7,  lastYear: 99.1 },
    { month: "Mar", thisYear: 99.8,  lastYear: 99.2 },
    { month: "Apr", thisYear: 99.6,  lastYear: 99.0 },
    { month: "May", thisYear: 99.9,  lastYear: 99.3 },
    { month: "Jun", thisYear: 99.95, lastYear: 99.4 },
    { month: "Jul", thisYear: 99.93, lastYear: 99.45 },
    { month: "Aug", thisYear: 99.97, lastYear: 99.5 },
    { month: "Sep", thisYear: 99.92, lastYear: 99.55 },
    { month: "Oct", thisYear: 99.98, lastYear: 99.6 },
    { month: "Nov", thisYear: 99.99, lastYear: 99.65 },
    { month: "Dec", thisYear: 99.97, lastYear: 99.7 },
  ];

  type MetricKey = "users" | "projects" | "ops";
  const [metric, setMetric] = useState<MetricKey>("users");

  const METRICS: Record<
    MetricKey,
    {
      title: string;
      data: Array<{ month: string; thisYear: number; lastYear: number }>;
      series: { dataKey: "thisYear" | "lastYear"; name: string; color?: string }[];
      legend: { label: string; color: string }[];
      yDomain: [number | "auto", number | "auto"];
      yTicks?: number[];
      yTickFormatter?: (v: number) => string;
    }
  > = {
    users: {
      title: "Total Users",
      data: lineData,
      series: [
        { dataKey: "thisYear", name: "This year", color: "#7AA2FF" },
        { dataKey: "lastYear", name: "Last year", color: "#B59AFF" },
      ],
      legend: [
        { label: "This year", color: "#7AA2FF" },
        { label: "Last year", color: "#B59AFF" },
      ],
      yDomain: [0, 30000],
      yTicks: [0, 10000, 20000, 30000],
      yTickFormatter: (v: number) => (v >= 1000 ? `${v / 1000}K` : `${v}`),
    },
    projects: {
      title: "Total Projects",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: lineDataProjects as any,
      series: [
        { dataKey: "thisYear", name: "This year", color: "#7AA2FF" },
        { dataKey: "lastYear", name: "Last year", color: "#B59AFF" },
      ],
      legend: [
        { label: "This year", color: "#7AA2FF" },
        { label: "Last year", color: "#B59AFF" },
      ],
      yDomain: [0, "auto"],
      yTicks: undefined,
      yTickFormatter: (v: number) => `${v}`,
    },
    ops: {
      title: "Operating Status",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: lineDataOps as any,
      series: [
        { dataKey: "thisYear", name: "This year", color: "#7CF7C7" },
        { dataKey: "lastYear", name: "Last year", color: "#B59AFF" },
      ],
      legend: [
        { label: "This year", color: "#7CF7C7" },
        { label: "Last year", color: "#B59AFF" },
      ],
      yDomain: [98.5, 100],
      yTicks: [98.5, 99, 99.5, 100],
      yTickFormatter: (v: number) => `${v.toFixed(2)}%`,
    },
  };

  const current = METRICS[metric];

  const deviceBars = [
    { name: "Linux", value: 14000 },
    { name: "Mac", value: 20000 },
    { name: "iOS", value: 21000 },
    { name: "Windows", value: 30000 },
    { name: "Android", value: 12000 },
    { name: "Other", value: 25000 },
  ];

  const locationData = [
    { name: "United States", value: 52.1 },
    { name: "Canada", value: 22.8 },
    { name: "Mexico", value: 13.9 },
    { name: "Other", value: 11.2 },
  ];

  const websiteRows = [
    { label: "Google",    series: [0.25, 0.28, 0.30, 0.32] },
    { label: "YouTube",   series: [0.85, 0.62, 0.48, 0.42] },
    { label: "Instagram", series: [0.30, 0.35, 0.33, 0.36] },
    { label: "Pinterest", series: [0.88, 0.70, 0.56, 0.50] },
    { label: "Facebook",  series: [0.24, 0.28, 0.30, 0.32] },
    { label: "Twitter",   series: [0.80, 0.55, 0.40, 0.38] },
  ];

  const marketingBars = [
    { name: "Jan", value: 12000 },
    { name: "Feb", value: 30000 },
    { name: "Mar", value: 21000 },
    { name: "Apr", value: 28000 },
    { name: "May", value: 11000 },
    { name: "Jun", value: 26000 },
    { name: "Jul", value: 15000 },
    { name: "Aug", value: 30000 },
    { name: "Sep", value: 20000 },
    { name: "Oct", value: 27000 },
    { name: "Nov", value: 12000 },
    { name: "Dec", value: 27000 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 font-helectiva">
        <Card title="Views"       value="7,265" delta="11.01%" positive variant="primary" />
        <Card title="Visits"      value="3,671" delta="-0.03%" positive={false} />
        <Card title="New Users "  value="256"   delta="15.03%" positive variant="primary" />
        <Card title="Active Users" value="2,318" delta="6.08%" positive />
      </div>

      <div className="grid gap-4 md:gap-2 xl:grid-cols-3 font-helectiva">
        <LineChartCard
          className="xl:col-span-2"
          title={current.title}
          data={current.data}
          xKey="month"
          series={current.series}
          yDomain={current.yDomain}
          yTicks={current.yTicks}
          yTickFormatter={current.yTickFormatter}
          headerRight={
            <div className="flex items-center gap-4">
              <div className="flex rounded-md bg-white/5 p-1">
                {([
                  { key: "users", label: "Total Users" },
                  { key: "projects", label: "Total Projects" },
                  { key: "ops", label: "Operating Status" },
                ] as { key: MetricKey; label: string }[]).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setMetric(key)}
                    className={[
                      "px-3 py-1.5 rounded-md text-xs",
                      metric === key
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-4 font-helectiva">
                {current.legend.map((l) => (
                  <div key={l.label} className="flex items-center gap-2">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: l.color }}
                    />
                    <span className="text-white/70">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <ListMeterCard title="Traffic by Website" rows={websiteRows} />
      </div>

      <div className="grid gap-4 md:gap-2 xl:grid-cols-2 font-helectiva">
        <DeviceBarChartCard
          className="xl:col-span-1"
          title="Traffic by Device"
          data={deviceBars}
        />

        <DonutChartCard title="Traffic by Location" data={locationData} />

        <DeviceBarChartCard
          className="xl:col-span-3 font-helectiva"
          title="Marketing & SEO "
          data={marketingBars}
        />
      </div>
    </div>
  );
}
