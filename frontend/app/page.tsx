"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const startWorkflow = async () => {

    setLoading(true);

    await axios.post("http://127.0.0.1:8000/start-project", {
      goal: "Build EV Fleet Dashboard"
    });

    fetchTasks();

    setLoading(false);
  };

  const fetchTasks = async () => {

    const response = await axios.get(
      "http://127.0.0.1:8000/tasks"
    );

    setTasks(response.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-6">
        SynapseOS
      </h1>

      <p className="text-gray-400 mb-8">
        AI Multi-Agent Workforce Operating System
      </p>

      <button
        onClick={startWorkflow}
        className="bg-blue-600 px-6 py-3 rounded-xl"
      >
        {loading ? "Running..." : "Start Workflow"}
      </button>

      <div className="mt-10 grid gap-4">

        {tasks.map((task: any) => (

          <div
            key={task.id}
            className="border border-gray-700 p-5 rounded-xl"
          >
            <h2 className="text-xl font-semibold">
              {task.title}
            </h2>

            <p className="text-gray-400">
              {task.assigned_agent}
            </p>

            <p className="text-green-400">
              {task.status}
            </p>
          </div>

        ))}

      </div>

    </main>
  );
}