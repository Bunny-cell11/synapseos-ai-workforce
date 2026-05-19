"use client";

export default function AgentStatus() {

  const agents = [
    {
      name: "Planner Agent",
      status: "Online"
    },
    {
      name: "Frontend Agent",
      status: "Working"
    },
    {
      name: "Backend Agent",
      status: "Pending"
    },
    {
      name: "DevOps Agent",
      status: "Online"
    }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Agent Network
      </h2>

      <div className="space-y-4">

        {agents.map((agent) => (

          <div
            key={agent.name}
            className="flex justify-between items-center"
          >

            <span>
              {agent.name}
            </span>

            <span className="text-green-400">
              {agent.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}
