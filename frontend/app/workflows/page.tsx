"use client";

import { useEffect, useState } from "react";

export default function WorkflowsPage() {
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/workflow");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSteps((prev) => [...prev, data.message]);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">AI Workflows</h1>

      <div className="mt-4 space-y-2">
        {steps.map((s, i) => (
          <div key={i} className="p-2 bg-white rounded shadow">
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}