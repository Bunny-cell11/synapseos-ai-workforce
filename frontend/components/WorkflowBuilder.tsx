"use client";

export default function WorkflowBuilder() {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-8">

        Workflow Builder

      </h2>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-black p-6 rounded-xl">
          Planner Agent
        </div>

        <div className="bg-black p-6 rounded-xl">
          Backend Agent
        </div>

        <div className="bg-black p-6 rounded-xl">
          DevOps Agent
        </div>

        <div className="bg-black p-6 rounded-xl">
          Analytics Agent
        </div>

      </div>

    </div>

  );
}
