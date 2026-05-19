"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const data = [
  { name: "Mon", workflows: 40 },
  { name: "Tue", workflows: 65 },
  { name: "Wed", workflows: 80 },
  { name: "Thu", workflows: 95 },
  { name: "Fri", workflows: 120 }
];

export default function AnalyticsPage() {

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        Enterprise Analytics
      </h1>

      <LineChart
        width={900}
        height={400}
        data={data}
      >

        <Line
          type="monotone"
          dataKey="workflows"
        />

        <CartesianGrid stroke="#444" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

      </LineChart>

    </main>
  );
}