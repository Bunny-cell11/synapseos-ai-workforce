"use client";

export default function HeroSection({
  startWorkflow,
  loading
}: any) {

  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 shadow-2xl">

      <h1 className="text-6xl font-bold leading-tight">

        Deploy Autonomous
        <br />
        AI Teams

      </h1>

      <p className="text-xl text-blue-100 mt-6 max-w-3xl">

        SynapseOS orchestrates intelligent AI agents
        that plan, execute, monitor, and optimize
        enterprise workflows.

      </p>

      <div className="mt-8 flex gap-4">

        <button
          onClick={startWorkflow}
          className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
        >
          {
            loading
              ? "Launching..."
              : "Launch Workflow"
          }
        </button>

        <button
          className="border border-white px-6 py-3 rounded-2xl"
        >
          View Analytics
        </button>

      </div>

    </div>
  );
}
