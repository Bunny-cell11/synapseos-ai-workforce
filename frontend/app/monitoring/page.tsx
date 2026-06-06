"use client";

import {
  useEffect,
  useState
} from "react";

export default function MonitoringPage() {

  const [data, setData] =
    useState<any>(null);

  useEffect(() => {

    fetch(
      "http://localhost:8000/monitoring"
    )
      .then((res) => res.json())
      .then((data) => setData(data));

  }, []);

  return (

    <main className="bg-black text-white min-h-screen p-10">

      <h1 className="text-5xl font-bold mb-10">
        Enterprise Monitoring
      </h1>

      {data && (

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-6 rounded-2xl">

            <h2 className="text-xl mb-2">
              AI Requests
            </h2>

            <p className="text-5xl font-bold">
              {data.ai_requests}
            </p>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">

            <h2 className="text-xl mb-2">
              Active Agents
            </h2>

            <p className="text-5xl font-bold">
              {data.active_agents}
            </p>

          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl">

            <h2 className="text-xl mb-2">
              Workflows
            </h2>

            <p className="text-5xl font-bold">
              {data.workflows}
            </p>

          </div>

        </div>

      )}

    </main>
  );
}