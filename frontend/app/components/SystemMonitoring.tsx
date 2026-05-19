"use client";

import { useEffect, useState } from "react";

export default function SystemMonitoring() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/workflow");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLogs((prev) => [...prev, data.message]);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="p-4 bg-black text-green-400 rounded-xl h-[300px] overflow-auto">
      <h2 className="text-white mb-2">System Monitoring</h2>

      {logs.map((log, i) => (
        <p key={i}>{log}</p>
      ))}
    </div>
  );
}