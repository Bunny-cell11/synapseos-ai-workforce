"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://synapseos-backend-4v9x.onrender.com";

interface Task {
  id: number;
  title: string;
  assigned_agent: string;
  status: string;
}

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const fetchTasks = async () => {

    const response = await axios.get(
      `${API_URL}/tasks`
    );

    setTasks(response.data.tasks || []);
  };

  const startWorkflow = async () => {

    setLoading(true);

    await axios.post(
      `${API_URL}/start-project`,
      {
        goal:
          "Build Enterprise AI Workforce System"
      }
    );

    fetchTasks();

    setLoading(false);
  };

  const askAI = async () => {

    if (!aiQuery) return;

    const response = await axios.post(
      `${API_URL}/ask-ai`,
      {
        question: aiQuery
      }
    );

    setAiResponse(response.data.response);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (

    <main className="bg-black text-white min-h-screen flex">

      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-bold mb-10">
          SynapseOS
        </h1>

        <div className="space-y-4">

          <button
            onClick={() => setActiveTab("dashboard")}
            className="block w-full text-left hover:text-cyan-400"
          >
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("agents")}
            className="block w-full text-left hover:text-cyan-400"
          >
            AI Agents
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className="block w-full text-left hover:text-cyan-400"
          >
            Analytics
          </button>

          <button
            onClick={() => setActiveTab("infrastructure")}
            className="block w-full text-left hover:text-cyan-400"
          >
            Infrastructure
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className="block w-full text-left hover:text-cyan-400"
          >
            Settings
          </button>

        </div>

      </aside>

      <div className="flex-1 p-10">

        {activeTab === "dashboard" && (

          <div className="space-y-8">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

              <h2 className="text-5xl font-bold mb-4">
                AI Workforce Command Center
              </h2>

              <p className="text-zinc-400 mb-8">
                Enterprise-grade autonomous AI workforce orchestration platform.
              </p>

              <button
                onClick={startWorkflow}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-xl"
              >
                {loading ? "Launching..." : "Launch Workflow"}
              </button>

            </div>

            <div className="grid grid-cols-4 gap-6">

              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-zinc-400">AI Agents</h3>
                <p className="text-4xl font-bold mt-2">12</p>
              </div>

              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-zinc-400">Automation Rate</h3>
                <p className="text-4xl font-bold mt-2">92%</p>
              </div>

              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-zinc-400">Tasks Completed</h3>
                <p className="text-4xl font-bold mt-2">148</p>
              </div>

              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-zinc-400">Cloud Status</h3>
                <p className="text-4xl font-bold mt-2 text-green-400">
                  Active
                </p>
              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <h2 className="text-3xl font-bold mb-6">
                Workflow Tasks
              </h2>

              <div className="space-y-4">

                {tasks.map((task) => (

                  <div
                    key={task.id}
                    className="bg-black border border-zinc-700 rounded-xl p-5"
                  >

                    <div className="flex justify-between">

                      <h3 className="text-xl font-semibold">
                        {task.title}
                      </h3>

                      <span className="text-cyan-400">
                        {task.status}
                      </span>

                    </div>

                    <p className="text-zinc-400 mt-3">
                      {task.assigned_agent}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <h2 className="text-3xl font-bold mb-6">
                AI Operations Center
              </h2>

              <textarea
                value={aiQuery}
                onChange={(e) =>
                  setAiQuery(e.target.value)
                }
                placeholder="Ask enterprise AI..."
                className="w-full h-40 bg-black border border-zinc-700 rounded-xl p-4"
              />

              <button
                onClick={askAI}
                className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl"
              >
                Execute Query
              </button>

              {aiResponse && (

                <div className="mt-6 bg-black border border-zinc-700 rounded-xl p-6 whitespace-pre-line">

                  {aiResponse}

                </div>

              )}

            </div>

          </div>

        )}

        {activeTab === "agents" && (

          <div>

            <h2 className="text-5xl font-bold mb-8">
              AI Agents
            </h2>

            <div className="grid grid-cols-3 gap-6">

              {[
                "Planner Agent",
                "Frontend Agent",
                "Backend Agent",
                "DevOps Agent",
                "Analytics Agent",
                "Security Agent"
              ].map((agent) => (

                <div
                  key={agent}
                  className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl"
                >

                  <h3 className="text-2xl font-bold">
                    {agent}
                  </h3>

                  <p className="text-green-400 mt-4">
                    Operational
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

        {activeTab === "analytics" && (

          <div>

            <h2 className="text-5xl font-bold mb-8">
              Enterprise Analytics
            </h2>

            <div className="grid grid-cols-3 gap-6">

              <div className="bg-zinc-900 p-8 rounded-2xl">
                <h3>Workflow Efficiency</h3>
                <p className="text-5xl mt-4 font-bold">
                  94%
                </p>
              </div>

              <div className="bg-zinc-900 p-8 rounded-2xl">
                <h3>AI Productivity</h3>
                <p className="text-5xl mt-4 font-bold">
                  88%
                </p>
              </div>

              <div className="bg-zinc-900 p-8 rounded-2xl">
                <h3>Deployment Success</h3>
                <p className="text-5xl mt-4 font-bold">
                  99%
                </p>
              </div>

            </div>

          </div>

        )}

        {activeTab === "infrastructure" && (

          <div>

            <h2 className="text-5xl font-bold mb-8">
              Cloud Infrastructure
            </h2>

            <div className="space-y-6">

              <div className="bg-zinc-900 p-6 rounded-2xl">
                Azure Cloud — Operational
              </div>

              <div className="bg-zinc-900 p-6 rounded-2xl">
                Render Backend — Active
              </div>

              <div className="bg-zinc-900 p-6 rounded-2xl">
                Vercel Frontend — Running
              </div>

            </div>

          </div>

        )}

        {activeTab === "settings" && (

          <div>

            <h2 className="text-5xl font-bold mb-8">
              Settings
            </h2>

            <div className="bg-zinc-900 p-8 rounded-2xl space-y-6">

              <div>
                <h3 className="text-xl">Environment</h3>
                <p className="text-zinc-400">
                  Production
                </p>
              </div>

              <div>
                <h3 className="text-xl">AI Mode</h3>
                <p className="text-zinc-400">
                  Autonomous Enterprise Mode
                </p>
              </div>

              <div>
                <h3 className="text-xl">Deployment Status</h3>
                <p className="text-green-400">
                  Active
                </p>
              </div>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}