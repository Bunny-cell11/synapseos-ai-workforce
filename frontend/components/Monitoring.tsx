"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export default function Monitoring() {

  const [metrics, setMetrics] =
    useState<any>({});

  useEffect(() => {

    fetchMetrics();

  }, []);

  const fetchMetrics = async () => {

    const response = await axios.get(
      `${API_URL}/monitoring`
    );

    setMetrics(response.data);
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl">

      <h2 className="text-2xl font-bold mb-4">
        Realtime Monitoring
      </h2>

      <div className="space-y-3">

        <p>
          Active Agents:
          {metrics.active_agents}
        </p>

        <p>
          Running Workflows:
          {metrics.running_workflows}
        </p>

        <p>
          API Latency:
          {metrics.api_latency} ms
        </p>

        <p>
          AI Requests:
          {metrics.ai_requests}
        </p>

        <p>
          Health:
          {metrics.system_health}
        </p>

      </div>

    </div>
  );
}
