"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://synapseos-backend.greenground-f7cf9187.centralindia.azurecontainerapps.io";

interface Task {
  id: number;
  title: string;
  assigned_agent: string;
  status: string;
}

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startWorkflow = async () => {

    try {

      setLoading(true);
      setError("");

      await axios.post(`${API_URL}/start-project`, {
        goal: "Build EV Fleet Dashboard"
      });

      await fetchTasks();

    } catch (err) {

      console.error(err);
      setError("Failed to start workflow");

    } finally {

      setLoading(false);

    }
  };

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/tasks`
      );

      setTasks(response.data.tasks || []);

    } catch (err) {

      console.error(err);
      setError("Failed to fetch tasks");

    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          SynapseOS
        </h1>

        <p className="text-gray-400 mb-8 text-lg">
          AI Multi-Agent Workforce Operating System
        </p>

        <button
          onClick={startWorkflow}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? "Running Workflow..." : "Start Workflow"}
        </button>

        {error && (
          <div className="mt-6 bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-xl">
            {error}
          </div>
        )}

        <div className="mt-10 grid gap-5">

          {tasks.length === 0 ? (

            <div className="text-gray-500">
              No tasks available
            </div>

          ) : (

            tasks.map((task) => (

              <div
                key={task.id}
                className="border border-gray-700 bg-gray-900 p-5 rounded-2xl shadow-lg"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-semibold">
                    {task.title}
                  </h2>

                  <span className="text-green-400 font-medium">
                    {task.status}
                  </span>

                </div>

                <p className="text-gray-400 mt-2">
                  Assigned Agent:
                  <span className="text-white ml-2">
                    {task.assigned_agent}
                  </span>
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </main>
  );
}