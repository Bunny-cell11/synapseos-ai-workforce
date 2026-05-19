"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import Metrics from "./components/Metrics";
import AgentStatus from "./components/AgentStatus";
import Integrations from "./components/Integrations";

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
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/tasks`
      );

      setTasks(response.data.tasks || []);

    } catch (error) {

      console.log(error);

    }
  };

  const startWorkflow = async () => {

    try {

      setLoading(true);

      await axios.post(
        `${API_URL}/start-project`,
        {
          goal:
            "Build Enterprise AI Workforce System"
        }
      );

      await fetchTasks();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const executeAIQuery = async () => {

    if (!aiQuery.trim()) return;

    try {

      setAiLoading(true);

      const response = await axios.post(
        `${API_URL}/ask-ai`,
        {
          question: aiQuery
        }
      );

      setAiResponse(response.data.response);

    } catch (error) {

      console.log(error);

      setAiResponse(
        "Unable to connect to AI service."
      );

    } finally {

      setAiLoading(false);

    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="bg-black text-white min-h-screen flex">

      <Sidebar />

      <div className="flex-1 p-10 space-y-8 overflow-y-auto">

        <HeroSection
          startWorkflow={startWorkflow}
          loading={loading}
        />

        <Metrics />

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-bold">
                AI Workflow Tasks
              </h2>

              <button
                onClick={fetchTasks}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                Refresh
              </button>

            </div>

            <div className="space-y-4">

              {tasks.length > 0 ? (

                tasks.map((task) => (

                  <div
                    key={task.id}
                    className="bg-black border border-zinc-700 rounded-xl p-5 hover:border-blue-500 transition"
                  >

                    <div className="flex justify-between items-center">

                      <h3 className="text-xl font-semibold">
                        {task.title}
                      </h3>

                      <span
                        className={`text-sm px-3 py-1 rounded-full ${
                          task.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : task.status === "In Progress"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-zinc-700 text-zinc-300"
                        }`}
                      >
                        {task.status}
                      </span>

                    </div>

                    <p className="text-zinc-400 mt-3">
                      {task.assigned_agent}
                    </p>

                  </div>

                ))

              ) : (

                <div className="bg-black border border-zinc-700 rounded-xl p-8 text-center">

                  <p className="text-zinc-400 text-lg">
                    No workflows running.
                  </p>

                  <button
                    onClick={startWorkflow}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
                  >
                    Launch AI Workflow
                  </button>

                </div>

              )}

            </div>

          </div>

          <div className="space-y-6">

            <AgentStatus />

            <Integrations />

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
            placeholder="Ask SynapseOS AI about workflows, DevOps, automation, AI agents, analytics..."
            className="w-full h-40 bg-black border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-blue-500 resize-none"
          />

          <div className="flex gap-4 mt-4">

            <button
              onClick={executeAIQuery}
              disabled={aiLoading}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition disabled:opacity-50"
            >
              {aiLoading
                ? "Processing..."
                : "Execute AI Query"}
            </button>

            <button
              onClick={() => {
                setAiQuery("");
                setAiResponse("");
              }}
              className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl transition"
            >
              Clear
            </button>

          </div>

          {aiResponse && (

            <div className="mt-6 bg-black border border-zinc-700 rounded-xl p-5">

              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                SynapseOS AI Response
              </h3>

              <p className="text-zinc-300 leading-8 whitespace-pre-wrap">
                {aiResponse}
              </p>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}