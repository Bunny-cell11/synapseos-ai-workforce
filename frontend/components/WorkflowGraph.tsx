"use client";

import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

export default function WorkflowGraph() {

  const nodes = [

    {
      id: "1",
      data: { label: "Planner Agent" },
      position: { x: 100, y: 100 }
    },

    {
      id: "2",
      data: { label: "Backend Agent" },
      position: { x: 400, y: 100 }
    }
  ];

  const edges = [

    {
      id: "e1-2",
      source: "1",
      target: "2"
    }
  ];

  return (

    <div className="h-[500px]">

      <ReactFlow
        nodes={nodes}
        edges={edges}
      />

    </div>
  );
}