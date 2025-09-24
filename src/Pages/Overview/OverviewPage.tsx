import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/UI/card";
import {
  LineChartCard,
  DonutChartCard,
  BarChartCard,
} from "../../components/Charts/ChartCard";

export default function Dashboard(): React.ReactElement {
  const lineData = [
    { month: "2025", thisYear: 12000, lastYear: 8000 },
    { month: "2026", thisYear: 11000, lastYear: 9000 },
    { month: "2027", thisYear: 15000, lastYear: 12000 },
    { month: "2028", thisYear: 9000, lastYear: 13000 },
    { month: "2029", thisYear: 17000, lastYear: 14000 },
    { month: "2030", thisYear: 16000, lastYear: 20000 },
    { month: "2031", thisYear: 18500, lastYear: 23000 },
  ];

  type MetricKey = "users";
  const [metric] = useState<MetricKey>("users");

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
      title: "CAMPAIGN ROOM REVENUE",
      data: lineData,
      series: [
        { dataKey: "thisYear", name: "This year", color: "#1F2937" },
        { dataKey: "lastYear", name: "Last year", color: "#1F2937" },
      ],
      legend: [
        { label: "This year", color: "#1F2937" },
        { label: "Last year", color: "#1F2937" },
      ],
      yDomain: [0, 30000],
      yTicks: [0, 10000, 20000, 30000],
      yTickFormatter: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K` : `${v}`),
    },
  };

  const current = METRICS[metric];

  const deviceBars = [
    { name: "2025", value: 18000 },
    { name: "2026", value: 30000 },
    { name: "2027", value: 22000 },
    { name: "2028", value: 34000 },
    { name: "2029", value: 10000 },
    { name: "2030", value: 21000 },
  ];

  const campaignData = [
    { name: "Valentine 2025", value: 220 },
    { name: "Mindimedia Anniversary", value: 300 },
    { name: "Back To Holiday", value: 192 },
    { name: "Quirez Grand Openig", value: 1026 },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div>
        <h1 className="text-2xl font-semibold text-[#000000]">Welcome to Quirez CRM</h1>
        <h2 className="text-xs text-[#000000]">Your premium hospitality management platform</h2>
      </div>

      <div className="grid gap-4 md:gap-6 xl:grid-cols-4 font-helectiva">
        <LineChartCard
          className="xl:col-span-3"
          variant="light"
          height={300}
          title={
            <div className="flex items-start gap-3">
              <div>
                <div className="text-[15px] md:text-[16px] font-semibold text-[#0B0A0A]">
                  CAMPAIGN ROOM REVENUE
                </div>
                <div className="text-[18px] md:text-[20px] font-semibold text-[#0AB19B]">
                  $513.717
                </div>
              </div>
            </div>
          }
          headerRight={
            <button className="px-3 py-1.5 rounded-md bg-[#2B2B2B] text-white hover:bg-white hover:text-black text-[11px] md:text-xs shadow-sm">
              VIEW REPORT
            </button>
          }
          data={current.data}
          xKey="month"
          series={current.series}
          yDomain={[0, 30000]}
          yTicks={[0, 10000, 20000, 30000]}
          yTickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K` : `${v}`)}
        />

        <div className="flex flex-col gap-4 xl:col-span-1">
          <Card
            title="PROFILES (RAW)"
            subtitle="Total Clean Profiles"
            value={155.234}
            variant="stat"
            className="bg-[#ffffff] text-[#0B0A0A] rounded-2xl border border-black/10 shadow-sm"
          />
          <Card
            title="CLEAN PROFILES"
            subtitle="Total Clean Profiles"
            value={146.333}
            variant="stat"
            className="bg-[#ffffff] text-[#0B0A0A] rounded-2xl border border-black/10 shadow-sm"
          />
          <Card
            title="NO- EMAIL PROFILES"
            subtitle="Total Profile With no Emails"
            value={78.476}
            variant="stat"
            className="bg-[#ffffff] text-[#0B0A0A] rounded-2xl border border-black/10 shadow-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 xl:grid-cols-2 font-helectiva">
        <DonutChartCard
          variant="light"
          height={300}
          title={
            <div className="text-[15px] md:text-[16px] font-semibold text-[#0B0A0A]">
              ONE-TIME CAMPAIGN REVENUE
            </div>
          }
          data={campaignData}
        />

        <BarChartCard
          className="xl:col-span-1"
          variant="light"
          height={300}
          title={
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col">
                <div className="text-[15px] md:text-[16px] font-semibold text-[#0B0A0A]">
                  LIFETIME REVENUE
                </div>
                <div className="text-[11px] text-[#0B0A0A]/70 -mt-0.5">
                  Total With Quirez
                </div>
                <div className="text-[16px] md:text-[18px] font-semibold text-[#0AB19B]">
                  $1.513.717
                </div>
              </div>
              <button
                className="ml-72 px-3 py-1.5 rounded-md bg-[#2B2B2B] text-white hover:bg-white hover:text-black text-[11px] md:text-xs shadow-sm">
                VIEW REPORT
              </button>
            </div>
          }
          data={deviceBars}
          xKey="name"
          bars={[
            {
              dataKey: "value",
              name: "Revenue",
              color: "#0F5A62",
              barRadius: [10, 10, 0, 0],
              barSize: 28,
            },
          ]}
          yDomain={[0, 30000]}
          yTicks={[0, 10000, 20000, 30000]}
          yTickFormatter={(v) =>
            v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K` : `${v}`
          }
        />

      </div>
    </motion.div>
  );
}
