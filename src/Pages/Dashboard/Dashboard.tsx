import React from "react";
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
    { month: "Apr", thisYear: 9000,  lastYear: 13000 },
    { month: "May", thisYear: 17000, lastYear: 14000 },
    { month: "Jun", thisYear: 16000, lastYear: 20000 },
    { month: "Jul", thisYear: 18500, lastYear: 23000 },
  ];

  const deviceBars = [
    { name: "Linux",   value: 14000 },
    { name: "Mac",     value: 30000 },
    { name: "iOS",     value: 21000 },
    { name: "Windows", value: 34000 },
    { name: "Android", value: 12000 },
    { name: "Other",   value: 25000 },
  ];

  const locationData = [
    { name: "United States", value: 52.1 },
    { name: "Canada",        value: 22.8 },
    { name: "Mexico",        value: 13.9 },
    { name: "Other",         value: 11.2 },
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
    { name: "Apr", value: 36000 },
    { name: "May", value: 11000 },
    { name: "Jun", value: 26000 },
    { name: "Jul", value: 15000 },
    { name: "Aug", value: 36000 },
    { name: "Sep", value: 20000 },
    { name: "Oct", value: 38000 },
    { name: "Nov", value: 12000 },
    { name: "Dec", value: 27000 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <Card title="Views"       value="7,265" delta="11.01%" positive variant="primary" />
        <Card title="Visits"      value="3,671" delta="-0.03%" positive={false} />
        <Card title="New Users"   value="256"  delta="15.03%" positive variant="primary" />
        <Card title="Active Users" value="2,318" delta="6.08%" positive />
      </div>

      <div className="grid gap-4 md:gap-6 xl:grid-cols-3">
        <LineChartCard
          className="xl:col-span-2"
          title="Total Users"
          data={lineData}
          xKey="month"
          series={[
            { dataKey: "thisYear", name: "This year" },
            { dataKey: "lastYear", name: "Last year" },
          ]}
          headerRight={
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#7AA2FF" }} />
                <span className="text-white/70">This year</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#B59AFF" }} />
                <span className="text-white/70">Last year</span>
              </div>
            </div>
          }
        />
        <ListMeterCard title="Traffic by Website" rows={websiteRows} />
      </div>

      <div className="grid gap-4 md:gap-6 xl:grid-cols-3">
        <DeviceBarChartCard
          className="xl:col-span-2"
          title="Traffic by Device"
          data={deviceBars}
        />

        <DonutChartCard title="Traffic by Location" data={locationData} />

        <DeviceBarChartCard
          className="xl:col-span-3"
          title="Marketing & SEO"
          data={marketingBars}
        />
      </div>
    </div>
  );
}
