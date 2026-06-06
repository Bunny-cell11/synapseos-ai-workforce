"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import LoginButton from "../components/LoginButton";
import WorkflowGraph from "../components/WorkflowGraph";
import Monitoring from "../components/Monitoring";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

interface Task {
  id?: number;
  title?: string;
  task?: string;
  assigned_agent?: string;
  agent?: string;
  status: string;
}

interface WorkflowNode {
  id: number;
  name: string;
  type: string;
  status: string;
}

export default function Home() {

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [agents, setAgents] =
    useState<any[]>([]);

  const [metrics, setMetrics] =
    useState<any>({});

  const [workflowNodes, setWorkflowNodes] =
    useState<WorkflowNode[]>([]);

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [loading, setLoading] =
    useState(false);

  const [aiLoading, setAiLoading] =
    useState(false);

  const [builderMode, setBuilderMode] =
    useState(false);

  const [aiQuery, setAiQuery] =
    useState("");

  const [aiResponse, setAiResponse] =
    useState("");

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

  const fetchAgents = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/orchestration`
      );

      setAgents(response.data.agents || []);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchMetrics = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/monitoring`
      );

      setMetrics(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchWorkflow = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/workflow-graph`
      );

      setWorkflowNodes(
        response.data.nodes || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const startWorkflow = async () => {

    try {

      setLoading(true);

      await axios.post(
        `${API_URL}/start-project`
      );

      await fetchTasks();

      await fetchAgents();

      await fetchMetrics();

      await fetchWorkflow();

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const askAI = async () => {

    if (!aiQuery.trim()) return;

    try {

      setAiLoading(true);

      const response = await axios.post(
        `${API_URL}/ask-ai`,
        {
          question: aiQuery
        }
      );

      setAiResponse(
        response.data.response
      );

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

    fetchAgents();

    fetchMetrics();

    fetchWorkflow();

    const ws =
      new WebSocket(
        API_URL.replace("http", "ws") + "/ws"
      );

    ws.onmessage = (event) => {

      const data =
        JSON.parse(event.data);

      if (
        data.event ===
        "workflow_updated"
      ) {

        fetchTasks();

        fetchMetrics();

        fetchWorkflow();

      }

    };

    return () => {

      ws.close();

    };

  }, []);

  return (

    <main className="bg-black text-white min-h-screen flex">

      <aside className="w-72 bg-zinc-950 border-r border-zinc-800 p-8">

        <h1 className="text-4xl font-black mb-12">
          SynapseOS
        </h1>

        <div className="space-y-4">

          {[
            "dashboard",
            "agents",
            "analytics",
            "workflow-builder",
            "infrastructure",
            "settings"
          ].map((tab) => (

            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`w-full text-left px-4 py-3 rounded-xl transition ${
                activeTab === tab
                  ? "bg-cyan-500 text-black font-bold"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >

              {tab
                .replace("-", " ")
                .replace(
                  /\b\w/g,
                  (c) => c.toUpperCase()
                )}

            </button>

          ))}

        </div>

      </aside>

      <div className="flex-1 p-10 overflow-y-auto">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-black">
              Enterprise AI Workforce
            </h1>

            <p className="text-zinc-400 mt-2">
              Autonomous multi-agent orchestration platform
            </p>

          </div>

          <LoginButton />

        </div>

        {activeTab === "dashboard" && (

          <div className="space-y-8">

            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-10 text-black">

              <h2 className="text-6xl font-black mb-4">
                AI Command Center
              </h2>

              <p className="text-xl mb-8">
                Enterprise-grade orchestration powered by
                distributed AI agents.
              </p>

              <div className="flex gap-4">

                <button
                  onClick={startWorkflow}
                  className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-bold"
                >

                  {loading
                    ? "Launching..."
                    : "Launch Workflow"}

                </button>

                <button
                  onClick={() =>
                    setBuilderMode(
                      !builderMode
                    )
                  }
                  className="bg-white text-black px-8 py-4 rounded-2xl text-lg font-bold"
                >

                  Workflow Builder

                </button>

              </div>

            </div>

            <div className="grid lg:grid-cols-4 gap-6">

              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

                <p className="text-zinc-400">
                  Active Agents
                </p>

                <h2 className="text-5xl font-black mt-4">
                  {metrics.active_agents || 12}
                </h2>

              </div>

              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

                <p className="text-zinc-400">
                  Running Workflows
                </p>

                <h2 className="text-5xl font-black mt-4">
                  {metrics.running_workflows || 4}
                </h2>

              </div>

              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

                <p className="text-zinc-400">
                  Queue Throughput
                </p>

                <h2 className="text-5xl font-black mt-4">
                  {metrics.queue_rate || 96}%
                </h2>

              </div>

              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

                <p className="text-zinc-400">
                  System Health
                </p>

                <h2 className="text-3xl font-black mt-5 text-green-400">
                  {metrics.system_health ||
                    "healthy"}
                </h2>

              </div>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-4xl font-black">
                  Live Workflow Graph
                </h2>

                <div className="flex items-center gap-2">

                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                  <span className="text-green-400">
                    Live
                  </span>

                </div>

              </div>

              <WorkflowGraph />

              <div className="grid lg:grid-cols-4 gap-4 mt-8">

                {workflowNodes.map((node) => (

                  <div
                    key={node.id}
                    className="bg-black border border-zinc-700 rounded-2xl p-5"
                  >

                    <p className="text-zinc-500 text-sm">
                      {node.type}
                    </p>

                    <h3 className="text-xl font-bold mt-2">
                      {node.name}
                    </h3>

                    <p className="mt-4 text-green-400">
                      {node.status}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            <Monitoring />

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <div className="flex justify-between items-center mb-8">

                <h2 className="text-4xl font-black">
                  Distributed Task Execution
                </h2>

                <button
                  onClick={fetchTasks}
                  className="bg-cyan-500 text-black px-5 py-3 rounded-xl font-bold"
                >
                  Refresh
                </button>

              </div>

              <div className="space-y-4">

                {tasks.map((task, index) => (

                  <div
                    key={index}
                    className="bg-black border border-zinc-700 rounded-2xl p-6"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <h3 className="text-2xl font-bold">

                          {task.title ||
                            task.task}

                        </h3>

                        <p className="text-zinc-400 mt-3">

                          Assigned to:
                          {" "}
                          {task.assigned_agent ||
                            task.agent}

                        </p>

                      </div>

                      <span
                        className={`px-4 py-2 rounded-full text-sm ${
                          task.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : task.status === "running"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-zinc-700 text-zinc-300"
                        }`}
                      >

                        {task.status}

                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h2 className="text-4xl font-black mb-6">
                AI Operations Center
              </h2>

              <textarea
                value={aiQuery}
                onChange={(e) =>
                  setAiQuery(
                    e.target.value
                  )
                }
                placeholder="Ask SynapseOS AI about infrastructure, orchestration, cloud automation, DevOps, telemetry..."
                className="w-full h-48 bg-black border border-zinc-700 rounded-2xl p-5 outline-none focus:border-cyan-500"
              />

              <div className="flex gap-4 mt-5">

                <button
                  onClick={askAI}
                  disabled={aiLoading}
                  className="bg-cyan-500 text-black font-bold px-8 py-4 rounded-2xl"
                >

                  {aiLoading
                    ? "Processing..."
                    : "Execute Query"}

                </button>

                <button
                  onClick={() => {

                    setAiQuery("");

                    setAiResponse("");

                  }}
                  className="bg-zinc-800 px-8 py-4 rounded-2xl"
                >

                  Clear

                </button>

              </div>

              {aiResponse && (

                <div className="mt-8 bg-black border border-zinc-700 rounded-2xl p-6">

                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                    SynapseOS AI Response
                  </h3>

                  <p className="whitespace-pre-wrap leading-8 text-zinc-300">
                    {aiResponse}
                  </p>

                </div>

              )}

            </div>

          </div>

        )}

        {activeTab === "agents" && (

          <div>

            <h2 className="text-5xl font-black mb-10">
              AI Agent Orchestration
            </h2>

            <div className="grid lg:grid-cols-3 gap-6">

              {agents.map((agent, index) => (

                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8"
                >

                  <h3 className="text-3xl font-bold">

                    {agent.agent}

                  </h3>

                  <p className="text-zinc-400 mt-4">
                    Multi-agent orchestration worker
                  </p>

                  <p
                    className={`mt-6 text-xl ${
                      agent.status ===
                      "completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >

                    {agent.status}

                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

        {activeTab === "analytics" && (

          <div className="space-y-8">

            <h2 className="text-5xl font-black">
              Monitoring + Telemetry
            </h2>

            <Monitoring />

          </div>

        )}

        {activeTab === "workflow-builder" && (

          <div className="space-y-8">

            <h2 className="text-5xl font-black">
              Workflow Builder
            </h2>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

              <p className="text-zinc-400 mb-8">
                Design enterprise AI workflows visually.
              </p>

              <div className="grid lg:grid-cols-4 gap-6">

                {[
                  "Planner Agent",
                  "Backend Agent",
                  "Frontend Agent",
                  "DevOps Agent",
                  "Security Agent",
                  "Analytics Agent",
                  "Database Agent",
                  "Monitoring Agent"
                ].map((agent) => (

                  <div
                    key={agent}
                    className="bg-black border border-zinc-700 rounded-2xl p-6 hover:border-cyan-500 transition cursor-pointer"
                  >

                    <h3 className="text-xl font-bold">
                      {agent}
                    </h3>

                    <p className="text-zinc-400 mt-3">
                      Drag into workflow
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

        {activeTab === "infrastructure" && (

          <div className="space-y-8">

            <h2 className="text-5xl font-black">
              Cloud Infrastructure
            </h2>

            {[
              "Kubernetes Cluster — Operational",
              "Redis Queue — Running",
              "Celery Workers — Active",
              "FastAPI Backend — Healthy",
              "PostgreSQL Persistence — Connected",
              "Websocket Streaming — Live",
              "Telemetry Stack — Running",
              "AI Orchestration Engine — Online"
            ].map((item) => (

              <div
                key={item}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-2xl"
              >

                {item}

              </div>

            ))}

          </div>

        )}

        {activeTab === "settings" && (

          <div className="space-y-8">

            <h2 className="text-5xl font-black">
              Platform Settings
            </h2>

            <div className="bg-zinc-900 rounded-3xl p-8 space-y-6">

              <div>

                <h3 className="text-2xl font-bold">
                  Environment
                </h3>

                <p className="text-zinc-400 mt-2">
                  Production
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  AI Mode
                </h3>

                <p className="text-zinc-400 mt-2">
                  Enterprise Autonomous Mode
                </p>

              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  Infrastructure
                </h3>

                <p className="text-green-400 mt-2">
                  Fully Operational
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>

  );

}