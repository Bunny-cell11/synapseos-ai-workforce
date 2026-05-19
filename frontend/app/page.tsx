"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import HeroSection from "./components/HeroSection";
import Metrics from "./components/Metrics";
import AgentStatus from "./components/AgentStatus";
import Integrations from "./components/Integrations";
import AICommandCenter from "./components/AICommandCenter";

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
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="bg-black text-white min-h-screen flex">

      <Sidebar />

      <div className="flex-1 p-10 space-y-8">

        <HeroSection
          startWorkflow={startWorkflow}
          loading={loading}
        />

        <Metrics />

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <h2 className="text-3xl font-bold mb-6">
              AI Workflow Tasks
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

                    <span className="text-green-400">
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

          <div className="space-y-6">

            <AgentStatus />

            <Integrations />

          </div>

        </div>

        <AICommandCenter />

      </div>

    </main>
  );
}