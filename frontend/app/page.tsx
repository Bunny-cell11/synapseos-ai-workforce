"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Bot,
  Rocket,
  CheckCircle2,
  Clock3,
  Loader2
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

interface Task {
  id: number;
  title: string;
  assigned_agent: string;
  status: string;
}

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState(
    "Build EV Fleet Dashboard"
  );

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/tasks`
      );

      setTasks(response.data.tasks || []);

    } catch (error) {

      console.error(error);

    }
  };

  const startWorkflow = async () => {

    try {

      setLoading(true);

      await axios.post(
        `${API_URL}/start-project`,
        { goal }
      );

      await fetchTasks();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getStatusIcon = (status: string) => {

    if (status === "Completed") {
      return <CheckCircle2 className="text-green-400" />;
    }

    if (status === "In Progress") {
      return <Loader2 className="text-yellow-400 animate-spin" />;
    }

    return <Clock3 className="text-gray-400" />;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 text-white p-10">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div className="flex items-center gap-4 mb-6">

            <Rocket className="w-12 h-12 text-blue-400" />

            <h1 className="text-6xl font-bold">
              SynapseOS
            </h1>

          </div>

          <p className="text-gray-400 text-xl mb-10">
            AI Multi-Agent Workforce Operating System
          </p>

        </motion.div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 mb-10 backdrop-blur-md">

          <h2 className="text-2xl font-semibold mb-5">
            Launch New AI Workflow
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="flex-1 bg-black border border-gray-700 rounded-2xl px-5 py-4 text-white outline-none"
              placeholder="Enter project goal..."
            />

            <button
              onClick={startWorkflow}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 transition-all px-8 py-4 rounded-2xl font-semibold"
            >
              {loading
                ? "Launching Agents..."
                : "Start Workflow"}
            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task, index) => (

            <motion.div
              key={task.id}
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.1
              }}
              className="bg-gray-900/70 border border-gray-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md"
            >

              <div className="flex justify-between items-center mb-5">

                <Bot className="text-blue-400 w-10 h-10" />

                {getStatusIcon(task.status)}

              </div>

              <h2 className="text-2xl font-bold mb-3">
                {task.title}
              </h2>

              <p className="text-gray-400 mb-2">
                Assigned Agent
              </p>

              <p className="text-lg font-medium mb-4">
                {task.assigned_agent}
              </p>

              <div className="mt-4">

                <div className="flex justify-between mb-2">

                  <span className="text-gray-400">
                    Status
                  </span>

                  <span className="text-blue-400">
                    {task.status}
                  </span>

                </div>

                <div className="w-full bg-gray-800 rounded-full h-3">

                  <div
                    className={`h-3 rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-500 w-full"
                        : task.status === "In Progress"
                        ? "bg-yellow-400 w-2/3"
                        : "bg-gray-500 w-1/4"
                    }`}
                  />

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </main>
  );
}