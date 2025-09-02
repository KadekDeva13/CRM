import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from "recharts";

const dummyData = [
  { name: "Jan", sales: 420, target: 400 },
  { name: "Feb", sales: 380, target: 400 },
  { name: "Mar", sales: 460, target: 420 },
  { name: "Apr", sales: 500, target: 450 },
  { name: "May", sales: 470, target: 470 },
  { name: "Jun", sales: 520, target: 480 },
  { name: "Jul", sales: 610, target: 500 },
  { name: "Aug", sales: 650, target: 630 },
  { name: "Sep", sales: 700, target: 680 },
];

export default function SalesLineChart({ data = dummyData, height = 280, className = "" }) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
