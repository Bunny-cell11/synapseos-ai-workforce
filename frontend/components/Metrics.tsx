"use client";

export default function Metrics() {

  const stats = [
    {
      title: "Active AI Agents",
      value: "12"
    },
    {
      title: "Tasks Executed",
      value: "1,284"
    },
    {
      title: "AI Efficiency",
      value: "94%"
    },
    {
      title: "Workflow Speed",
      value: "3.2x"
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-5">

      {stats.map((stat) => (

        <div
          key={stat.title}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >

          <p className="text-zinc-400">
            {stat.title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stat.value}
          </h2>

        </div>

      ))}

    </div>
  );
}
