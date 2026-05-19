"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Mon", tasks: 12 },
  { name: "Tue", tasks: 18 },
  { name: "Wed", tasks: 25 },
  { name: "Thu", tasks: 30 },
  { name: "Fri", tasks: 22 }
];

export default function AnalyticsChart() {
  return (
    <div className="w-full h-[300px] bg-white rounded-xl p-4 shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="tasks" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}